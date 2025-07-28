import express from 'express';
import { addTodo,getTodos,updateTodo,deleteTodo,getTodoById } from '../controllers/todoController.js';
import { authenticateToken } from '../middlewares/auth.js';

const router = express.Router();

router.post('/', authenticateToken, addTodo);
router.get('/', authenticateToken, getTodos);
router.put('/:id',authenticateToken,updateTodo);
router.delete('/:id',authenticateToken,deleteTodo);
router.get('/edittodo/:id', authenticateToken, getTodoById);
export default router;
