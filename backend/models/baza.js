const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.pes = require("./pes.model.js")(mongoose); //TU MOGOČE PSI

module.exports = db;