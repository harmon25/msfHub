#!/usr/bin/env python
# -*- coding: utf-8 -*-
from flask import jsonify, request, make_response, abort
from msfHub import app, auth

from metarpc import *

@app.route('/api/<info>', methods=['GET'])
def api(info):
	if info == "stats":
		return jsonify(stats=getStats())
	elif info == "version":
		return jsonify(version=getVersion())
	elif info == "exploits":
		return jsonify(exploits=getExploits())
	elif info == "aux":
		return jsonify(auxiliary=getAuxiliary())
	elif info == "encoders":
		return jsonify(encoders=getEncoders())
	elif info == "nops":
		return jsonify(nops=getNops())
	elif info == "payloads":
		return jsonify(payloads=getPayloads())
	elif info == "post":
		return jsonify(post=getPost())
	else:
		abort(404)








	