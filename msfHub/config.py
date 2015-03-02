#!/usr/bin/env python
# -*- coding: utf-8 -*-
from datetime import timedelta
import os
APP_ROOT = os.path.dirname(os.path.abspath(__file__))   # refers to application_top
APP_STATIC = os.path.join(APP_ROOT, 'static')
SECRET_KEY = 'development key'
DEBUG = True
SQLALCHEMY_DATABASE_URI = 'sqlite:////tmp/test.db'
#SQLALCHEMY_BINDS = {'msf':'postgres://localhost/msf' }
JWT_EXPIRATION_DELTA = timedelta(seconds=120)