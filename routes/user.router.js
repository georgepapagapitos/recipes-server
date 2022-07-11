import express from 'express';
import { deleteUser, getAllUsers, getUser, getUserStats, updateUser } from '../controllers/user.controller';
import { verifyAdmin, verifyAuth } from '../utils/auth';

const router = express.Router();

router.get('/', verifyAdmin, getAllUsers);
router.get('/:id', verifyAdmin, getUser);
router.put('/:id', verifyAuth, updateUser);
router.delete('/:id', verifyAuth, deleteUser);
router.get('/stats', verifyAdmin, getUserStats);
