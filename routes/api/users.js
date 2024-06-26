const express = require('express');

const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const { secret } = require('../../config/environment');

// Load Input Validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// Load User model
const User = require('../../models/User');

/**
 * @route GET api/users/test
 * @desc Tests users route
 * @access Public
*/
router.get('/test', (req, res) => res.json({ msg: 'Users works' }));

/**
 * @route POST api/users/register
 * @desc Register user
 * @access Public
*/
router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) return res.status(400).json(errors);

  User
    .findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        errors.email = 'Email already exists';
        return res.status(400).json(errors);
      }

      const avatar = gravatar.url(req.body.email, {
        s: '200', // Size
        r: 'pg', // Rating
        d: 'mm' // Default
      });

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        avatar
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
    })
    .catch();
});

/**
 * @route GET api/users/login
 * @desc Login user ? Returing jwt Token
 * @access Public
*/
router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // Check Validation
  if (!isValid) return res.status(400).json(errors);

  const { email } = req.body;
  const { password } = req.body;


  User
    .findOne({ email })
    .then((user) => {
      if (!user) {
        errors.email = 'User not found';
        return res.status(404).json(errors);
      }

      return bcrypt
        .compare(password, user.password)
        .then((isMatched) => {
          if (isMatched) {
            // return res.status(200).json({ msg: 'Success' });
            const payload = {
              id: user.id,
              name: user.name,
              avatar: user.avatar
            };

            return jwt.sign(payload, secret, { expiresIn: 3600 }, (err, token) => {
              return res.json({ success: true, token: `Bearer ${ token }` });
            });
          }
          else {
            errors.password = 'Password incorrect';
            return res.status(400).json(errors);
          }
        });
    })
    .catch(err => console.log(err));
});

/**
 * @route GET api/users/current
 * @desc Return current user
 * @access Private
*/
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email
  });
});

module.exports = router;
