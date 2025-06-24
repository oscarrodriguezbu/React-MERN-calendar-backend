const { Schema, model } = require("mongoose");

const EventoSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
  },
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
  },
  user: { //el usuario viene en el token
    type: Schema.Types.ObjectId, //es para hacer una referencia al schema del usuario
    ref: "Usuario",
    required: true,
  },
});

EventoSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject(); //quita los __v _id a la hora de verlo pero no en la bd
  object.id = _id; //se agrega el campo id con otro nombre
  return object;
});

module.exports = model("Evento", EventoSchema);
