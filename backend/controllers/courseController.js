//var CourseModel = require('../schemas/course.js');
const db = require("../models/baza");
const Course = db.courses;
const Uporabnik = db.registriran_uporabniks;


module.exports = {

    /**
     * courseController.list()
     */
    list: function (req, res) {
        Course.find(function (err, courses) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting course.',
                    error: err
                });
            }

            return res.json(courses);
        });
    },

    /**
     * courseController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        Course.findOne({_id: id}, function (err, course) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting course.',
                    error: err
                });
            }

            if (!course) {
                return res.status(404).json({
                    message: 'No such course'
                });
            }

            return res.json(course);
        });
    },

    /**
     * courseController.create()
     */
    create: async function (req, res) {
        var course = new Course({
			naziv : req.body.naziv,
			slika : req.body.slika,
			opis : req.body.opis,
			//velikost : req.body.velikost,
			manjkaEna : req.body.manjkaEna,
            manjkataDve: req.body.manjkataDve,
            sklepi: req.body.sklepi
        });

        course.save(function (err, course) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating course',
                    error: err
                });
            }

            return res.status(201).json(course);
        });

        console.log(req.body);

        const naz = req.body.naziv;
        console.log(naz);
        const nov_course = await Course.findOne({ naziv: naz })

        console.log(nov_course);

        const id = nov_course._id;
        const zeton = req.body.token;

            await Uporabnik.updateOne({token: zeton}, {
			    $push:{course : id} 
		    })
        console.log(id);

        //
        const up = await Uporabnik.findOne({ token: zeton })
        const up_id = up._id;

        await Course.updateOne({ naziv: naz }, {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting course.',
                    error: err
                });
            },
            $push:{uporabnik : up_id}  
        })
        console.log(up_id);
        console.log(naz);
        console.log(nov_course);
        
    },

    /**
     * courseController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        Course.findOne({_id: id}, function (err, course) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting course',
                    error: err
                });
            }

            if (!course) {
                return res.status(404).json({
                    message: 'No such course'
                });
            }

            course.naziv = req.body.naziv ? req.body.naziv : course.naziv;
			course.slika = req.body.slika ? req.body.slika : course.slika;
			course.opis = req.body.opis ? req.body.opis : course.opis;
			//course.velikost = req.body.velikost ? req.body.velikost : course.velikost;
			course.manjkaEna = req.body.manjkaEna ? req.body.manjkaEna : course.manjkaEna;
            course.manjkataDve = req.body.manjkataDve ? req.body.manjkataDve : course.manjkataDve;
            course.sklepi = req.body.sklepi ? req.body.sklepi : course.sklepi;
			
            course.save(function (err, course) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating course.',
                        error: err
                    });
                }

                return res.json(course);
            });
        });
    },

    /**
     * courseController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        Course.findByIdAndRemove(id, function (err, course) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the course.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    }
};
