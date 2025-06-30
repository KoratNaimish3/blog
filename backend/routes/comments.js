import express from 'express'
import { addComments } from '../controllers/comments.js';
import isLogin from '../middleware/authUser.js';
const router = express.Router();


router.post('/addComments',isLogin,addComments)

export default router