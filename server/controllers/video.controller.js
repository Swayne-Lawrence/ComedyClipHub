const Video=require("../models/video.model");

module.exports={
    findAllVideos: (req,res)=>{
        Video.find().sort({createdAt:-1}).then((allVideos)=>{
            console.log(allVideos);
            res.json(allVideos);
        }).catch((err)=>{res.json({message:"error in findAAllVideos", error:err})})
        
    },
    createVideo: (req,res)=>{
        Video.create(req.body).then((newVid)=>{
            console.log(newVid);
            res.json(newVid);
        }).catch((err)=>{
            console.log(err);
            res.status(400).json(err);
        })
    },
    findOneVid: (req,res)=>{
        Video.findOne({_id: req.params.id}).then((thisVid)=>{
            console.log(thisVid);
            res.json(thisVid)
        }).catch((err)=>{
            res.json({message:"error in findOneVid",error:err})
        })
    },
    deleteVid: (req,res)=>{
        Video.deleteOne({_id: req.params.id}).then((deleted)=>{
            console.log(deleted);
            res.json(deleted);
        }).catch((err)=>{res.json({message:"error in deleteVid", error:err})})
    },

    updateVid: (req,res)=>{
        Video.findOneAndUpdate({_id: req.params.id},req.body,{new:true, runValidators:true})
        .then((updated)=>{
            console.log(updated);
            res.json(updated)
        }).catch((err)=>{
            console.log(err);
            res.status(400).json(err);
        });
    },
    findAllVideosByComedian: (req,res)=>{
        Video.find({comedian: req.params.item}).sort({createdAt:-1}).then((allVideos)=>{
            console.log(allVideos);
            res.json(allVideos);
        }).catch((err)=>{res.json({message:"error in findAAllVideos", error:err})})
        
    },
    findAllVideosByTitle: (req,res)=>{
        Video.find({titleTag: req.params.item}).sort({createdAt:-1}).then((allVideos)=>{
            console.log(allVideos);
            res.json(allVideos);
        }).catch((err)=>{res.json({message:"error in findAAllVideos", error:err})})
        
    },
    findAllVideosByTags: (req,res)=>{
        Video.find({selectedTag: req.params.item}).sort({createdAt:-1}).then((allVideos)=>{
            console.log(allVideos);
            res.json(allVideos);
        }).catch((err)=>{res.json({message:"error in findAAllVideos", error:err})})
        
    },
}