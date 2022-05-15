const express = require("express");
const mongoose = require("mongoose");

const Pes = require("./schemas/pes.js");
const Uporabnik=require('./schemas/uporabnik')

const bcrypt =require('bcryptjs');
const jwt = require('jsonwebtoken')

const JWT_SECRET = 'sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk'

const port = 3001;
const app = express();
const MONGODB_URI = 'mongodb+srv://AgilyPet:PWFp2JX63wJkfAc@agilypet.8wt9o.mongodb.net/agilyPet?retryWrites=true&w=majority';
// Username: AgilyPet
// Password: PWFp2JX63wJkfAc
const url = "mongodb://localhost:27017/projekttest";

mongoose.connect(MONGODB_URI || url, {useNewUrlParser:true, useUnifiedTopology: true}).then(runsrvr);


app.get("/", (req, res) => {
    
    res.send("hello, world ");
   
});

app.get("/getpsi", (req, res) => {
    Pes.find({}, (err, docs) => {
        res.set('Content-Type', 'text/html');
        if(err) return err;
        console.log(docs);
        res.send(docs);
    });
});

app.get("/savepes/:pasma/:visina/:starost", (req, res) => {
    const pasma = req.params.pasma;
    const visina = req.params.visina;
    const starost = req.params.starost;

    const pes = new Pes({pasma: pasma, visina: visina, starost: starost});
    pes.save().then(() => {
        res.send(`saved pes ${pes}`);

        Pes.find({}, (err, docs) => {
            if (err) return err;
            console.log(docs);
        });
    });
});



function runsrvr () {
    /*const db = mongoose.connection;
    console.log(db);
    db.on("error", () => {console.log("dg error");});
    db.once("open", () => {console.log("connected to db");});*/
    app.listen(port, () => {
        console.log(`server is running on port ${port}`);
    });
}
const bodyParser= require('express');
app.use(bodyParser.json());
app.get("/register", (req, res) => {
    res.sendFile(__dirname + "/views/doma.html");
    app.use(bodyParser.json());

  });
  app.get("/login", (req, res) => {
    res.sendFile(__dirname + "/views/login.html");
    app.use(bodyParser.json());

  });


  app.post('/api/register', async(req,res)=>{
    const {username,password:plainTextPassword}=req.body;
    const password = await bcrypt.hash(plainTextPassword, 10)

   	if (!username || typeof username !== 'string') {
		return res.json({ status: 'error', error: 'Invalid username' })
	}

	if (!plainTextPassword || typeof plainTextPassword !== 'string') {
		return res.json({ status: 'error', error: 'Invalid password' })
	}

	if (plainTextPassword.length < 5) {
		return res.json({
			status: 'error',
			error: 'Password too small. Should be atleast 6 characters'
		})
	}

	try {
		const response = await Uporabnik.create({
			username,
			password
		})
		console.log('User created successfully: ', response)
	} catch (error) {
		if (error.code === 11000) {
			// duplicate key
			return res.json({ status: 'error', error: 'Username already in use' })
		}
		throw error
	}

	res.json({ status: 'ok' })

  });

  app.post('/api/login', async (req,res)=>{
    
    const { username, password } = req.body
	const user = await Uporabnik.findOne({ username }).lean()

	if (!user) {
		return res.json({ status: 'error', error: 'Invalid username/password' })
	}

	if (await bcrypt.compare(password, user.password)) {
		// the username, password combination is successful

		const token = jwt.sign(
			{
				id: user._id,
				username: user.username
			},
			JWT_SECRET
		)

		return res.json({ status: 'ok', data: token })
	}

	res.json({ status: 'error', error: 'Invalid username/password' })
})
app.post('/api/logout', async (req,res)=>{
    
})