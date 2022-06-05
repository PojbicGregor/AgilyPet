const db = require("../models/baza");
var EventModel = db.event;
var Uporabnik = db.registriran_uporabniks;

const { google } = require('googleapis');

/**
 * eventController.js
 *
 * @description :: Server-side logic for managing events.
 */
module.exports = {

    /**
     * eventController.list()
     */
    list: function (req, res) {
        EventModel.find(function (err, events) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting event.',
                    error: err
                });
            }

            return res.json(events);
        });
    },

    /**
     * eventController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        
        EventModel.findOne({ _id: id }, function (err, event) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting event.',
                    error: err
                });
            }

            if (!event) {
                return res.status(404).json({
                    message: 'No such event'
                });
            }

            return res.json(event);
        });
    },

    /**
     * eventController.create()
     */
    create: async function (req, res) {
     let   imeEvent=req.body.ime;

        var event = new EventModel({
            ime: req.body.ime,
            datum: req.body.datum,
            opis: req.body.opis,
            naslov: req.body.naslov
        });

        //koledar
        const { OAuth2 } = google.auth

        const oAuth2Client = new OAuth2(
            '395321912984-mqg57h5o34radlvlf99jlrqqmmfas82k.apps.googleusercontent.com',
            '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'
        )

        oAuth2Client.setCredentials({
            refresh_token: '1//04nF377NVe3N6CgYIARAAGAQSNwF-L9IrJ93FIBNBCjFKbfQijXLQylPEFJkrS3e1Kxt55og46PUDhjiDGaAlVxpmJWSYCqBElOc'
        })


        const calendar = google.calendar({ version: 'v3', auth: oAuth2Client })

        const eventStartTime = new Date(req.body.datum + 'T09:58:20.843Z')

        const eventEndTime = new Date(req.body.datum + 'T09:58:20.843Z')

        eventEndTime.setMinutes(eventEndTime.getMinutes() + 45)


        //console.log(eventEndTime)
        const event1 = {
            summary: req.body.ime,
            location: req.body.naslov,
            description: req.body.opis,
            colorId: 1,
            start: {
                dateTime: eventStartTime,
                timeZone: 'America/Denver',
            },
            end: {
                dateTime: eventEndTime,
                timeZone: 'America/Denver',

            },
        }
        calendar.freebusy.query(
            {
                resource: {
                    timeMin: eventStartTime,
                    timeMax: eventEndTime,
                    timeZone: 'America/Denver',
                    items: [{ id: 'primary' }],
                },
            },
            (err, res) => {
                if (err) return console.error('Free Busy Query Error: ', err)

                const eventArr = res.data.calendars.primary.busy

                
                    return calendar.events.insert(
                        { calendarId: 'primary', resource: event1 },
                        err => {
                            if (err) return console.error('Error Creating Calender Event:', err)
                            return console.log('Calendar event successfully created.')
                        }
                    )

              
            }


        )
        //
        event.save(function (err, event) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating event',
                    error: err
                });
            }

        });

        setTimeout(async () => {
        const nov_event = await EventModel.findOne({ ime: imeEvent})
        await Uporabnik.updateOne({ token: req.body.token }, {
            $push: { event: nov_event._id }
        })
        return res.status(201).json(nov_event);

    }, 1000);

    },

    /**
     * eventController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        EventModel.findOne({ _id: id }, function (err, event) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting event',
                    error: err
                });
            }

            if (!event) {
                return res.status(404).json({
                    message: 'No such event'
                });
            }

            event.ime = req.body.ime ? req.body.ime : event.ime;
            event.datum = req.body.datum ? req.body.datum : event.datum;
            event.opis = req.body.opis ? req.body.opis : event.opis;
            event.naslov = req.body.naslov ? req.body.naslov : event.naslov;

            event.save(function (err, event) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating event.',
                        error: err
                    });
                }

                return res.json(event);
            });
        });
    },

    /**
     * eventController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        EventModel.findByIdAndRemove(id, function (err, event) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the event.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    }
};
