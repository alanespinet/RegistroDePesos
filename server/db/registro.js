const mongoose = require('mongoose');

var Registro = mongoose.model('Registro', {
  nombre: {
    type: String,
    required: true
  },
  fecha: {
    type: String,
    required: true
  },
  peso: {
    type: Number,
    required: true
  }
});

module.exports = Registro;
