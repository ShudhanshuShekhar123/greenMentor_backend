// Import mongoose
const mongoose = require('mongoose');

const currentDate = new Date();
const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;

// Define Task schema
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true
  },
  createdAt: {
    type: String,
    default: formattedDate
  }



  
});


const Taskmodal = mongoose.model('Task', taskSchema);

module.exports = Taskmodal;
