var socket = io.connect('http://localhost:4001');

document.getElementById("newProjectStartButton").addEventListener('click', function(){
	if(document.getElementById("newProjectName").value != ""){
	socket.emit('post', {
		origin:"4",
		destination: "2",
		action: "newProject",
		newProjectName: document.getElementById("newProjectName").value	
	});}
	else{
		window.alert("Empty Project Name is not allowed!")
	}
	document.getElementById("newProjectName").value = "";
});
document.getElementById("UndeployButton").addEventListener('click', function(){
	if(document.getElementById("undeployProjectName").value != ""){
	socket.emit('post', {
		origin:"4",
		destination: "2",
		action: "undeploy",
		projectName: document.getElementById("undeployProjectName").value
		
	});}
	else{
		window.alert("Empty Undeploy Project Name is not allowed!")
	}
	document.getElementById("undeployProjectName").value = "";
});

socket.on('postIncoming', function(data){
	document.getElementById("UndeployProjectName").value = "got the value " + data.hi + " as an argument of \"hi\" in POST";
});