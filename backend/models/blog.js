import mongoose from "mongoose";

const postSchema = new mongoose.Schema({

    title:{
        type:String,
    },

    description:{
        type:String,
    },

    image:{
        type:String,
    },

    comments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Commemts',
    }]

},{timestamps:true})

const postModel = mongoose.model("posts",postSchema)

export default postModel;