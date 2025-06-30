import express from "express"
import { createBlog, deletePost, getPost, updatePost } from "../controllers/blog.js"
import upload from "../middleware/multer.js";
import isAdmin from "../middleware/isAdmin.js"
const router = express()

router.post('/create',isAdmin ,upload.single('image'), createBlog)
router.patch('/update/:id',isAdmin , upload.single('image'),updatePost)
router.delete('/delete/:id',isAdmin , deletePost)
router.get('/getPosts',getPost)

export default router   