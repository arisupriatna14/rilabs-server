const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

module.exports = {
  register: (req, res) => {
    const { username, email, password  } = req.body

    User
      .create({ username, email, password  })
      .then((result) => {
        res.status(201).json({
          success: true,
          data: result
        })
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          errMessage: err.message
        })
      });
  },
  login: (req, res) => {
    const { email, password } = req.body
    console.log('req.body ==>', req.body);
    User
      .findOne({ email: email })
      .then((result) => {
        let passwordFromDB = result.password
        bcrypt
          .compare(password, passwordFromDB)
          .then((isPassword) => {
            if (isPassword) {
              const token = jwt.sign({
                username: result.username,
                id: result._id,
                email: result.email
              }, process.env.JWT_SECRET_KEY);
              console.log('Berhasil login', result)
              res.status(200).json({
                success: true,
                token: token
              })
            } else {
              console.log('Password wrong')
            }
          })
          .catch((err) => {
            console.log(err.message)
          })
        .catch((err) => {

        })
        console.log(result)
      })
      .catch((err) => {
        console.log(err)
      })
  }
}
