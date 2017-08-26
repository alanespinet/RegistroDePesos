// 3rd party modules
const express = require("express");
const bodyParser = require('body-parser');
const _ = require('lodash');
const cors = require('cors');

// Own modules
const mongoose = require('./db/mongoose');
var Registro = require('./db/registro');

// Initial variables
const app = express();
var port = process.env.PORT || 3000;


// MIDDLEWARES
app.use(bodyParser.json());
app.use(cors());


// ROUTES
app.post('/registros', (req, res) => {

  var registroFiltered = _.pick(req.body, ['nombre', 'fecha', 'peso']);
  var registro = new Registro(registroFiltered);

  registro.save().then( (reg) => {
    res.send(reg);
  }).catch( (e) => {
    res.status(400).send(e);
  });

});


app.get('/registros', (req, res) => {

  Registro.find().then( (regs) => {
    res.send(regs);
  }).catch( (e) => {
    res.status(400).send(e);
  });

});


app.get('/registros/:nombre', (req, res) => {

  Registro.find({ nombre: req.params.nombre }).then( (regs) => {
    res.send(regs);
  }).catch( (e) => {
    res.status(400).send(e);
  });

});


app.delete('/registros/:id', (req, res) => {

  Registro.findByIdAndRemove(req.params.id).then( (reg) => {
    res.send(reg);
  }).catch( (e) => {
    res.status(400).send(e);
  });

});


app.listen(port, () => { console.log(`server running at port ${port}`); });
