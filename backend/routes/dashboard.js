import express from "express"
import isAdmin from "../middleware/isAdmin.js"
import { deleteuser, getAllData, getUsers } from "../controllers/dashboard.js"
const router = express.Router()

router.get('/',isAdmin,getAllData)
router.get('/users',isAdmin,getUsers)
router.delete('/deleteUser/:id',isAdmin,deleteuser)


export default router