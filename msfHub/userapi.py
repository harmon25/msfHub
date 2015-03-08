#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Author: harmoN
# @Date:   2015-02-13 16:31:58
# @Last Modified by:   harmoN
# @Last Modified time: 2015-02-15 15:31:41
from flask import jsonify, request, url_for,session, render_template, g, flash,redirect, abort
from msfHub import app, jwt
from msfHub.models import db, User, Role
from datetime import datetime
from flask_jwt import jwt_required, current_user

@jwt.authentication_handler
def authenticate(username, password):
    user = User.query.filter_by(username=username).first()
    if not user or not user.verify_password(password):
        return False
    else:
        return user

@jwt.payload_handler
def make_payload(user):
    roles = user.getRoles()
    expiry = (datetime.now() - datetime.fromtimestamp(0)) + app.config['JWT_EXPIRATION_DELTA']
    return {
        'user_id': user.id,
        'user_name': user.username,
        'roles': roles,
        'workspace': user.workspace,
        'exp': int(expiry.total_seconds())
            }

@jwt.user_handler
def load_user(payload):
    if payload['user_id']:
        return User.query.filter_by(id=payload['user_id']).first()

@jwt.error_handler
def error_handler(error):
    message = {"success": False, "message": 'Authentication Failed'}
    resp = jsonify(message)
    resp.status_code=401
    resp.headers['WWW-Authenticate'] = 'BasicCustom realm="msfHub"'
    return resp


@app.route('/api/user', methods=['GET'])
@jwt_required()
def whoami():
    return jsonify({"username": current_user.username, "roles":str(current_user.roles)})

@app.route('/api/users', methods=['POST'])
@jwt_required()
def new_user():
    username = request.json.get('username')
    password = request.json.get('password')
    roles = request.json.get('roles')
    if username is None or password is None:
         return (jsonify({'message': "Missing username or password"}), 400)
    elif User.query.filter_by(username=username).first() is not None:
        return (jsonify({'message': "User Exists"}), 400)
    else:
        user = User(username=username, password=password)
        db.session.add(user)
        for role in roles:
            roll_to_add = Role.query.filter_by(name=role.lower()).first()
            user.roles.append(roll_to_add)
        db.session.commit()
        return (jsonify({'message': 'User ' + user.username + ' created'}), 201)

@app.route('/api/users', methods=['GET'])
@jwt_required()
def get_users():
    userDict = {}
    users = User.query.order_by(User.id)
    for user in users:
        users_roles = user.getRoles()
        userDict[user.id] = {"id":user.id, "username":user.username,"roles":users_roles, "workspace":user.workspace}
    return jsonify(userDict)

@app.route('/api/users', methods=['DELETE'])
@jwt_required()
def del_user():
    if current_user.isAllowed(['admin']):
        user_id = request.json.get('id')
        if User.query.get(user_id) is not None:
            user = User.query.get(user_id)
            db.session.delete(user)
            db.session.commit()
            return (jsonify({'message': 'User Deleted'}), 201)
        else:
            return (jsonify({'message': 'User does not Exist'}), 400)
    else:
        return (jsonify({'message': 'You are not Allowed to do that'}), 400)


@app.route('/api/users/<int:id>')
def get_user(id):
    user = User.query.get(id)
    roles = user.getRoles()
    if not user:
        abort(400)
    return jsonify({'username': user.username, 'roles': roles, 'workspace': user.workspace})

