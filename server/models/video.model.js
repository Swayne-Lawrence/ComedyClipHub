const mongoose= require("mongoose");

const VideoSch= new mongoose.Schema({
    title:{
        type:String,
        required: [true,"Please enter title"],
        maxlength:[20,"title is too long"]
    } ,
    description:{
        type: String
    },
    createdBy:{
        type:String,
        required:[true,"message"]

    },
    username:{
        type:String
    },
    comedian:{
        type:String,
        required:[true,"Please enter the name of the comedian"],
        minlength:[3,"Please enter the name of the comedian"]
    },
    thumbnailURL:{
        type:String,
        minlength:[10, "please enter proper url"]
    },
    videoURL:{
        type:String,
        minlength:[10,"Please enter proper video url"]
    },
    tags:{
        type:[]
    },
    titleTag:{
        type:String
    },
    selectedTag:{
        type:String
    }

},{timestamps:true})

const Video= mongoose.model("Video",VideoSch);
module.exports=Video;