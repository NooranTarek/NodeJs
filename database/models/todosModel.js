const { mongoose, Schema } = require('mongoose');

const todosSchema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,

  },
  title: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 20,
  },
  status: {
    type: String,
    default: 'to-do',
    enum: ['to-do', 'done', 'in-progress'],
    required: true,
  },
  tags: [{
    type: String,
    maxLength: 10,
  }],
}, { timestamps: true });
const todosModel = mongoose.model('Todo', todosSchema);
module.exports = todosModel;
