restext = ""
var msgs = [];
var promises = []

for(var i = 0; i < 30; i++){
	msgs.push("message not found");
}

function getInd(s){
	for(var i = s.length; i<=0; i--){
		if(s[i] == '"'){
			return i
		}
	}
}

for(var i = 0; i < 30; i++){
	//alert(i);
	
	
	req = fetch("https://chatapp.scrge.repl.co/getmsgs", {
		method:"POST",
		headers:{
			"Content-Type": "text/plain"
		},
		body:i.toString()
	})

	promises.push(req)
	
	req.then((res) => {res.text().then(s => {
		console.log(s);
		//restext = restext.concat("<br></br>", s);
		//document.getElementById("messages").innerHTML = restext;
		//alert(msgs[parseInt(req.body)])
		var msg = s.split('"')[1];
		var ind = parseInt(s.split('"')[2]);
		msgs[ind] = msg;
	})});
}

Promise.allSettled(promises).then(() => {
	for(var i = 0; i < msgs.length; i++){
		//alert(msgs[i]);
		document.getElementById("messages").innerHTML += "<br>" + msgs[i];
	}
});
//alert(restext);

