const express = require('express');
const path = require('path');
const serveStatic = require('serve-static');
const nodemailer = require("nodemailer");

const port = process.env.PORT || 5000;

const app = express();

app.use(serveStatic(path.join(__dirname, 'assets')));

app.get('/mail', function(req, res) {
	sendMailNewAccount().catch(console.error);
});

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});


async function sendMailNewAccount() {
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
	  subject: 'Subject of your email', // Subject line
	  html: '<p>COntent Here A FAIRE LES ZOUZOUZOUZOZUOUZOUOU </p>'// plain text body
	};

  transporter.sendMail(mailOptions, function (err, info) {
   if(err)
     console.log(err)
   else
     console.log(info);
});
}


app.listen(port);