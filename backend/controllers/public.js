import postModel from "../models/blog.js";

const  getSinglePost = async(req,res)=>{

    try {
        const postId = req.params.id;
        const findPost = await postModel.findById(postId)
        .populate({
            path:'comments',
            populate:{
                path:"userId",
                 select: 'fullname profile'

            }
        })

        if(!findPost)
        {
            return res.status(400).json({ success: false, message: "Blog Post Not Found" })
        }

        return res.status(200).json({ success: true,  post:findPost})


    } catch (error) {
        console.log("error in grtSinglePost ",error)
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

export default getSinglePost