const express = require('express');

const router = express.Router();

const Todo = require('../../models/todo');

// get  task
router.get('/', async (req, res) => {
	try {
		const todos = await Todo.find({});
		res.send(todos);
	} catch (error) {
		res.status(500).send(error);
	}
});

// add task
router.post('/', async (req, res) => {
	const { task, status } = req.body;
	try {
		const newTask = new Todo({ task, status });
		await newTask.save();
		res.send(newTask);
	} catch (error) {
		res.status(500).send(error);
	}
});

// update task
router.patch('/:id', async (req, res) => {
	const { task, status } = req.body;
	const { id } = req.params;
	try {
		const updateTask = await Todo.findByIdAndUpdate(id, { task, status});
		res.send(updateTask);
	} catch (error) {
		res.status(500).send(error);
	}
});

// delete task
router.delete('/:id', async (req, res) => {
	const { id } = req.params;
	try {
		const newTask = await Todo.findByIdAndDelete(id);
		res.send(newTask);
	} catch (error) {
		res.status(500).send(error);
	}
});

module.exports = router;
