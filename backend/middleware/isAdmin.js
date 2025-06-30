import jwt from "jsonwebtoken"
import User from "../models/user.js"

const isAdmin = async (req, res, next) => {
    try {

        const { token } = req.cookies

        if (!token) {
            return res.status(400).json({ success: false, message: " Unauthorized : No Token Provided (Please Login)" })
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY)

        if (decoded.id) {
            
            const user = await User.findById(decoded.id)
            if (!user) {
                return res.status(400).json({ success: false, message: " Unauthorized : User not found" })

            }
            if (user.roll != 'admin') {
                return res.status(400).json({ success: false, message: " Unauthorized : User is not an Admin" })
            }

            next()
        }
        else {
            return res.status(400).json({ success: false, message: " Not Authorized(Invalid Token)" })
        }



    } catch (error) {
        console.log("error in isAdmin", error)
        return res.status(500).json({ success: false, message: "Internal Server Error" })


    }
}
export default isAdmin