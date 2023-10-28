// import express from 'express';
// import { User } from '../models/userModel.js';
// import bodyParser from 'body-parser';
// import passport from 'passport';
// import LocalStrategy from 'passport-local'; // Add this import
// const router = express.Router();


// router.use(bodyParser.urlencoded({ extended: true }));
// router.use(bodyParser.json());

// // Passport Configuration
// passport.use(
//   new LocalStrategy(
//     { usernameField: 'email', passwordField: 'password' },
//     (email, password, done) => {
//       User.findOne({ email }, (err, user) => {
//         if (err) return done(err);
//         if (!user) return done(null, false, { message: 'Incorrect email.' });
//         if (user.password !== password) return done(null, false, { message: 'Incorrect password.' });
//         return done(null, user);
//       });
//     }
//   )
// );

// router.use(passport.initialize());



// // Route for Register a new User
// router.post('/register', async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const newUser = new User({ email, password });

//     newUser.save()
//     .then(() => {
//       res.json({ message: 'Registration successful.' });
//     })
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).send({ message: error.message });
//   }
// });

// // Route for User Login
// router.post('/logged', passport.authenticate('local'), (req, res) => {
//   res.json({ message: 'Login successful.' });
// });

// export default router;


import express from 'express';
import { User } from '../models/userModel.js';
import bodyParser from 'body-parser';
import passport from 'passport';

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// Route for Register a new User
router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    const newUser = new User({ email, password });

    newUser.save().then(() => {
      res.json({ message: 'Registration successful.' });
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route for User Login (without authentication)
router.post('/logged', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      console.log(user);
      res.json({ message: 'User found.', user });
    } else {
      res.json({ message: 'User not found.' });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

export default router;
