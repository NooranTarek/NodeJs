const express = require('express');

const userRouter = express.Router();
const userController = require('./userController');
const { isAuth } = require('../../../middleware/authentication');

userRouter.post('/', userController.signUp);
userRouter.get('/', isAuth, userController.usersFirstName);
userRouter.delete('/', isAuth, userController.userDelete);
userRouter.patch('/:id', isAuth, userController.userUpdate);
userRouter.post('/signIn', userController.signIn);

module.exports = userRouter;
