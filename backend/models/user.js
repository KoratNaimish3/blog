import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname:{
        type:String,
        require:true
    },

    email:{
        type:String,
        require:true,
        unique:true,
    },

    profile:{
        type:String,
        require:true

    },

    password:{
        type:String,
        require:true

    },

    roll:{
        type:String,
        enum : ['admin' , 'user'],
        default:'user',
    }

},{timestamps:true})

const User = mongoose.model("Users",userSchema)

export default User
