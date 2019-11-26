const User = require("../models/Doctores"); //verificar que lo que este en <="" se igual a las carpetas creadas

var debug = require("debug")("Controller:a");

// Search a one user y database
const getOne = (req, res, next) => {
//   debug("Search User", req.params);
  User.findOne(
    {
      usernameDoc: req.params.usernameDoc
    },
    "-password -login_count" //aqui pone "- algo, es porque no queremos mostrar un parametro, en este caso la contra"
  )
    .then(foundUser => {
      if (foundUser) return res.status(200).json(foundUser);
      else return res.status(404).json({ message: "Ha ocurrido un error al querer ingresar, pruebe de nuevo" });
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

const insert = (req, res, next) => {
//   debug("New User", {
//     body: req.body
//   });
  //Buscar usuario en la base para validar si existe o no
  User.findOne(
    {
      usernameDoc: req.body.usernameDoc
    },
    "-password, -login_count"
  )
    .then(userFound => {
      if (userFound) {
        // a("Usuario duplicado");
        return res.json({ error: "Usuario ya existe" });
        // throw new Error(`Usuario duplicado ${req.body.username}`);
      } else {
        let newUser = new User({
          usernameDoc: req.body.usernameDoc,
          first_name: req.body.first_name || "",
          last_name: req.body.last_name || "",
          email: req.body.email,
          password: req.body.password ,/*TODO: Modificar, hacer hash del password*/
          passwordRegistrarse: req.body.passwordRegistrarse
        });
        return newUser.save();
      }
    })

    .then(user => {
      return res
        .header("Location", "/doctor/" + user._id)
        .status(201)
        .json({
          usernameDoc: user.usernameDoc
        });
    })
    .catch(err => {
      //   return res
      //     .status(400)
      //     .json({ error: "Ha ocurrido un error al insertar" });
      next(err);
    });
};

const update = (req, res, next) => {
  console.log(req);

  let update = {
    ...req.body
  };

  User.findOneAndUpdate(
    {
      usernameDoc: req.params.usernameDoc
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
  User.findOneAndDelete({ usernameDoc: req.params.usernameDoc })
    .then(data => {
      if (data) res.status(200).json(data);
      else res.status(404).send();
    })
    .catch(err => {
      next(err);
    });
};


module.exports = {
  insert, //registrase
  getOne, //ingresar
  getAll, 
  update,
  deleteOne
};