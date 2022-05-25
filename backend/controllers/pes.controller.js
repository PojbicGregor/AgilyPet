const db = require("../models/baza");
const Pes = db.pes;                    //


exports.create = (req, res) => {
  // Validate request
  console.log("nekaj dela");
  console.log(req);
  if (!req.body.ime) {
    res.status(400).send({ message: "Must not be empty" });
    return;
  }

  // Create Pes
  const pes = new Pes({
    ime: req.body.ime,
    pasma: req.body.pasma,
    visina: req.body.visina,
    starost: req.body.starost,
    zdravstvenoStanje: req.body.zdravstvenoStanje
  });

  // Shrani v bazo
  pes
    .save(pes)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error"
      });
    });
};