const mongoose= require("mongoose");

const VideoSch= new mongoose.Schema({
    title:{
        type:String,
        required: [true,"Please enter title"]
    } ,
    description:{
        type: String
    },
    createdBy:{
        type:String

    },
    comedian:{
        type:String
    },
    videoURL:{
        type:String,
        minlength:[10,"Please enter proper video url"]
    }

},{timestamps:true})

const Video= mongoose.model("Video",VideoSch);
module.exports=Video;