import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    postId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'posts',
        require:true,
    },

    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users',
        require:true,
    },

    comment:
    {
        type:String,
        require:true,
    },


},{timestamps:true})

const commentModel = mongoose.model('Commemts',commentSchema)
export default commentModel