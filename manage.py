#!/usr/bin/env python

import os
import argparse
import json

from msfHub.models import db, User, Role, Ability

def create_db():
	db.create_all()

def drop_db():
	db.drop_all()

def main():
	parser = argparse.ArgumentParser(description='Manage this Flask application.')
	parser.add_argument('command', help='the name of the command you want to run')
	parser.add_argument('--seedfile', help='the file with data for seeding the database')
	args = parser.parse_args()

	if args.command == 'create_db':
		create_db()
		print "DB created!"

		
	elif args.command == 'delete_db':
		drop_db()
		print "DB deleted!"

	elif args.command == 'seed_db' and args.seedfile:
		with open(args.seedfile, 'r') as f:
			seed_data = json.loads(f.read())

		for role in seed_data.get("roles"):
			name = role.get("name")
			desc = role.get("desc")
			db_role = Role(name=name)
			db.session.add(db_role)
			db_role.description = desc
			db.session.commit()

		for user in seed_data.get("users"):
			username=user.get("username")
			password=user.get("password")
			roles = user.get("roles")
			print username,password, roles
			db_user = User(username=username,password=password,roles=roles, default_role=None)
			db.session.add(db_user)
			db.session.commit()

		role = Role.query.filter_by(name='admin').first()
		abilities = ['create_users', 'set_roles', 'set_abilities']
		for ability in abilities:
			new_ability = Ability(ability)
			db.session.add(new_ability)
			db.session.commit()
		role.add_abilities(*abilities)
		db.session.add(role)
		db.session.commit()
		
		db.session.close()
		print "\nUser Role and Ability Data added to database!"
	else:
		raise Exception('Invalid command')

if __name__ == '__main__':
	main()
