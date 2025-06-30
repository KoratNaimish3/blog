import express from "express" 
import getSinglePost from "../controllers/public.js"
const router = express.Router()

router.get('/SinglePost/:id',getSinglePost)

export default router