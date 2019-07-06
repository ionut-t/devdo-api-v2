const Task = require('../models/taskModel');

// Create task
exports.createTask = async (req, res, next) => {
    try {
        const task = await Task.create(req.body);

        res.status(201).json({
            status: 'success',
            data: { task }
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
};

// Get all tasks from database
exports.getTasks = async (req, res, next) => {
    try {
        const tasks = await Task.find();

        res.status(200).json({
            status: 'success',
            results: tasks.length,
            data: { tasks }
        });
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error.message
        });
    }
};

// Get a single task from database
exports.getTask = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({
                status: 'fail',
                message: 'No task found'
            });
        }

        res.status(200).json({
            status: 'success',
            data: { task }
        });
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error.message
        });
    }
};

// Update task from database
exports.updateTask = async (req, res, next) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!task) {
            return res.status(404).json({
                status: 'fail',
                message: 'No task found'
            });
        }

        res.status(200).json({
            status: 'success',
            data: { updatedTask: task }
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
};

// Delete task from database
exports.deleteTask = async (req, res, next) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);

        if (!task) {
            return res.status(404).json({
                status: 'fail',
                message: 'No task found'
            });
        }

        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
};
