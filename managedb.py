#!/usr/bin/env python
import os
import argparse
import json
from metasploit.msfrpc import MsfRpcClient

from msfHub.models import db, User, Role, Module

def create_db():
	db.create_all()

def drop_db():
	db.drop_all()

def main():
	parser = argparse.ArgumentParser(description='Manage this Flask application.')
	parser.add_argument('command', help='the name of the command you want to run')
	parser.add_argument('--file', help='the file with data for seeding the database')
	args = parser.parse_args()

	if args.command == 'create':
		create_db()
		print "DB created!"
		
	elif args.command == 'delete':
		drop_db()
		print "DB deleted!"

	elif args.command == 'seed' and args.file:
		with open(args.file, 'r') as f:
			seed_data = json.loads(f.read())

		for role in seed_data.get("roles"):
			name = role.get("name")
			desc = role.get("desc")
			db_role = Role(name=name, description=desc)
			db.session.add(db_role)
			db.session.commit()

		for user in seed_data.get("users"):
			username=user.get("username")
			password=user.get("password")
			db_user = User(username=username, password=password)
			db.session.add(db_user)
			db.session.commit()
			roles = user.get("roles")
			for role in roles:
				user = User.query.filter_by(username=username).first()
				roll_to_add = Role.query.filter_by(name=role).first()
				user.roles.append(roll_to_add)

		db.session.commit()
		
		print "\nUser and Role data added to database!"


		modTypes = ['exploit', 'auxiliary', 'post', 'payload']
		msfPass = 'msfpass'
		client = MsfRpcClient(msfPass)
		print "Adding module Info, will take a couple minutes"
		for type in modTypes:
			if type == 'exploit':
				client = MsfRpcClient(msfPass)
				modList = client.modules.exploits
			elif type == 'auxiliary':
				client = MsfRpcClient(msfPass)
				modList = client.modules.auxiliary
			elif type == 'post':
				client = MsfRpcClient(msfPass)
				modList = client.modules.post
			elif type == 'payload':
				client = MsfRpcClient(msfPass)
				modList = client.modules.payloads

			for mod in modList:
				modSplit = mod.split('/')
				modName = modSplit[-1]
				modCat = ('/').join(modSplit[:-1])

				useMod = client.modules.use(type, mod)
				modDesc = useMod.description
				modAuths = useMod.authors
				modOpts = useMod.options
				modReqOpts = useMod.required

				m = Module(name=modName,desc=modDesc,opts=str(modOpts),reqopts=str(modReqOpts),authors=str(modAuths), category=modCat,type=type)
				db.session.add(m)

		db.session.commit()

		print "\nModule Info Added to DB"
		db.session.close()
	else:
		raise Exception('Invalid command')

if __name__ == '__main__':
	main()
