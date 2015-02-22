#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Author: harmoN
# @Date:   2015-02-14 12:40:21
# @Last Modified by:   harmoN
# @Last Modified time: 2015-02-14 17:08:44

from metasploit.msfrpc import MsfRpcClient
client = MsfRpcClient('msfpass')
def getStats():
	return client.core.stats

def getVersion():
	return client.core.version
	
def getExploits():
	return client.modules.exploits
	
def getAuxiliary():
	return client.modules.auxiliary
	
def getEncoders():
	return client.modules.encoders

def getNops():
	return client.modules.nops

def getPayloads():
	return client.modules.payloads

def getPost():
	return client.modules.post




