//alert("hello")
async function awaitMsg(){
	while(true){
		var msgListener = await fetch("https://chatapp.scrge.repl.co/awaitmsg", {
			method:"GET"
		})

		const timeout = await new Promise((resolve, reject) => {
		  setTimeout(() => {
		    resolve('foo');
		  }, 200);
		});
		
		req = fetch("https://chatapp.scrge.repl.co/getmsgs", {
			method:"POST",
			headers:{
				"Content-Type": "text/plain"
			},
			body:"0"
		})
		
		req.then((res) => {res.text().then(s => {
			restext = s.split('"')[1];
			//alert(restext);
			document.getElementById("messages").innerHTML = restext + "<br>" + document.getElementById("messages").innerHTML;
		})});
	}
}
awaitMsg()