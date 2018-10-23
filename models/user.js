const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  }
}, {
  timestamps: true
});

userSchema.pre('save', function(next) {
  const saltRounds = 10;
  bcrypt
    .hash(this.password, saltRounds)
    .then((hash) => {
      this.password = hash;
      next();
    })
    .catch((err) => {
      console.log('Error password: ', err.message);
    });
})

module.exports = mongoose.model('User', userSchema);