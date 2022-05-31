const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cors = require("cors");
const {google} = require('googleapis');

//const bodyParser = require('body-parser'); // tuka

//var cors = require('cors');
var allowedOrigins = ['http://localhost:3000', 'http://localhost:3001'];
const app = express();
app.use(cors({
  credentials: true,
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      var msg = "The CORS policy does not allow access from the specified Origin.";
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

router = express.Router();

const Pes = require("./schemas/pes.js");
const Uporabnik = require('./schemas/uporabnik')
var mail = require('./mailer/mailer.js');
const pes = require("./schemas/pes.js");
const Course = require('./schemas/course.js')

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const JWT_SECRET = 'sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk'

const { stringify } = require('querystring');
// const fetch = require('node-fetch');
const { resolve4 } = require("dns");
const port = 3001;
const MONGODB_URI = 'mongodb+srv://AgilyPet:PWFp2JX63wJkfAc@agilypet.8wt9o.mongodb.net/agilyPet?retryWrites=true&w=majority';
// Username: AgilyPet
// Password: PWFp2JX63wJkfAc
const url = "mongodb://localhost:27017/projekttest";


app.use(cors());
// parse application/json
app.use(bodyParser.json());

const db = mongoose.connect(MONGODB_URI || url, { useNewUrlParser: true, useUnifiedTopology: true }).then(runsrvr);

app.get("/", (req, res) => {
  res.send("hello, world");

  //Primer pošiljanja emaila
  mail.sendEmail('janlukac2000@gmail.com', 'posiljam', 'posiljam iz node');
});

app.get("/getpsi", (req, res) => {
  Pes.find({}, (err, docs) => {
    res.set('Content-Type', 'text/html');
    if (err) return err;
    console.log(docs);
    res.send(docs);
  });
});
const courseController = require('../backend/controllers/courseController.js');

var courseRouter = require("./routes/courseRoutes.js");

app.use('/courses', courseRouter);

app.get("/savepes/:ime/:pasma/:visina/:starost", (req, res) => {
  const ime = req.params.ime;
  const pasma = req.params.pasma;
  const visina = req.params.visina;
  const starost = req.params.starost;

  const pes = new Pes({ ime: ime, pasma: pasma, visina: visina, starost: starost });
  pes.save().then(() => {
    res.send(`saved pes ${pes}`);

    Pes.find({}, (err, docs) => {
      if (err) return err;
      console.log(docs);
    });
  });
});


app.post("/post_test", async (req, res) => {
  const ime = req.body.ime;
  const pasma = req.body.pasma;
  const visina = req.body.visina;
  const starost = req.body.starost;

  const pes = new Pes({ ime: ime, pasma: pasma, visina: visina, starost: starost });
  pes.save(req.body, (err, data) => {
    if (err) return console.log(err);
    res.send((data));
  })
  console.log(req.body);
});



function runsrvr() {
  /*const db = mongoose.connection;
  console.log(db);
  db.on("error", () => {console.log("dg error");});
  db.once("open", () => {console.log("connected to db");});*/
  app.listen(port, () => {
    console.log(`server is running on port ${port}`);
  });
}
app.use(bodyParser.json());
const bodyParser2 = require('express');      //menjam
const { Router } = require("express");
app.use(bodyParser2.json());                //menjam
app.get("/register", (req, res) => {
  res.sendFile(__dirname + "/views/register.html");
  app.use(bodyParser2.json());             //menjam
});

app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/views/login.html");
  app.use(bodyParser2.json());             //menjam

});


app.post('/api/register', async (req, res) => {
  const email = req.body.email;
  const geslo = req.body.geslo;
  const username = req.body.username;
  //const {email,username,password:plainTextPassword}=req.body;
  //const password = await bcrypt.hash(plainTextPassword, 10)
  const password = await bcrypt.hash(geslo, 10)

  if (!username || typeof username !== 'string') {
    return res.json({ status: 'error', error: 'Invalid username' })
  }
  if (!email || typeof email !== 'string') {
    return res.json({ status: 'error', error: 'Invalid email' })
  }

  /*if (!plainTextPassword || typeof plainTextPassword !== 'string') {
    return res.json({ status: 'error', error: 'Invalid password' })
  }*/

  if (!geslo || typeof geslo !== 'string') {
    return res.json({ status: 'error', error: 'Invalid password' })
  }

  /*if (plainTextPassword.length < 5) {
    return res.json({
      status: 'error',
      error: 'Password too small. Should be atleast 6 characters'
    })
  }*/

  if (geslo.length < 5) {
    return res.json({
      status: 'error',
      error: 'Password too small. Should be atleast 6 characters'
    })
  }

  try {
    const response = await Uporabnik.create({
      email,
      username,
      password
    })
    console.log('User created successfully: ', response)
  } catch (error) {
    if (error.code === 11000) {
      // duplicate key
      return res.json({ status: 'error', error: 'Username/email already in use' })
    }
    throw error
  }

  res.json({ status: 200 })

});

app.post('/api/login', async (req, res) => {

  const email = req.body.email;
  const password = req.body.geslo;

  const user = await Uporabnik.findOne({ email }).lean()

  if (!user) {
    return res.json({ status: 'error', error: 'Invalid username/password' })
  }

  if (await bcrypt.compare(password, user.password)) {
    // the username, password combination is successful

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email
      },
      JWT_SECRET
    )
    const _id = user._id;

    await Uporabnik.updateOne(
      { _id },
      {
        $set: { token: token }
      }
    )
    return res.json({ status: 'ok', data: token })
  }

  res.json({ status: 'error', error: 'Invalid username/password' })
})
app.post('/api/logout', async (req,res)=>{
    
})


	 Course.find()
	 	.then((results) =>{
	//	res.send(results)
		zacuvaj=results
		console.log(zacuvaj)
		
	})
	.catch((err)=>{
		console.log(err)
	})
      
const { OAuth2 } = google.auth

const oAuth2Client = new OAuth2(
  '395321912984-mqg57h5o34radlvlf99jlrqqmmfas82k.apps.googleusercontent.com',
  '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'
)

oAuth2Client.setCredentials({
	refresh_token: '1//04nF377NVe3N6CgYIARAAGAQSNwF-L9IrJ93FIBNBCjFKbfQijXLQylPEFJkrS3e1Kxt55og46PUDhjiDGaAlVxpmJWSYCqBElOc'
})

const calendar = google.calendar({ version: 'v3', auth: oAuth2Client })

const eventStartTime = new Date('2022-05-27T09:58:20.843Z')

console.log(eventStartTime);

const eventEndTime = new Date('2022-05-27T09:58:20.843Z')
eventEndTime.setMinutes(eventEndTime.getMinutes() + 45)

console.log(eventEndTime)
const event = {
  summary: `AgilyPet`,
  location: `MARIBOR`,
  description: `TEST AGILYPET`,
  colorId: 1,
  start: {
    dateTime: eventStartTime,
    timeZone: 'America/Denver',
  },
  end: {
    dateTime: eventEndTime,
    timeZone: 'America/Denver',

  },
}
calendar.freebusy.query(
  {
    resource: {
      timeMin: eventStartTime,
      timeMax: eventEndTime,
      timeZone: 'America/Denver',
      items: [{ id: 'primary' }],
    },
  },
  (err, res) => {
    if (err) return console.error('Free Busy Query Error: ', err)

    const eventArr = res.data.calendars.primary.busy

    if (eventArr.length === 0)
      return calendar.events.insert(
        { calendarId: 'primary', resource: event },
        err => {
          if (err) return console.error('Error Creating Calender Event:', err)
          return console.log('Calendar event successfully created.')
        }
      )

    return console.log(`Sorry I'm busy...`)
  }
)

