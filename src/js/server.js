var express = require('express');
var app = express();
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey("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");

app.get('/', function (req, res) {
  const msg = {
    to: req.query.to,
    from: "alerts@conserje.cl",
    subject: 'Ha llegado un visitante',
    text: `${req.query.visita} Lo espera en recepcion`,
  };
  sgMail.send(msg);
  res.send("Mensaje enviado?");
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});