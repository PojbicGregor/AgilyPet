const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');


//ŠE NE FUNKCIONIRA!!!!!!!!!!!!


var router = express.Router();

const Pes = require("../schemas/pes.js");


const port = 3001;
const MONGODB_URI = 'mongodb+srv://AgilyPet:PWFp2JX63wJkfAc@agilypet.8wt9o.mongodb.net/agilyPet?retryWrites=true&w=majority';
const url = "mongodb://localhost:27017/projekttest";



mongoose.connect(MONGODB_URI || url, {useNewUrlParser:true, useUnifiedTopology: true});


router.use(bodyParser.json());


router.post("/dodan_pes", async (req, res) => {
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

module.exports = router;