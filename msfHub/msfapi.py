#!/usr/bin/env python
# -*- coding: utf-8 -*-
from flask import jsonify, request, make_response, abort
from msfHub import app 

from hubrpc import *

@app.route('/api/<info>', methods=['GET'])
def api(info):
	if info == "stats":
		return (jsonify(stats=getStats()), 201)
	elif info == "version":
		return (jsonify(version=getVersion()), 201)
	elif info == "exploits":
		return (jsonify(exploits=getExploits()), 201)
	elif info == "aux":
		return (jsonify(auxiliary=getAuxiliary()), 201)
	elif info == "encoders":
		return (jsonify(encoders=getEncoders()), 201)
	elif info == "nops":
		return (jsonify(nops=getNops()), 201)
	elif info == "payloads":
		return (jsonify(payloads=getPayloads()), 201)
	elif info == "post":
		return (jsonify(post=getPost()), 201)
	else:
		abort(404)








	