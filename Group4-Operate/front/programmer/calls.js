var socket = io.connect('http://localhost:4001');

document.getElementById("ProjectPathButton").addEventListener('click', function(){
	if(document.getElementById("projectPath").value != "" && document.getElementById("projectName").value != ""){
	socket.emit('post', {
		origin:"4",
		destination: "2",
		action: "upload",
		projectName: document.getElementById("projectName").value,
		projectPath: document.getElementById("projectPath").value
		
	});}
	else{
		window.alert("Empty Project Path or Project Name is not allowed!")
	}

	document.getElementById("projectPath").value = "";
	document.getElementById("projectName").value = "";
});
document.getElementById("SqlProjectPathButton").addEventListener('click', function(){
	if(document.getElementById("projectPath").value !="" && document.getElementById("projectName").value != ""){
	socket.emit('post', {
		origin:"4",
		destination: "2",
		action: "uploadsql",
		projectName: document.getElementById("projectName").value,
		projectPath: document.getElementById("projectPath").value
		
	});}
	else{
		window.alert("Empty Project Path or Project Name is not allowed!")
	}
	document.getElementById("projectPath").value = "";
	document.getElementById("projectName").value = "";
});
