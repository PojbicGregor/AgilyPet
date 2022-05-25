module.exports = app => {
    const pes = require("../controllers/pes.controller.js");
  
    var router = require("express").Router();
  
    // Ustvari psa
    router.post("/dodaj_psa", pes.create);
  
    
  
    app.use("/api", router);
  };