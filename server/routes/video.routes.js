const VideoCon= require("../controllers/video.controller");

module.exports= (app)=>{
    app.post("/api/videos", VideoCon.createVideo);
    app.post("/api/videos/:id", VideoCon.updateVid);
    app.get("/api/videos", VideoCon.findAllVideos);
    app.get("/api/videos/:id", VideoCon.findOneVid);
    app.delete("/api/videos/:id", VideoCon.deleteVid);
    app.put("/api/videos/:id", VideoCon.updateVid);

}