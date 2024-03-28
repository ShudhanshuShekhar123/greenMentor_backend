const express = require('express');
const router = express.Router();
const Task = require('../Modals/Taskmodal');


router.post('/create', async (req, res) => {
  try {
    const { title, description, createdBy } = req.body;
    const task = new Task({ title, description, createdBy });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


router.get('/read', async (req, res) => {
  try {
    const tasks = await  Task.find().populate('createdBy');
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// router.get('/tasks/:id', async (req, res) => {
//   try {
//     const task = await Task.findById(req.params.id);
//     if (!task) {
//       return res.status(404).json({ message: 'Task not found' });
//     }
//     res.json(task);
//   } catch (error) {
//     console.error('Error fetching task:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });


router.put('/update/:id', async (req, res) => {
  try {
    const { title, description } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, { title, description }, { new: true });
    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(updatedTask);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


router.delete('/delete/:id', async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
