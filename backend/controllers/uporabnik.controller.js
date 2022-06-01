const db = require("../models/baza");

const jwt = require('jsonwebtoken')

const JWT_SECRET = 'sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk'

const bcrypt =require('bcryptjs');
const Uporabnik = db.registriran_uporabniks; 


//registriraj novega uporabnika
exports.register = async (req, res) => {
    console.log("nekaj dela");
    console.log(req.body);


    const email = req.body.email;
    const geslo = req.body.geslo;
    const username = req.body.username;
    const password = await bcrypt.hash(geslo, 10);


    if (!username || typeof username !== 'string') {
		//return res.json({ status: 'error', error: 'Invalid username' })

        res.status(400).send({ message: "Invalid username" });
        return;
	}

	if (!email || typeof email !== 'string') {
		//return res.json({ status: 'error', error: 'Invalid email' })

        res.status(400).send({ message: "Invalid email" });
        return;
	}

    if (!geslo || typeof geslo !== 'string') {
		//return res.json({ status: 'error', error: 'Invalid password' })

        res.status(400).send({ message: "Invalid password" });
        return;
	}

    if (geslo.length < 5) {
		/*return res.json({
			status: 'error',
			error: 'Password too small. Should be atleast 6 characters'
		})*/

        res.status(400).send({ message: "Password too small. Should be atleast 6 characters" });
        return;
	}

    try {
		const response = await Uporabnik.create({
			email,
			username,
			password
		})
		console.log('User created successfully: ', response)
	} catch (error) {
		if (error.code === 11000) {
			// duplicate key
			return res.json({ status: 'error', error: 'Username/email already in use' })
		}
		throw error
	}

    res.json({ status: 200 })
}

exports.login = async (req, res) => {
  console.log("nekaj dela");
  console.log(req.body);

  const email = req.body.email;
    const password = req.body.geslo;

	const user = await Uporabnik.findOne({ email }).lean()

	if (!user) {
		return res.json({ status: 'error', error: 'Invalid username/password' })
	}

	if (await bcrypt.compare(password, user.password)) {
		// the username, password combination is successful

		const token = jwt.sign(
			{
				id: user._id,
				email: user.email
			},
			JWT_SECRET
		)
		const _id=user._id;

       await Uporabnik.updateOne(
		   {_id},
		   {
			   $set:{token:token}
		   }
	   )
		return res.json({ status: 'ok', data: token })
	}

	res.json({ status: 'error', error: 'Invalid username/password' })
}

exports.dodajPsa = async (req,res) => {
	const pes = {
		ime: req.body.ime,
    	pasma: req.body.pasma,
    	visina: req.body.visina,
    	starost: req.body.starost,
    	manjkaEna: req.body.manjkaEna,
		manjkataDve: req.body.manjkataDve,
		sklepi: req.body.sklepi
	}
	

	const zeton = req.body.token;
	const user = await Uporabnik.findOne({ zeton }).lean()

	
		await Uporabnik.updateOne({token: zeton}, {
			$push:{pes:pes} 
		})
		console.log('User updated successfully')
	
	
	console.log(pes);
	console.log(zeton);
	
	//res.json({ status: 200 })
};

exports.izpisiPse = async (req, res) => {
	const zeton = req.body.token;
	const user = await Uporabnik.findOne({ token: zeton }).lean()
	const user_name = await Uporabnik.findOne({ username: "Tester6" }).lean()
  
	console.log(user_name.pes);

	//Dela, treba samo frontend in spremeniti izpis
};
