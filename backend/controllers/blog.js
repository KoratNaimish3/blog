import postModel from "../models/blog.js"
import fs from "fs"
import path from "path"
import commentModel from "../models/comments.js"

const createBlog = async (req, res) => {

    try {

        const { title, description } = req.body
        const imagePath = req.file.filename

        const createBlog = new postModel({
            title,
            description,
            image:imagePath
        })

        await createBlog.save()
        return res.status(200).json({ success: true, message: "Post Created successfully", post: createBlog })



    } catch (error) {
        console.log("error in createBlog", error)
        return res.status(500).json({ success: false, message: "Internal Server Error" })

    }
}

const deletePost = async (req, res) => {
 
    try {
        const postId = req.params.id

        const findPost = await postModel.findById(postId)
        if (!findPost) {
            return res.status(400).json({ success: false, message: "Post not found" })
        }

        //image delete(public/images ->[mathi])
        if(findPost.image)
        {
            const profilePath = path.join('public/images',findPost.image)
            fs.promises.unlink(profilePath)
            .then(()=>console.log("post image deleted"))
            .catch(error=>console.log("error deleting post image",error))
        }

          if (findPost.comments && findPost.comments.length > 0) {
            await commentModel.deleteMany({ _id: { $in: findPost.comments } });
            console.log("Associated comments deleted");
        }

        const deletePost = await postModel.findByIdAndDelete(postId)
        return res.status(200).json({ success: true, message: "Post Deleted successfully", post: deletePost })


    } catch (error) {
        console.log("error in DeletePost", error)
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

const updatePost = async (req, res) => {
    try {
        const { title, description } = req.body
        const postId = req.params.id

        const postUpdate = await postModel.findById(postId)
        if (!postUpdate) {
            return res.status(400).json({ success: false, message: "Post not found" })
        }

        if (title) {
            postUpdate.title = title
        }

        if (description) {
            postUpdate.description = description
        }

        if (req.file) {
            postUpdate.image = req.file.filename
        }
        await postUpdate.save()
        return res.status(200).json({ success: true, message: "Post updated successfully", post: postUpdate })

          

    } catch (error) {
        console.log("error in updatePost", error)
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

const getPost = async (req, res) => {

    try {

        const posts = await postModel.find()
        if (!posts) {
            return res.status(400).json({ success: false, message: "Post not available" })
        }

        return res.status(200).json({ success: true, posts })


    } catch (error) {
        console.log("error in getPost", error)
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

export { createBlog, deletePost, getPost, updatePost }