const VideoCon= require("../controllers/video.controller");
const {authenticate}=require("../config/jwt.config");


module.exports= (app)=>{
    app.post("/api/videos", authenticate, VideoCon.createVideo);
    app.post("/api/videos/:id",authenticate, VideoCon.updateVid);
    app.get("/api/videos",authenticate, VideoCon.findAllVideos);
    app.get("/api/videos/comedian/:item",authenticate, VideoCon.findAllVideosByComedian);
    app.get("/api/videos/title/:item",authenticate, VideoCon.findAllVideosByTitle);
    app.get("/api/videos/tag/:item", authenticate,VideoCon.findAllVideosByTags);
    app.get("/api/videos/:id", authenticate,VideoCon.findOneVid);
    app.delete("/api/videos/:id",authenticate, VideoCon.deleteVid);
    app.put("/api/videos/:id", authenticate,VideoCon.updateVid);

}