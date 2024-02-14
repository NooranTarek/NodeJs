/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
/* eslint-disable import/no-extraneous-dependencies */
const Jwt = require('jsonwebtoken');
const userModel = require('../../../database/models/usersModel');
const { hashFunction, compareFunction } = require('../../../utils/hashAndCompare');

const signUp = async (req, res) => {
  const {
    username, password, firstName, lastName,
  } = req.body;
  try {
    const existingUser = await userModel.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'username is already exists' });
    }
    const hash = hashFunction({ plainText: password }, 8);
    const newUser = await userModel.create({
      username,
      password: hash,
      firstName,
      lastName,
    });
    res.status(201).json({ message: 'user registered successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'error creating user' });
  }
};

const signIn = async (req, res) => {
  const { password, username } = req.body;
  try {
    const user = await userModel.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'user not found can not to sign in' });
    }
    const match = compareFunction({ plainText: password, hash: user.password });
    if (!match) {
      return res.status(401).json({ message: 'incorrect password' });
    }
    const token = Jwt.sign({ id: user._id, username: user.username }, 'nooran');
    res.status(200).json({ message: 'logged in successfully.', token });
  } catch (error) {
    res.status(500).json({ message: 'server error can not sign in.' });
  }
};

const usersFirstName = async (req, res) => {
  try {
    const users = await userModel.findById(req.userId, { _id: 0, firstName: 1 });
    res.status(200).json({ message: 'users first names retrieved successfully', users });
  } catch (error) {
    res.status(500).json({ message: 'server error' });
  }
};

const userDelete = async (req, res) => {
  try {
    const users = await userModel.findByIdAndDelete(req.userId);
    if (users) {
      res.status(200).json({ message: 'user deleted successfully', user: users });
    } else {
      res.status(404).json({ message: 'user with provided ID not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'server error' });
  }
};

const userUpdate = async (req, res) => {
  try {
    const { username } = req.body;
    const { id } = req.params;
    const isExist = await userModel.findById(id);
    console.log(req.userId);
    if (isExist.id == req.userId) {
      const users = await userModel.findByIdAndUpdate(req.userId, { username });
      res.status(200).json({ message: 'user edited successfully', user: users });
    } else {
      res.status(404).json({ message: 'user with provided ID not found' });
    }
  } catch (error) {
    res.status(500).json({ message: ' server error' });
  }
};
module.exports = {
  signUp, usersFirstName, userDelete, userUpdate, signIn,
};
