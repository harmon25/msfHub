#!/usr/bin/env python
# -*- coding: utf-8 -*-
from flask import jsonify, request, make_response, abort
from msfHub import app
from msfHub.models import Module
from config import MAX_SEARCH_RESULTS, MSF_MODULE_BASE
from hubrpc import *
import os

mod_dirs = {}
mod_root_dirs = next(os.walk(MSF_MODULE_BASE))[1]
for root_dir in mod_root_dirs:
	mod_dirs[root_dir] = next(os.walk(MSF_MODULE_BASE+'/'+root_dir))[1]



@app.route('/msfapi/search/<query>', methods=['GET'])
def msfSearch(query):
	respObj = []
	q = Module.query.whoosh_search(query, MAX_SEARCH_RESULTS).all()
	for mod in q:
		respObj.append({"id":mod.id, "type":mod.type,"category":mod.category, "name":mod.name,"desc":mod.desc})
	return (jsonify(respObj=respObj), 201)


@app.route('/msfapi/search/<type>/<category>/<query>', methods=['GET'])
def msfModSearch(type,category,query):
	if not type in typeList:
		return (jsonify({'message':"Invalid Module Type"}), 401)
	else:
		if type=='exploit':
			if not category in expCategories:
				return (jsonify({'message':"Invalid Module Category"}), 401)
			else:
				q = Module.query.filter_by(type=type).filter(Module.category.startswith(category)).all()




	respObj = []
	q = Module.query.filter_by(type=type).all()
	q = Module.query.whoosh_search(query + " " + category, MAX_SEARCH_RESULTS).all()
	for mod in q:
		respObj.append({"id":mod.id, "type":mod.type, "category":mod.category, "name":mod.name,"desc":mod.desc})
	return (jsonify(respObj=respObj), 201)

@app.route('/msfapi/search/<type>/<category>', methods=['GET'])
def msfCategorySearch(type,category):
	if not type in typeList:
		return (jsonify({'message':"Invalid Module Type"}), 401)
	else:
		q = Module.query.whoosh_search(category,fields=('category',)).filter_by(type=type).distinct()

@app.route('/api/<info>', methods=['GET'])
def api(info):
	if info == "stats":
		return (jsonify(stats=getStats()), 201)
	elif info == "version":
		return (jsonify(version=getVersion()), 201)
	elif info == "exploits":
		return (jsonify(exploitsObj=getExploitList()), 201)
	elif info == "aux":
		return (jsonify(auxiliary=getAuxiliaryList()), 201)
	elif info == "encoders":
		return (jsonify(encoders=getEncodersList()), 201)
	elif info == "nops":
		return (jsonify(nops=getNopsList()), 201)
	elif info == "payloads":
		return (jsonify(payloads=getPayloadsList()), 201)
	elif info == "post":
		return (jsonify(post=getPostList()), 201)
	else:
		abort(404)








	