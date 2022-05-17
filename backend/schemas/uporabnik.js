const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")
const uporabnikShema = new mongoose.Schema({
    email: {type:String ,required:true, unique:true},
    username: {type:String ,required:true, unique:true},
    password: {type:String ,required:true},
    tokeni:{type:String}
});

module.exports = mongoose.model("Registriran_Uporabnik", uporabnikShema);
