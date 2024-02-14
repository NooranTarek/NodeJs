/* eslint-disable consistent-return */
/* eslint-disable eqeqeq */
/* eslint-disable prefer-const */
/* eslint-disable radix */
// eslint-disable-next-line import/extensions
const todosModel = require('../../../database/models/todosModel');
const userModel = require('../../../database/models/usersModel');

// eslint-disable-next-line consistent-return
const addTodo = async (req, res) => {
  try {
    // const { id } = req.params;
    const { title, tags } = req.body;
    const user = await userModel.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'user not exist' });
    }
    const newTodo = await todosModel.create({
      userId: req.userId,
      title,
      tags,
    });
    res.status(201).json({ message: 'todo created successfully', todo: newTodo });
  } catch (error) {
    res.status(500).json({ message: 'server error' });
  }
};

const updateTodo = async (req, res) => {
  try {
    const { title, status, _id } = req.body;
    const isExist = await todosModel.findById(_id);
    // console.log(isExist);
    if (req.userId == isExist.userId) {
      const todos = await todosModel.updateOne(_id, { title, status });
      res.status(200).json({ message: 'todo edited successfully', todos });
    } else {
      res.status(401).json({ message: 'user can not be updated' });
    }
  } catch (error) {
    res.status(500).json({ message: 'server error' });
  }
};

const todoDelete = async (req, res) => {
  try {
    const { id } = req.params;
    const isExist = await todosModel.findById(id);
    if (req.userId == isExist.userId) {
      const todo = await todosModel.findByIdAndDelete(id);
      res.status(200).json({ message: 'todo deleted successfully', todo });
    } else {
      res.status(401).json({ message: 'user can not be deleted' });
    }
  } catch (error) {
    res.status(500).json({ message: 'server error' });
  }
};

const todoGet = async (req, res) => {
  try {
    const todos = await todosModel.find();
    const userTodos = todos.filter(todo => todo.userId == req.userId);
    if (userTodos.length) {
      res.status(200).json({ message: 'Todos retrieved successfully', todos: userTodos });
    } else {
      res.status(401).json({ message: 'No todos found for this user' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getAllTodos = async (req, res) => {
  try {
    // const { userId } = req.params;
    const userTodos = await todosModel.find();
    res.status(200).json({ message: 'todos retrieved successfully', todos: userTodos });
  } catch (error) {
    res.status(500).json({ message: 'server error' });
  }
};

const todoFilter = async (req, res) => {
  try {
    let { limit = 0, skip = 0, status } = req.query;
    limit = parseInt(limit);
    skip = parseInt(skip);
    const filter = {};
    if (status) {
      filter.status = status;
    }
    const todos = await todosModel.find(filter).limit(limit).skip(skip);
    res.status(200).json({ message: 'todos retrieved successfully', todos });
  } catch (error) {
    res.status(500).json({ message: 'server error' });
  }
};

module.exports = {
  addTodo, updateTodo, todoDelete, todoGet, todoFilter, getAllTodos,

};
