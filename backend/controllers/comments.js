import postModel from "../models/blog.js"
import commentModel from "../models/comments.js"

const addComments = async(req,res)=>{

    try {

        const{postId,userId,comment}=req.body
        const newComment = new commentModel({
            postId,
            userId,
            comment,
        })

        await newComment.save()

        const existPost = await postModel.findById(postId)
        if(!existPost)
        {
            return res.status(400).json({ success: false, message: "Blog Post Not Found" })
        }

        existPost.comments.push(newComment._id)
        await existPost.save()

        return res.status(200).json({ success: true, message: "comment added Successfully", comment:newComment})


    } catch (error) {
        console.log("error in addComment",error)
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

export {addComments}