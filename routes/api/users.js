const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');

const User = require('../../models/User');

/**
 * @route GET api/users/test
 * @desc Tests users route
 * @access Public
*/
router.get('/test', (req, res) => res.json({ msg: 'Users works' }));

/**
 * @route GET api/users/register
 * @desc Register user
 * @access Public
*/
router.post('/register', (req, res) => {
  User
    .findOne({ email: req.body.email })
    .then(user => {
      if (user) return res.status(400).json({ email: 'Email already exists'});
      else {
        const avatar = gravatar.url(req.body.email, {
          s: '200', // Size
          r: 'pg', // Rating
          d: 'mm' // Default
        });

        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          avatar: avatar
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          });
        });
      }
    })
    .catch();
});

/**
 * @route GET api/users/login
 * @desc Login user ? Returing jwt Token
 * @access Public
*/
router.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User
    .findOne({ email })
    .then(user => {
      if (!user) return res.status(404).json({ email: 'User not found' })

      bcrypt
        .compare(password, user.password)
        .then(isMatched => {
          if (isMatched) return res.status(200).json({ msg: 'Success' });
          else return res.status(400).json({ password: 'Password incorrect' });
        });
    })
    .catch(err => console.log(err));
});

module.exports = router;