const mongoose = require('mongoose');
// const ObjectId = require('mongodb').ObjectId;

mongoose.connect('mongodb://localhost:27017/todo-list', { useNewUrlParser: true });

const todoSchema = new mongoose.Schema({
  checked: Boolean,
  summary: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

todoSchema.index({ user: 1 });

const Todo = mongoose.model('Todo', todoSchema);

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

userSchema.index({ email: 1 }, { unique: true });

const User = mongoose.model('User', userSchema);

exports.Todo = Todo;
exports.User = User;