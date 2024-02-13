const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const validStatusValues = ['progress', 'pending', 'completed'];

const todoSchema = new Schema({ 
  task: { 
    type: String,
    required: true
  }, 
  status: { 
    type: String,
    default: 'progress',
    validate: {
      validator: function(value) {
        return validStatusValues.includes(value);
      },
      message: 'Invalid status. Status must be one of: progress, pending, completed'
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
 });

module.exports = mongoose.model('Todo', todoSchema);

