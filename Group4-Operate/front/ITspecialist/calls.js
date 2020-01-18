var socket = io.connect('http://localhost:4001');



document.getElementById("AssignmentButton").addEventListener('click', function(){
	socket.emit('post', {
		origin:"4",
		destination: "2",
		action: "assignment",		

		projectName: document.getElementById("ProjectName").value,
		projectDescription:document.getElementById("ProjectDescription").value


		
	});
	document.getElementById("ProjectName").value = "";
	document.getElementById("ProjectDescription").value = "";
});

document.getElementById("NewTaskButton").addEventListener('click', function(){
	socket.emit('post', {
		origin:"4",
		destination: "2",
		action: "newtask",		

		projectName: document.getElementById("ProjectName1").value,
		projectDescription:document.getElementById("TaskDescription").value


		
	});
	document.getElementById("ProjectName1").value = "";
	document.getElementById("TaskDescription").value = "";
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
	document.getElementById("ProjectName").value = data.ProjectName;
});
