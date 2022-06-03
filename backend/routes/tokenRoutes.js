module.exports = app => {
    const tokens = require("../controllers/tokenController");
  
    var router = require("express").Router();
  

    
    router.post("/prijava", tokens.getData);

    router.post("/userLogged",tokens.prijavlenUser);

    router.post("/odjavaEvent",tokens.odjavaDogodek);

    app.use("/token", router);
  };