const db = require("../models/baza");
const Uporabnik = db.registriran_uporabniks;
const Event = db.event;
var EventModel = db.event;
const Course = db.courses;

exports.getData = async (req, res) => {

    const zeton = req.body.token;


    await Uporabnik.updateOne({ token: zeton }, {
        $push: { prijavljeni: req.body.id }
    })
    const novUporabnik = await Uporabnik.findOne({ token: zeton })
    await Event.updateOne({ _id: req.body.id }, {
        $push: { prijavljeni_Users: novUporabnik._id }
    })
    EventModel.find(function (err, events) {
        if (err) {
            return res.status(500).json({
                message: 'Error when getting event.',
                error: err
            });
        }
        return res.json(novUporabnik);
    });
}


exports.odjavaDogodek = async (req, res) => {

    const zeton = req.body.token;

    await Uporabnik.updateOne({ token: zeton }, {
        $pull: { prijavljeni: req.body.id }
    });
    const novUporabnik = await Uporabnik.findOne({ token: zeton });

    await Event.updateOne({ _id: req.body.id }, {
        $pull: { prijavljeni_Users: novUporabnik._id }
    });
    return res.json(novUporabnik);

}



exports.prijavlenUser = async (req, res) => {
    const novUporabnik = await Uporabnik.findOne({ token: req.body.token })
    return res.json(novUporabnik);

}

exports.mojCourse = async (req, res) => {
    let mojiCoursi = [];
    const novUporabnik = await Uporabnik.findOne({ token: req.body.token })

    for (let i = 0; i <= novUporabnik.course.length - 1; i++) {
        let course = await Course.findOne({ _id: novUporabnik.course[i] })
        if (course === null) {
        }
        else {
            mojiCoursi.push(course)
        }

    }
    console.log("konec")

    return res.json(mojiCoursi);



}


exports.myDogs = async (req, res) => {
    const novUporabnik = await Uporabnik.findOne({ token: req.params.id })
    return res.json(novUporabnik.pes);

}
exports.deleteDog = async (req, res) => {

    await Uporabnik.updateOne({ token: req.body.token }, {
        "$pull": { "pes": { "_id": req.body.id } }
    })
    const uporabnik = await Uporabnik.findOne({ token: req.body.token })
    return res.json(uporabnik.pes);



}
exports.getDogodki = async (req, res) => {
    const uporbanikZaEvent = await Uporabnik.findOne({ token: req.params.id })
    let mojiEvents = [];
    console.log(uporbanikZaEvent.event.length)
    if (uporbanikZaEvent.event.length === null) {
        return res.json(mojiEvents);

    } else {
        for (let i = 0; i <= uporbanikZaEvent.event.length - 1; i++) {
            let event = await Event.findOne({ _id: uporbanikZaEvent.event[i] })
            if (event === null) {
            }
            else {
                mojiEvents.push(event)
            }
        }
        return res.json(mojiEvents);
    }
}

exports.deleteEvent = async (req, res) => {
    
    await Uporabnik.updateOne({ token: req.body.token }, {
        "$pull": { "event": req.body.id }
    });

    const uporbanikZaEvent = await Uporabnik.findOne({ token: req.body.token })
    let mojiEvents = [];

    console.log(uporbanikZaEvent)

    if (uporbanikZaEvent.event.length === null) {
        return res.json(mojiEvents);

    } else {
        for (let i = 0; i <= uporbanikZaEvent.event.length - 1; i++) {
            let event = await Event.findOne({ _id: uporbanikZaEvent.event[i] })
            if (event === null) {
            }
            else {
                mojiEvents.push(event)
            }
        }
        return res.json(mojiEvents);
    }


}