import React,{useState,useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { Link, useParams } from "react-router-dom";

const VideoPlayer= (props)=>{
    const [video,setVideo]=useState({});
    const [user, setUser]=useState({});
    const {id}=useParams();

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/videos/${id}`,{withCredentials:true}).then((res)=>{
            console.log(res.data);
            setVideo(res.data);
            axios.get(`http://localhost:8000/api/users/${res.data.createdBy}`,{withCredentials:true}).then((res)=>{
                console.log(res.data);
                setUser(res.data);
            }).catch((err)=>{console.log(err)})
        }).catch((err)=>{
            console.log(err);
        })

        

        
    },[])

    return(
        <div>
            <h1>{video.title}</h1>
            <iframe width="1280" height="628" src={`https://www.youtube.com/embed/${video.videoURL}?rel=0`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            <p>Comedian:{video.comedian}</p><br></br>
            <p>Uploaded by: {user.username}</p>

        </div>
    )
}
export default VideoPlayer;