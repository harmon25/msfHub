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
	
def getExploits():
	client = MsfRpcClient(msfPass)
	exploitList = client.modules.exploits
	exploitsObj = []
	for exploit in exploitList:
		exploitDetails = client.modules.use('exploit', exploit)
		exploitDesc = exploitDetails.description
		exploitOpts = exploitDetails.options
		exploitsObj.append({'name':exploit, 'desc':exploitDesc, 'opts':exploitOpts})
	return exploitsObj
	
def getAuxiliary():
	client = MsfRpcClient(msfPass)
	return client.modules.auxiliary
	
def getEncoders():
	client = MsfRpcClient(msfPass)
	return client.modules.encoders

def getNops():
	client = MsfRpcClient(msfPass)
	return client.modules.nops

def getPayloads():
	client = MsfRpcClient(msfPass)
	return client.modules.payloads

def getPost():
	client = MsfRpcClient(msfPass)
	return client.modules.post




