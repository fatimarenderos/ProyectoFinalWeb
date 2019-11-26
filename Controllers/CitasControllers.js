const User = require("../models/Citas"); //verificar que lo que este en <="" se igual a las carpetas creadas

var debug = require("debug")("Controller:a");

// Search a one user y database
const getOne = (req, res, next) => {
//   debug("Search User", req.params);
  User.findOne(
    {
      numCita: req.params.numCita
    },
    
  )
    .then(foundUser => {
      if (foundUser) return res.status(200).json(foundUser);
      else return res.status(404).json({ message: "No se ha encontrado la cita" });
    })
    .catch(err => {
      //   return res.status(500).json({ message: "Ha ocurrido un error" });
      next(err);
    });
};

const getAll = (req, res, next) => {
  var perPage = Number(req.query.size) || 10,
    page = req.query.page > 0 ? req.query.page : 0;

  var sortProperty = req.query.sortby || "createdAt",
    sort = req.query.sort || "desc";

  //   debug("Usert List", { size: perPage, page, sortby: sortProperty, sort });

  User.find({}, "-password -login_count")
    .limit(perPage)
    .skip(perPage * page)
    .sort({ [sortProperty]: sort })
    .then(users => {
      return res.status(200).json(users);
    })
    .catch(err => {
      next(err);
    });
};


//--------------------Insert paciente------------------------------//
const insert = (req, res, next) => {
//   debug("New User", {
//     body: req.body
//   });
  //Buscar usuario en la base para validar si existe o no
  User.findOne(
    {
      numCita: req.body.numCita
    },
  
  )
    .then(userFound => {
      if (userFound) {
        // a("Usuario duplicado");
        return res.json({ error: "Cita ya existe" });
        // throw new Error(`Usuario duplicado ${req.body.username}`);
      } else {
        let newUser = new User({
          numCita: req.body.numCita,
          username: req.body.username,
          first_name: req.body.firts_name || "",
          last_name: req.body.last_name || "",
          doctorFullname: req.body.doctorFullname,
          fecha: req.body.fecha,
          respuesta: false,
        });
        return newUser.save();
      }
    })

    .then(user => {
      return res
        .header("Location", "/cita/" + user._id)
        .status(201)
        .json({
          numCita: user.numCita
        });
    })
    .catch(err => {
      //   return res
      //     .status(400)
      //     .json({ error: "Ha ocurrido un error al insertar" });
      next(err);
    });
};



//----------------Aprobacion/ rechado doc ----------------------------//
const update = (req, res, next) => {
  console.log(req);

  let update = {
    ...req.body
  };

  User.findOneAndUpdate(
    {
      numCita: req.params.numCita
    },
    update,
    {
      new: true
    }
  )
    .then(updated => {
      if (updated) return res.status(200).json(updated);
      else return res.status(400).json({message:"ha ocurrido un error, al actualizar"});
    })
    .catch(err => {
      next(err);
    });
};


const deleteOne = (req, res, next) => {
    User.findOneAndDelete({ numCita: req.params.numCita })
      .then(data => {
        if (data) res.status(200).json(data);
        else res.status(404).send();
      })
      .catch(err => {
        next(err);
      });
  };
  
module.exports = {
  insert, // cliente
  getOne, //
  getAll, 
  update, //Update es si el doctor lo aprueba o rechaza, solo modificar el boolean,
  deleteOne

};