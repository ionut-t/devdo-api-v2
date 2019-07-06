const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'A task must have a title'],
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        enum: ['todo', 'doing', 'done'],
        default: 'todo'
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
