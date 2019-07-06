const express = require('express');
const taskController = require('../controllers/taskController');

const router = express.Router();

// api/v2/tasks
router
    .route('/')
    .get(taskController.getTasks)
    .post(taskController.createTask);

// api/v2/tasks/:id
router
    .route('/:id')
    .get(taskController.getTask)
    .patch(taskController.updateTask)
    .delete(taskController.deleteTask);

module.exports = router;
