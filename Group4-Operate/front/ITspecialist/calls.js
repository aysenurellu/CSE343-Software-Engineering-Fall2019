var socket = io.connect('http://localhost:4001');



document.getElementById("AssignmentButton").addEventListener('click', function(){
	if(document.getElementById("projectName").value != "" && document.getElementById("projectDescription").value !="" ){
	socket.emit('post', {
		origin:"4",
		destination: "2",
		action: "assignment",		

		projectName: document.getElementById("projectName").value,
		projectDescription:document.getElementById("projectDescription").value


		
	});}
	else{
		window.alert("Empty Project Name or Project Description is not allowed!")
	}
	document.getElementById("projectName").value = "";
	document.getElementById("projectDescription").value = "";
});

document.getElementById("NewTaskButton").addEventListener('click', function(){
	if(document.getElementById("projectName1").value != "" && document.getElementById("taskDescription").value != ""){
	socket.emit('post', {
		origin:"4",
		destination: "2",
		action: "newtask",		

		projectName: document.getElementById("projectName1").value,
		projectDescription:document.getElementById("taskDescription").value


		
	});}
	else{
		window.alert("Empty Project Name or Task Description is not allowed!")
	}
	document.getElementById("projectName1").value = "";
	document.getElementById("taskDescription").value = "";
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
	document.getElementById("projectName").value = data.ProjectName;
});
