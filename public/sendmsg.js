var input = document.getElementById("videoid");
document.getElementById("message").addEventListener("keydown", async function(event) {
  if (event.keyCode === 13) {
   await sendMsg();
  }
});

async function sendMsg(){
	//alert('hello');
	
	var msgBox = document.getElementById("message");
	var message = msgBox.value;
	/*
	var request = new XMLHttpRequest();
	request.open("POST", "https://chatapp.scrge.repl.co/sendmsg");
	request.setRequestHeader("Content-Type", "text/plain");
	//alert(JSON.stringify({message: "my message"}));
	request.send(message);

	
	*/

	await fetch("https://chatapp.scrge.repl.co/sendmsg", {
		method: "POST",
		headers: {
			"Content-Type": "text/plain"
		},
		body: message
	})

	msgBox.value = "";
}