#!/usr/bin/env python
# -*- coding: utf-8 -*-
from datetime import timedelta
SECRET_KEY = 'development key'
DEBUG = True
SQLALCHEMY_DATABASE_URI = 'sqlite:////tmp/test.db'
JWT_EXPIRATION_DELTA = timedelta(seconds=600)