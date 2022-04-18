const mongoose=require("mongoose");

const CommentSch= new mongoose.Schema({
    message:{
        type:String,
        required:[true,"Please type something"],
        maxlength:[60, "Comment too long"]
    },
    createdBy:{
        type:String,
        required:[true,"What are you doing"]
    },
    username:{
        type:String
    },
    video:{
        type:String
    }

},{timestamps:true})

const Comment= mongoose.model("Comment",CommentSch);
module.exports=Comment;