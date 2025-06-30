import User from "../models/user.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

const register = async (req, res) => {
    try {

        const { fullname, email, password } = req.body

        const exituser = await User.findOne({ email })
        if (exituser) {
            return res.status(400).json({ success: false, message: "user already exist" })
        }

        const imagePath = req.file.filename

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        const newUser = new User({
            fullname,
            email,
            password: hash,
            profile: imagePath,
        })

        await newUser.save()

         const token = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY, { expiresIn: '7d' })

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        return res.status(200).json({ success: true, message: "user register successfully",  user:{fullname : newUser.fullname ,email:newUser.email , roll:newUser.roll , profile : newUser.profile , _id:newUser._id }}) 


    } catch (error) {
        console.log("error in register",error)
        return res.status(500).json({ success: false, message: "Internal Server Error" })

    }
}

const login = async (req, res) => {

    try {

        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "All Field are Required" })
        }

        const findUser = await User.findOne({ email })

        if (!findUser) {
            return res.status(400).json({ success: false, message: "User Not Found" })
        }

        const comparePwd = await bcrypt.compare(password, findUser.password)

        if (!comparePwd) {
            return res.status(400).json({ success: false, message: "Invalid Password" })
        }

       const token = jwt.sign({ id: findUser._id }, process.env.SECRET_KEY, { expiresIn: '7d' })

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        return res.status(200).json({ success: true, message: "user login successfully",  user:{_id:findUser._id , fullname : findUser.fullname ,email:findUser.email, roll:findUser.roll , profile : findUser.profile}})



    } catch (error) {
        console.log("error in Login",error)
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

const logout = async(req,res)=>{
    try {
        
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? 'none' : 'strict',
            
        })
        return res.status(200).json({ success: true, message: "Logout Successfully" })

    } catch (error) {
        console.log("error in Logout",error)
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

 const isAuth = async (req, res) => {

    try {
        const userId = req.userId
        const user = await User.findById(userId).select("-password")
        if (!user) {
            return res.status(400).json({ success: false, message: " Unauthorized : User not found" })
        }

        return res.status(200).json({ success: true, message: " Valid User ", user })


    } catch (error) {
        console.log("Error in isAuth(Controller)  -> ", error.message)
        return res.status(500).json({ success: false, message: " Internal Server Error " })
    }
}

export { register, login , logout , isAuth}