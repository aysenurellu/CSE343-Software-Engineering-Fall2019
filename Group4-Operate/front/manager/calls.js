var socket = io.connect('http://localhost:4001');

document.getElementById("newProjectStartButton").addEventListener('click', function(){
	socket.emit('post', {
		origin:"4",
		destination: "2",
		action: "newProject",
		newProjectName: document.getElementById("newProjectName").value	
	});
	document.getElementById("newProjectName").value = "";
});
document.getElementById("UndeployButton").addEventListener('click', function(){
	socket.emit('post', {
		origin:"4",
		destination: "2",
		action: "undeploy",
		projectName: document.getElementById("UndeployProjectName").value
		
	});
	document.getElementById("UndeployProjectName").value = "";
});

socket.on('postIncoming', function(data){
	document.getElementById("UndeployProjectName").value = "got the value " + data.hi + " as an argument of \"hi\" in POST";
});