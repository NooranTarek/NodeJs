const express = require('express');
const todoController = require('./todoController');
const { isAuth } = require('../../../middleware/authentication');

const todoRouter = express.Router();

todoRouter.post('/', isAuth, todoController.addTodo);
todoRouter.patch('/', isAuth, todoController.updateTodo);
todoRouter.delete('/:id', isAuth, todoController.todoDelete);
todoRouter.get('/todosForLoggedInUser', isAuth, todoController.todoGet);
todoRouter.get('/', isAuth, todoController.getAllTodos);
todoRouter.get('/todoFilter', todoController.todoFilter);

module.exports = todoRouter;
