import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/todo-list', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

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

export const Todo = mongoose.model('Todo', todoSchema);

const userSchema = new mongoose.Schema({
  nickname: {
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

userSchema.index({ nickname: 1 }, { unique: true });

export const User = mongoose.model('User', userSchema);
