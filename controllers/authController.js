const User = require('../models/User');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');


exports.signup = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate key error handling
      return res.status(400).json({ error: 'Email already exists' });
    }
    console.error('Error in signup:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'user not exist please go and register' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Incorrect password' });
    }

    
    res.status(200).json({ message: 'User signed in successfully' });
  } catch (error) {
    console.error('Error in signin:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
