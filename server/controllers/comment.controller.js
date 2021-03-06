const Comment=require("../models/comments.model");

module.exports={
    findAllComments:(req,res)=>{
        Comment.find({video: req.params.vid}).sort({createdAt:-1})
        .then((allComments)=>{
            console.log(allComments);
            res.json(allComments);
        }).catch((err)=>{res.json({message:"errors in findAllCommentd",errors:err})})
    },
    createComment:(req,res)=>{
        Comment.create(req.body).then((newComment)=>{
            console.log(newComment);
            res.json(newComment);
        }).catch((err)=>{
            console.log(err)
            res.status(400).json(err)
        })

        },
        deleteComment:(req,res)=>{
            Comment.deleteOne({_id: req.params.id}).then((deleted)=>{
                console.log(deleted);
                res.json(deleted);
            }).catch((err)=>{res.json({message:"error in deleteOne",error:err})})
        }
    }
