const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    naziv: String,
    slika: Number,
    opis: String,
    velikost:{ type : Array , "default" : [] },
    zdrastvenoStanje:{ type : Array , "default" : [] }
});

module.exports = mongoose.model("Course", courseSchema);