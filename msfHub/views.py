#!/usr/bin/env python
# -*- coding: utf-8 -*-
from flask import render_template, g, session, request, flash, redirect, url_for, Response
import os
from flask import send_file, make_response, abort, jsonify, send_from_directory
from msfHub import app, jwt
from msfHub.models import db, User
from flask_jwt import jwt_required, current_user
from config import APP_STATIC

@app.route('/favicon.ico')
def favicon():
    return send_from_directory(APP_STATIC, 'img/favicon.ico')

@app.route('/',methods=['GET'])
def index():
    return make_response(open('msfHub/templates/index.html').read())

@app.route('/views/login',methods=['GET'])
def view_login():
    return make_response(open('msfHub/templates/views/login.html').read())

@app.route('/views/home',methods=['GET'])
@jwt_required()
def view_home():
	print current_user
	return make_response(open('msfHub/templates/views/home.html').read())

@app.route('/views/reports',methods=['GET'])
@jwt_required()
def view_reports():
	print current_user
	return make_response(open('msfHub/templates/views/reports.html').read())

@app.route('/views/about',methods=['GET'])
@jwt_required()
def view_about():
    return make_response(open('msfHub/templates/views/about.html').read())

@app.route('/views/admin',methods=['GET'])
@jwt_required()
def view_admin():
    return make_response(open('msfHub/templates/views/admin.html').read())

@app.route('/views/admin/users',methods=['GET'])
@jwt_required()
def view_admin_users():
    return make_response(open('msfHub/templates/views/admin.users.html').read())

@app.route('/views/profile',methods=['GET'])
@jwt_required()
def view_profile():
    return make_response(open('msfHub/templates/views/profile.html').read())


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


	# try to authenticate with username/password
	#user = User.query.filter_by(username=username).first()
	

		
