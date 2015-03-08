#!/usr/bin/env python
# -*- coding: utf-8 -*-
from flask import jsonify, request, make_response, abort
from msfHub import app
from msfHub.models import Module
from config import MAX_SEARCH_RESULTS, MSF_MODULE_BASE
from hubrpc import *
import os
import json
from flask_jwt import jwt_required, current_user

mod_dirs = {}
mod_root_dirs = next(os.walk(MSF_MODULE_BASE))[1]
for root_dir in mod_root_dirs:
	mod_dirs[root_dir] = next(os.walk(MSF_MODULE_BASE+'/'+root_dir))[1]


@app.route('/msfapi/search/<query>', methods=['GET'])
@jwt_required()
def msfSearch(query):
	if current_user.isAllowed(['user']):
		respObj = []
		q = Module.query.whoosh_search(query, MAX_SEARCH_RESULTS).all()
		for mod in q:
			respObj.append({"id":mod.id, "type":mod.type,"platform":mod.platform,"target":mod.target, "name":mod.name})
		return (json.dumps(respObj), 201)
	else:
		return (jsonify({'message': 'You are not Allowed to do that'}), 400)

# q = Module.query.filter_by(type=type).filter(Module.category.startswith(category)).all()

#	q = Module.query.filter_by(type=type).all()
#	q = Module.query.whoosh_search(query + " " + category, MAX_SEARCH_RESULTS).all()

@app.route('/msfapi/search/<type>/<category>', methods=['GET'])
@jwt_required()
def msfCategorySearch(type,category):
	if current_user.isAllowed(['user']):
	if not type in typeList:
		return (jsonify({'message':"Invalid Module Type"}), 401)
	else:
		q = Module.query.whoosh_search(category,fields=('category',)).filter_by(type=type).distinct()

@app.route('/api/<info>', methods=['GET'])
@jwt_required()
def api(info):
	if current_user.isAllowed(['user']):
		if info == "stats":
			return (jsonify(stats=getStats()), 201)
		elif info == "version":
			return (jsonify(version=getVersion()), 201)
		else:
			abort(404)
	else:
		return (jsonify({'message': 'You are not Allowed to do that'}), 400)








	