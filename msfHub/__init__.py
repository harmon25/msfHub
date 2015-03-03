#!/usr/bin/env python
# -*- coding: utf-8 -*-

from flask import Flask
import base64
from flask_jwt import JWT

app = Flask(__name__)
app.config.from_object('msfHub.config')
app.url_map.strict_slashes = False

jwt = JWT(app)

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

import msfHub.userapi, msfHub.views
import msfHub.msfapi 