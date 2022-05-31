module.exports = app => {
    const uporabnik = require("../controllers/uporabnik.controller");
  
    var router = require("express").Router();
  
    // Ustvari uporabnika
    router.post("/register", uporabnik.register);

    router.post("/login", uporabnik.login);
  
    
  
    app.use("/api", router);
  };