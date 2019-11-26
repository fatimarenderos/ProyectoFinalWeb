const mongoose = require("mongoose"),
  Schema = mongoose.Schema;
var PacienteSchema = Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    first_name: String,
    last_name: String,

    email: {
      type: String,
      required: true,
      unique:true,
    },
    password: {
      type: String,
      required: true
    },

    login_count: Number
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Pacientes", PacienteSchema);