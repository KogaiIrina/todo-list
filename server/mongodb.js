const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/todo-list', { useNewUrlParser: true });

const todoSchema = new mongoose.Schema({
  checked: Boolean,
  summary: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});


const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
