import mongoose from "mongoose";
const DBcon= async()=>{
    try {
        mongoose.connect(process.env.MONGODB_URl)
        .then(console.log("Connected To MONGODB"))
    } catch (error) {
        console.log(error)
    }
}

export default DBcon