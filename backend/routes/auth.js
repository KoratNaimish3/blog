import express from "express";
import upload from "../middleware/multer.js";
import { register, login, logout, isAuth } from "../controllers/Auth.js";
import authUser from "../middleware/authUser.js";

const router = express.Router();

router.post('/register', upload.single('profile'), register)
router.post('/login', login)
router.post('/logout' , logout)
router.get('/is-auth', authUser , isAuth)    


export default router