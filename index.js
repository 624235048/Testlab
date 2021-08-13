var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');


//Firebase Real Time
var firebase = require("firebase-admin");
var serviceAccount = require("./firebase_key.json");

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
	databaseURL: "https://book-shop-aff52-default-rtdb.asia-southeast1.firebasedatabase.app"
});

var db = firebase.database();

var port = process.env.PORT || 3000;
const app = express();
app.use(bodyParser.json());
app.use(cors());

//books get
app.get('/books',  function (req, res)  {  

	res.setHeader('Content-Type', 'application/json');

	var booksReference = db.ref("books");

	//Attach an asynchronous callback to read the data
	booksReference.on("value", 
				function(snapshot) {					
					res.json(snapshot.val());
					booksReference.off("value");
					}, 
				function (errorObject) {
					res.send("The read failed: " + errorObject.code);
				});
  
});
//rectandgle (post)
//app.post('/rectandgle',  function (req, res){
	//res.setHeader('Content-Type', 'application/json');

	//var side1 = req.body.side1;
	//var side2 = req.body.side2;

	//res.send('{ "result ": ' + (side1*side2) +'}');

	
//plus (post)
app.post('/plus',  function (req, res){
	res.setHeader('Content-Type', 'application/json');
	
	var num1 = req.body.num1;
	var num2 = req.body.num2;

	res.send('{ "result ": ' + (num1+num2) +'}');

});

//students (get)
app.get('/students',  function (req, res)  {  

	res.setHeader('Content-Type', 'application/json');

	var booksReference = db.ref("students");

	//Attach an asynchronous callback to read the data
	booksReference.on("value", 
				function(snapshot) {					
					res.json(snapshot.val());
					booksReference.off("value");
					}, 
				function (errorObject) {
					res.send("The read failed: " + errorObject.code);
				});
  
});


app.get('/topsellers',  function (req, res)  {  

		res.setHeader('Content-Type', 'application/json');

		var booksReference = db.ref("topsellers");
	
		//Attach an asynchronous callback to read the data
		booksReference.on("value", 
					function(snapshot) {					
						res.json(snapshot.val());
						booksReference.off("value");
						}, 
					function (errorObject) {
						res.send("The read failed: " + errorObject.code);
					});
  
});


app.get('/book/:bookid',  function (req, res)  {  
  	
		//Code Here
		res.setHeader('Content-Type', 'application/json');
		var bookid = Number(req.params.bookid);

		var booksReference = db.ref("books");

		//Attach an asynchronous callback to read the data
		booksReference.orderByChild("bookid").equalTo(bookid).on("child_added", 
					function(snapshot) {					
						res.json(snapshot.val());
						booksReference.off("value");
						}, 
					function (errorObject) {
						res.send("The read failed: " + errorObject.code);
					});
});

app.get('/student/:studentid',  function (req, res)  {  
  	
	//Code Here
	res.setHeader('Content-Type', 'application/json');
	var studentid = Number(req.params.studentid);

	var booksReference = db.ref("students");

	//Attach an asynchronous callback to read the data
	booksReference.orderByChild("studentid").equalTo(studentid).on("child_added", 
				function(snapshot) {					
					res.json(snapshot.val());
					booksReference.off("value");
					}, 
				function (errorObject) {
					res.send("The read failed: " + errorObject.code);
				});
});

app.delete('/book/:bookid',  function (req, res)  {  
  	
	//Code Here

	

});


app.get('/lastorderid',  function (req, res)  {  
  	
	res.setHeader('Content-Type', 'application/json');

	var ordersReference = db.ref("lastOrderId");

	ordersReference.on("value", 
				function(snapshot) {					
					res.json(snapshot.val());
					ordersReference.off("value");
					}, 
				function (errorObject) {
					res.send("The read failed: " + errorObject.code);
			});

});


app.put('/lastorderid',  function (req, res)  {  
	
	//Code Here


});




app.post('/order',  function (req, res)  {  

	//Code Here

});


app.listen(port, function () {
    console.log("Server is up and running...");
});
