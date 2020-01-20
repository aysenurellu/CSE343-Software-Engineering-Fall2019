from __future__ import absolute_import
import os
import json
import requests
from base64 import b64decode, b64encode
from io import open
import time

def save_file(path, cont):
	ff = open(path, 'w')
	ff.write(cont)
	ff.close()

def get_file(path):
	ff = open(path, 'r')
	cont = ff.read()
	ff.close()
	return cont

def version_file(filename, project_path,project_name, g_id, password, t_path, v_path):
	os.popen('cp ' + t_path + filename + ' ' + v_path + filename)
	os.popen('git -C ' + v_path + ' add ' + filename)
	os.popen('git -C ' + v_path + ' commit -m "' + filename + '"')

	path = os.getcwd()
	os.popen('rm -rf '+ path + '/' + "GtuDevOps")
	os.popen('git clone https://github.com/' + g_id + '/GtuDevOps.git')
	time.sleep(1)
	if not os.path.exists(path + '/GtuDevOps/' + project_name):
		os.popen('mkdir '+ path + '/GtuDevOps/' + project_name)
	time.sleep(1)
	if os.path.exists(path + '/' + "GtuDevOps/"  + project_name + "/" + filename):
		os.popen('rm -f ' + path + '/' + "GtuDevOps/"  + project_name + "/" + filename)
	time.sleep(1)
	os.popen('cp -i '+ project_path + " " + path + '/' + "GtuDevOps/"  + project_name)
	time.sleep(1)
	os.popen('git -C '+path+'/'+"GtuDevOps" + ' remote set-url origin https://'+g_id+':'+password+'@github.com/'+g_id+'/GtuDevOps.git')
	#os.popen('git -C '+path+'/'+"GtuDevOps/" + project_name+" pull")
	time.sleep(1)
	os.popen('git -C '+path+'/'+"GtuDevOps add " + project_name)
	time.sleep(1)
	os.popen('git -C '+path+'/' + "GtuDevOps/" + project_name+' commit -m "first commit"')
	time.sleep(1)
	os.popen('git -C '+path+'/'+"GtuDevOps" + ' push -u origin master')
	time.sleep(1)

	os.popen('rm -f ' + t_path + '/' + filename)

def main(json_str):
	obj = json.loads(json_str)
	obj['destination'] = obj['origin']
	obj['name'] = obj['project_path'].split('/')[-1]

	if not os.path.exists('./sqlprojects'):
		os.popen('mkdir sqlprojects')
		os.popen("git init sqlprojects")

	if not os.path.exists('./sqlprojects/' + obj['project_name']):
		os.popen('mkdir '+ './sqlprojects/' + obj['project_name'])
		os.popen("git init " + './sqlprojects/' + obj['project_name'])

	if not os.path.exists('./sqlprojects/' + obj['project_name'] + '/temps/'):
		os.popen('mkdir '+ './sqlprojects/' + obj['project_name'] + '/temps')
		os.popen("git init " + './sqlprojects/' + obj['project_name'] + '/temps/')

	if not os.path.exists('./sqlprojects/' + obj['project_name'] + '/versions/'):
		os.popen('mkdir '+ './sqlprojects/' + obj['project_name'] + '/versions')
		os.popen("git init " + './sqlprojects/' + obj['project_name'] + '/versions/')

	t_path = './sqlprojects/' + obj['project_name'] + '/temps/'
	v_path = './sqlprojects/' + obj['project_name'] + '/versions/'

	# get_script operasyonu iptal, README'yi kontrol edin.
	# kullanilmayacak ama daha sonra calisir halde duzelticem.
	if obj['op'] == "get_script": 
		is_exists = os.path.exists(v_path+obj['name'])
		if is_exists:
			decoded = get_file(v_path+obj['name'])
			obj['file'] = b64encode(str(decoded).encode('utf-8')).decode('utf-8')
			obj['op'] = '?' #TODO: OPERATE
		else:
			#TODO: script yok hata gonder OPERATE
			obj['result'] = False


	elif obj['origin'] == '2' and obj['op'] == "version":
		file_path = obj['project_path']
		decoded = get_file(file_path)
		save_file(t_path+obj['name'], decoded)
		is_exists = os.path.exists(v_path+obj['name'])
		if is_exists:
			obj['destination'] = '9'
			decoded = get_file(t_path+obj['name'])
			obj['new'] = b64encode(str(decoded).encode('utf-8')).decode('utf-8')
			decoded = get_file(v_path+obj['name'])
			obj['old'] = b64encode(str(decoded).encode('utf-8')).decode('utf-8')
			obj['reminder'] = obj['origin']
		else:
			version_file(obj['name'], obj['project_path'], obj['project_name'], obj['github_login'], obj['github_password'], t_path, v_path)
			obj['result'] = True
	elif obj['origin'] == '9' and obj['op'] == "check":
		obj['destination'] = obj['reminder']
		if obj['result']:
			version_file(obj['name'], obj['project_path'], obj['project_name'], obj['github_login'], obj['github_password'], t_path, v_path)
			obj['result'] = True
		else:
			obj['result'] = False
	else:
		obj['result'] = False
	obj['origin'] = '8'
	del obj['op']
	body = json.dumps(obj)
	requests.post("http://localhost:8081/", json=obj)
main(json_str)
