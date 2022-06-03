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

        Course.findOne({ _id: id }, function (err, course) {
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
        console.log(req.body.slika.length)
        if (req.body.slika.length > 0) {
            var fs = require('fs');
            // string generated by canvas.toDataURL()
            var img = req.body.slika;
            // strip off the data: url prefix to get just the base64-encoded bytes
            var data = await img.replace(/^data:image\/\w+;base64,/, "");
            var buf = Buffer.from(data, 'base64');
            const axios = require('axios');

            axios.get('http://localhost:3001/course').then(resp => {

                //vaso pateko do slike
                fs.writeFile('C:/Users/Blazhe/agilypet/ts_frontend/our-app/public/slike/courseImages/image' + resp.data.length + '.png', buf, function () {
                });

                var course = new Course({
                    naziv: req.body.naziv,
                    slika: "image" + resp.data.length + ".png",
                    opis: req.body.opis,
                    manjkaEna: req.body.manjkaEna,
                    manjkataDve: req.body.manjkataDve,
                    sklepi: req.body.sklepi
                });

                course.save(function (err, course) {
                    brojac++;
                    console.log(brojac)
                    if (err) {

                        return res.status(500).json({
                            message: 'Error when creating course',
                            error: err
                        });
                    }
                    return res.status(201).json(course);

                });




            })

            setTimeout(async () => {
  
                const naz = req.body.naziv;
                const nov_course = await Course.findOne({ naziv: naz })


                const id = nov_course._id;
                const zeton = req.body.token;

                await Uporabnik.updateOne({ token: zeton }, {
                    $push: { course: id }
                })

                const up = await Uporabnik.findOne({ token: zeton }).lean()


                const up_id = up._id;
                const coursePromena = await Course.findOne({ naziv: naz }).lean()
                if (up.email === "admin@admin.com") {
                    await Course.updateOne({ naziv: naz }, {
                        $set: { jeDodal: " added from a Administrator" }
                    })
                } else {
                    await Course.updateOne({ naziv: naz }, {
                        $set: { jeDodal: " added from : "+ up.email }
                    })

                }
                await Course.updateOne({ naziv: naz }, {
                    if(err) {
                        return res.status(500).json({
                            message: 'Error when getting course.',
                            error: err
                        });
                    },
                    $push: { uporabnik: up_id }
                })
            }, 3000);
        }

    },


    /**
     * courseController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        Course.findOne({ _id: id }, function (err, course) {
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
            // course.slika = req.body.slika ? req.body.slika : course.slika;
            course.opis = req.body.opis ? req.body.opis : course.opis;
            course.velikost = req.body.velikost ? req.body.velikost : course.velikost;
            course.zdrastvenoStanje = req.body.zdrastvenoStanje ? req.body.zdrastvenoStanje : course.zdrastvenoStanje;

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
