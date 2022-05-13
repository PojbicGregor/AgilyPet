const express = require("express");
const mongoose = require("mongoose");

const Pes = require("./schemas/pes.js");
var mail = require('./mailer/mailer.js');

const port = 3001;
const app = express();
const MONGODB_URI = 'mongodb+srv://AgilyPet:PWFp2JX63wJkfAc@agilypet.8wt9o.mongodb.net/agilyPet?retryWrites=true&w=majority';
// Username: AgilyPet
// Password: PWFp2JX63wJkfAc
const url = "mongodb://localhost:27017/projekttest";

mongoose.connect(MONGODB_URI || url, {useNewUrlParser:true, useUnifiedTopology: true}).then(runsrvr);

app.get("/", (req, res) => {
    res.send("hello, world");

    //Primer pošiljanja emaila
    mail.sendEmail('janlukac2000@gmail.com', 'posiljam', 'posiljam iz node');
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