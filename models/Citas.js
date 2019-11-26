const mongoose = require("mongoose"),
  Schema = mongoose.Schema;
var CitaSchema = Schema(
  {
      numCita:{
       type: String,
       required: true,
       unique: true

      },

    username: {
      type: String,
      required: true,
    },
    first_name: String,
    last_name: String,
    //En este caso  se desplegara una barra de opciones para que 
    //estos los elijan por nombre y apellido

    doctorFullname: {
      type: String,
      required: true
    },
    
    //Desplegar barra de opciones para que seleccione la fecha
    fecha: {
      type: String,
      required: true
    },

    Respuesta:{
        type: Boolean,
    }

//     login_count: Number
//   },
//   {
//     timestamps: true
//   
}
);

//Funcion que ingresa automaticamente el #de cita

// function getNextSequenceValue(sequenceName){

//     var sequenceDocument = db.counters.findAndModify({
//        query:{_id: sequenceName },
//        update: {$inc:{sequence_value:1}},
//        new:true
//     });
     
//     return sequenceDocument.sequence_value;
//  }

module.exports = mongoose.model("Citas", CitaSchema);