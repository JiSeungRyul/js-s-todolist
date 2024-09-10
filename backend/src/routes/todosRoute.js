const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');

router.get('/todos', todoController.getTodo);
router.post('/todos/addTodo', todoController.addTodo);
router.patch('/todos/:itemId/delete', todoController.delTodo);
router.patch('/todos/:itemId/complete', todoController.uptTodoDone);

module.exports = router;