#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Author: harmoN
# @Date:   2015-02-13 16:27:12
# @Last Modified by:   harmoN
# @Last Modified time: 2015-02-15 10:57:34
from flask import g
from flask.ext.sqlalchemy import SQLAlchemy
from passlib.apps import custom_app_context as pwd_context

from msfHub import app

db = SQLAlchemy(app)

roles_users = db.Table('roles_users',
        db.Column('user_id', db.Integer(), db.ForeignKey('user.id')),
        db.Column('role_id', db.Integer(), db.ForeignKey('role.id')))

class Role(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String(80), unique=True)
    description = db.Column(db.String(255))

    def __repr__(self):
        return "<Role: {} >".format(self.name)

    def __str__(self):
        return self.name

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40))
    password_hash = db.Column(db.String(128))
    roles = db.relationship('Role', secondary=roles_users, backref=db.backref('users', lazy='dynamic'))

    def hash_password(self, password):
        self.password_hash = pwd_context.encrypt(password)

    def verify_password(self, password):
        return pwd_context.verify(password, self.password_hash)

    def __init__(self, **kwargs):
        self.username = kwargs.get('username')
        self.password_hash = pwd_context.encrypt(kwargs.get('password'))

    def __repr__(self):
        return '<User {}>'.format(self.username)
    
    def __str__(self):
        return str(self.username)


