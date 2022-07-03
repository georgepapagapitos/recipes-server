import User from '../models/User.js';
import CryptoJS from 'crypto-js';
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  const newUser = new User({
    username,
    email,
    password: CryptoJS.AES.encrypt(password, process.env.SECRET_KEY).toString()
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
}

export const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(401).json('Wrong credentials.');

    const passwordHash = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
    const initialPassword = passwordHash.toString(CryptoJS.enc.Utf8);
    initialPassword !== req.body.password && res.status(401).json('Wrong credentials.');

    const token = jwt.sign({
      id: user._id,
      isAdmin: user.isAdmin
    }, process.env.JWT_SECRET, { expiresIn: '3d' });

    const { password, ...userDetails } = user._doc;

    res.status(200).json({ ...userDetails, token });
  } catch (err) {
    res.status(500).json(err);
  }
}