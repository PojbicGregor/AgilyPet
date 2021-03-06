module.exports = app => {
    const courseController = require("../controllers/courseController");
  
    var router = require("express").Router();
  
    /*
    * GET
    */
    router.get('/', courseController.list);

    /*
    * GET
    */
    router.get('/:id', courseController.show);

    /*
    * POST
    */
    router.post('/dodan_course', courseController.create);

    /*
    * PUT
    */
    router.put('/:id', courseController.update);

    /*
    * DELETE
    */
    router.delete('/:id', courseController.remove);
    
    app.use("/course", router);
};


/*var express = require('express');
var router = express.Router();
var courseController = require('../controllers/courseController.js');


//GET
router.get('/', courseController.list);

//GET
router.get('/:id', courseController.show);

//POST
router.post('/dodan_course', courseController.create);

//PUT
router.put('/:id', courseController.update);

//DELETE
router.delete('/:id', courseController.remove);

module.exports = router;*/