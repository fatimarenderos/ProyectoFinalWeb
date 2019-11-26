const mongoose = require("mongoose"),
  Schema = mongoose.Schema;
var DoctorSchema = Schema(
  {
    usernameDoc: {
      type: String,
      required: true,
      unique: true
    },
    first_name: String,
    last_name: String,
    email: {
      type: String,
      required: true, 
      unique:true
    },
    password: {
      type: String,
      required: true
    },

    passwordRegistrarse: {
        type: String,
     // Esta contraseña sera la misma para todos los casos, solo la sabran los doctores de
     // la clinica y se ocupará unicamente al querer registarse un nuevo doc
     //   required: true
      },
    login_count: Number
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Doctores", DoctorSchema);