import express from "express"
import dotenv from "dotenv"
import DBcon from "./utlis/db.js"
import authUser from "./routes/auth.js"
import dashboardRouter from "./routes/dashboard.js"
import commentsRouter from "./routes/comments.js"
import publicRouter from "./routes/public.js"
import blogroutes from "./routes/blog.js"
import cookieParser from "cookie-parser"
import cors from 'cors'
 
dotenv.config()

const app = express()
const port = process.env.PORT || 9000

//mongodb connection
DBcon();
const alloworigin = 'https://blog-l44y.onrender.com'

app.use(express.static('public'))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
  origin: alloworigin, // your React app's URL
    credentials:true
                // ✅ VERY IMPORTANT
}));

app.get('/',(req,res)=>{
  res.send("API Work")
})

app.use('/auth',authUser)
app.use('/blogs',blogroutes)
app.use('/dashboard',dashboardRouter)
app.use('/comments',commentsRouter)
app.use('/public',publicRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
