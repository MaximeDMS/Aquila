const express = require('express');
const path = require('path');
const serveStatic = require('serve-static');
const nodemailer = require("nodemailer");
const bodyParser = require('body-parser')

const port = process.env.PORT || 5000;

const app = express();

app.use(serveStatic(path.join(__dirname, 'assets')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.post('/mail', function (req, res) {
	console.log('Got body:', req.body);
	sendMailNewAccount(req.body).catch(console.error);
	res.sendFile(__dirname + '/index.html');
});

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/index.html');
});




async function sendMailNewAccount(data) {
	// Generate test SMTP service account from ethereal.email
	// Only needed if you don't have a real mail account for testing
	//let testAccount = await nodemailer.createTestAccount();

	// create reusable transporter object using the default SMTP transport
	var transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: 'Aquila.Esport1@gmail.com',
			pass: 'ProjetEgs'
		}
	});

	// send mail with defined transport object
	const mailOptions = {
		from: 'Aquila.Esport1@gmail.com', // sender address
		to: 'Aquila.Esport1@gmail.com', // list of receivers
		subject: 'Recrutement', // Subject line
		html: `<p>
		Salut l'Equipe
		<br>Une nouvelle demande de reccrutement est arrivé! 
		<br>Formulaire
		<br>Prénom:  <b>
		<br>Nom:
		<br>Pseudo: <b>` + data.c_pseudo + `</b>
		<br>Adresse mail: <b>` + data.c_email + `</b> 
		<br><b>téléphone: <b>` + data.c_phone + `</b> 
		<br>Date de naissance: <b>` + data.c_ddn + `</b>
		<br>Message: <b>` + data.c_message + `</b>
   </p>`// plain text body
	};

	transporter.sendMail(mailOptions, function (err, info) {
		if (err)
			console.log(err)
		else
			console.log(info);
	});
}


app.listen(port);