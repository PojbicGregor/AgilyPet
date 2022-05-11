const express = require("express");
const mongoose = require("mongoose");

const Pes = require("./schemas/pes.js");

const port = 3000;
const app = express();
const url = "mongodb://localhost:27017/projekttest";

mongoose.connect(url, {useNewUrlParser:true, useUnifiedTopology: true}).then(runsrvr);


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