const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cors = require("cors");

const Pes = require("./schemas/pes.js");
const pes = require("./schemas/pes.js");

const port = 3001;
const app = express();
const MONGODB_URI = 'mongodb+srv://AgilyPet:PWFp2JX63wJkfAc@agilypet.8wt9o.mongodb.net/agilyPet?retryWrites=true&w=majority';
// Username: AgilyPet
// Password: PWFp2JX63wJkfAc
const url = "mongodb://localhost:27017/projekttest";

app.use(cors());
// parse application/json
app.use(bodyParser.json());

const db = mongoose.connect(MONGODB_URI || url, {useNewUrlParser:true, useUnifiedTopology: true}).then(runsrvr);


app.get("/", (req, res) => {
    
    res.send("hello, world");
});

app.get("/getpsi", (req, res) => {
    Pes.find({}, (err, docs) => {
        res.set('Content-Type', 'text/html');
        if(err) return err;
        console.log(docs);
        res.send(docs);
    });
});

app.get("/savepes/:ime/:pasma/:visina/:starost", (req, res) => {
    const ime = req.params.ime;
    const pasma = req.params.pasma;
    const visina = req.params.visina;
    const starost = req.params.starost;

    const pes = new Pes({ime: ime, pasma: pasma, visina: visina, starost: starost});
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

    const pes = new Pes({ime: ime, pasma: pasma, visina: visina, starost: starost});
    pes.save(req.body, (err, data) => {
        if(err) return console.log(err);
        res.send((data));
    })
    console.log(req.body);
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