const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'A task must have a title'],
        trim: true,
        minlength: [3, 'Title must have minimum 3 characters']
    },
    description: {
        type: String,
        trim: true,
        required: [true, 'Description is required'],
        minlength: [5, 'Title must have minimum 5 characters']
    },
    status: {
        type: String,
        enum: ['todo', 'doing', 'done'],
        default: 'todo'
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

// Populate tasks with creator's information
taskSchema.pre(/^find/, function(next) {
    this.populate('creator');
    next();
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
