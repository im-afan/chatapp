const express = require("express")
const Database = require("@replit/database")
const bodyParser = require("body-parser")
const cors = require("cors");
const {watch, unwatch} = require("watch-object")

const db = new Database();

var app = express();

var toggleMsg = {switch: true};
/*
var toggleProxy = new Proxy(toggleMsg, {
	set: function (target, key, value){
		console.log("toggle!");
		target[key] = value;
		return true;
	}
});*/

//console.log(")
//codin
//app.use(app.router);
app.use('/', express.static('public'));
//app.use(cors());

app.use(bodyParser.text())

app.get("/awaitmsg", async (req, res) => {
	console.log("someone waiting for msg");
	await watch(toggleMsg, "switch", (newVal, oldVal) => {
		res.end();
		console.log(newVal, oldVal);
	});

	unwatch()
});

app.post("/getmsgs", async (req, res) => {
	//console.log("get");

	//res.write("hello");
	//res.end();
	//var ind = req.body

	var originalURL = req.originalUrl;
	
	//if(originalURL == "/scripts/getmsgs.js"){
		//console.log("someone wants the messages");
		var responseString = "";
		var responseObject = {}
		var msgIndex = await db.get("msgIndex");

		var ind = parseInt(msgIndex) -parseInt(req.body);
		
			//console.log(msgIndex);
			//console.log(ind);

			/*
			for(var i = 0; i < parseInt(msgIndex); i++){
					
					console.log(i);
					try{
						var s = await db.get(i.toString(), {raw:true})
							
						responseString = responseString.concat(s);
						//responseObject[i] = s;
						try{
							console.log(i);
							responseObject[i] = s;
						} catch(error){
							console.log(error)
						}
						console.log(responseObject);
					
					} catch(error){
						//console.log('ERRORERRORERROR');
						continue;
					}
			}
			*/
		var s = await db.get(ind.toString(), {raw:true});
		responseString = s;
		//console.log("responseString:" + responseString)
		
		res.send(responseString + req.body);
		//res.end();
});

//app.use(bodyParser.text());

app.post("/sendmsg", (req, res) =>{
	console.log("got message");
	var msg = req.body;
	console.log(msg);
	var msgIndex;
	db.get("msgIndex").then(value => {
		//console.log(value);
		msgIndex = parseInt(value);
		//console.log("get msgIndex");
		//console.log(msgIndex);
		//console.log((msgIndex+1).toString())
		
		db.set((msgIndex+1).toString(), msg).then(value => {});
		db.set("msgIndex", (msgIndex+1).toString()).then(value => {});
	});

	
	//console.log("done");
	toggleMsg.switch = !toggleMsg.switch;

	res.end()
});

app.use(bodyParser.text())



console.log("app running!")
app.listen(8000);