import postModel from "../models/blog.js"
import commentModel from "../models/comments.js"
import User from "../models/user.js"
import fs from "fs"
import path from "path"


const getAllData = async (req, res) => {

    try {
        const users = await User.find()
        const posts = await postModel.find()
        const comments = await commentModel.find()

        if (!users ) {
            return res.status(400).json({ success: false, message: "users Not available" })
        }

        if (!posts ) {
            return res.status(400).json({ success: false, message: "posts Not available" })
        }

        if (!comments ) {
            return res.status(400).json({ success: false, message: "comments Not available" })
        }

        return res.status(200).json({ success: true, users, posts,comments })


    } catch (error) {
        console.log("error in dashboard(getAllData)", error)
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

const getUsers = async (req, res) => {
    try {

        const users = await User.find({})

        if (!users) {
            return res.status(400).json({ success: false, message: "users Not Found" })
        }

        return res.status(200).json({ success: true, users })


    } catch (error) {
        console.log("error in dashboard(getUsers)", error)
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

const deleteuser = async (req, res) => {

    try {
        const userId = req.params.id
        const existUser = await User.findById(userId)

        if (!existUser) {
            return res.status(400).json({ success: false, message: "user Not Found" })
        }

        if (existUser.roll == 'admin') {
            return res.status(400).json({ success: false, message: "Sorry Your Admin You Can't delete your Account" })
        }

        if (existUser.profile) {
            const profilePath = path.join('public/images', existUser.profile)
            fs.promises.unlink(profilePath)
                .then(() => console.log("post image deleted"))
                .catch(error => console.log("error deleting post image", error))
        }

        await commentModel.deleteMany({ userId: existUser._id });


        const deleteUser = await User.findByIdAndDelete(userId)
        return res.status(200).json({ success: true, message: "User Deleted Successfully" })

    } catch (error) {
        console.log("error in dashboard(getUsers)", error)
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

export { getAllData, getUsers, deleteuser }