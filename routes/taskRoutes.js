const express = require('express');
const taskController = require('../controllers/taskController');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

// api/v2/tasks
router
    .route('/')
    .get(checkAuth, taskController.getTasks)
    .post(checkAuth, taskController.createTask);

// api/v2/tasks/:id
router
    .route('/:id')
    .get(checkAuth, taskController.getTask)
    .patch(checkAuth, taskController.updateTask)
    .delete(checkAuth, taskController.deleteTask);

module.exports = router;
