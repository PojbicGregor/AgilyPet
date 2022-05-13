const mongoose = require("mongoose");

const pesSchema = new mongoose.Schema({
    ime: String,
    pasma: String,
    visina: Number,
    starost: Number
});

module.exports = mongoose.model("User", pesSchema);