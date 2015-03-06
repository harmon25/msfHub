#!/usr/bin/env python
# -*- coding: utf-8 -*-
from datetime import timedelta
import os
APP_ROOT = os.path.dirname(os.path.abspath(__file__))   # refers to application_top
APP_STATIC = os.path.join(APP_ROOT, 'static')
SECRET_KEY = 'development key'
DEBUG = True
SQLALCHEMY_DATABASE_URI = 'sqlite:///'+ APP_ROOT+'/msfHub.db'
JWT_EXPIRATION_DELTA = timedelta(seconds=3000)
WHOOSH_BASE = os.path.join(APP_ROOT, '../msfHubWhoosh.db')
MAX_SEARCH_RESULTS = 50
MSF_MODULE_BASE = '/opt/metasploit-framework/modules'