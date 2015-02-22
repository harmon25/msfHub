#!/usr/bin/env python
# -*- coding: utf-8 -*-
from flask import render_template, g, session, request, flash, redirect, url_for, Response
from flask import send_file, make_response, abort, jsonify
from msfHub import app, jwt
from msfHub.models import db, User
from flask_jwt import jwt_required


@app.route('/',methods=['GET'])
def index():
    return make_response(open('msfHub/templates/index.html').read())

@app.route('/views/login',methods=['GET'])
def view_login():
    return make_response(open('msfHub/templates/views/login.html').read())

@app.route('/views/home',methods=['GET'])
@jwt_required()
def view_home():
    return make_response(open('msfHub/templates/views/home.html').read())

@app.route('/views/reports',methods=['GET'])
@jwt_required()
def view_reports():
    return make_response(open('msfHub/templates/views/reports.html').read())

@app.route('/views/about',methods=['GET'])
def view_about():
    return make_response(open('msfHub/templates/views/about.html').read())


@app.errorhandler(401)
def custom_401(error):
	message = {"success": False, "message": "Authentication Failed"}
	resp = jsonify(message)
	resp.status_code=401
	resp.headers['WWW-Authenticate'] = 'BasicCustom realm="msfHub"'
	return resp

def row2dict(row):
    d = {}
    for column in row.__table__.columns:
        d[column.name] = str(getattr(row, column.name))
    return d

@app.route('/login',methods=['POST'])
def login():
	username = request.json.get("username")
	password = request.json.get("password")
	# try to authenticate with username/password
	user = User.query.filter_by(username=username).first()
	if not user or not user.verify_password(password):
		abort(401)
		#raise InvalidAPIUsage(message, status_code=401) 
	else:
		roles = []
		for role in user.roles:
			roles.append(str(role))
		g.user = username
		message = {"success": "true", "username": user.username, "roles": roles}
		flash('You were logged in')
		return jsonify(message)

		
