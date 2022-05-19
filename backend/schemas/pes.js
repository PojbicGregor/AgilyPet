const mongoose = require("mongoose");

const pesSchema = new mongoose.Schema({
    pasma: String,
    visina: Number,
    starost: Number,
    zdrastvenoStanje: String
});

module.exports = mongoose.model("User", pesSchema);