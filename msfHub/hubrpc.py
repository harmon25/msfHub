#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Author: harmoN
# @Date:   2015-02-14 12:40:21
# @Last Modified by:   harmoN
# @Last Modified time: 2015-02-14 17:08:44

from metasploit.msfrpc import MsfRpcClient
msfUsername = 'msf'
msfPass = 'msfpass'

def getStats():
	client = MsfRpcClient(msfPass)
	return client.core.stats

def getVersion():
	client = MsfRpcClient(msfPass)
	return client.core.version
	
def getExploitList():
	client = MsfRpcClient(msfPass)
	exploitList = client.modules.exploits
	exploitsListObj = []
	for exploit in exploitList:
		exploitsListObj.append({'name':exploit})
	return exploitsListObj
	
def getAuxiliaryList():
	client = MsfRpcClient(msfPass)
	auxiliaryList = client.modules.auxiliary
	auxiliaryListObj = []
	for module in auxiliaryList:
		auxiliaryListObj.append({'name':module})
	return auxiliaryListObj
	
def getEncodersList():
	client = MsfRpcClient(msfPass)
	encoderList = client.modules.encoders
	encoderListObj = []
	for encoder in encoderList:
		encoderListObj.append({'name':encoder})
	return encoderListObj


def getNopsList():
	client = MsfRpcClient(msfPass)
	nopsList = client.modules.nops
	nopsListObj = []
	for nop in nopsList:
		encoderListObj.append({'name':nop})
	return nopsListObj

def getPayloadsList():
	client = MsfRpcClient(msfPass)
	payloadList = client.modules.nops
	payloadListObj = []
	for payload in payloadList:
		payloadListObj.append({'name':payload})
	return payloadListObj

def getPostList():
	client = MsfRpcClient(msfPass)
	postList = client.modules.post
	postListObj = []
	for post in postList:
		postListObj.append({'name':post})
	return postListObj




