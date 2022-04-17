import React,{useState,useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { Link, useParams } from "react-router-dom"
import Header from "./Header";

const VideoPlayer= (props)=>{
    const [video,setVideo]=useState({});
    const [user, setUser]=useState({});
    const[logged, setLogged]=useState({});
    const {id}=useParams();
    var formatter=new Intl.DateTimeFormat("en-GB",{
        year:"numeric",
        month:"long",
        day:"2-digit",
        hour:"2-digit",
        minute:"2-digit"
        
    })

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

        axios.get("http://localhost:8000/api/users/logged",{withCredentials:true}).then((res)=>{
            console.log(res.data);
            setLogged(res.data);
        }).catch((err)=>{
            console.log(err)
        })

        
    },[])

    return(
        <div id="mainContainer">
            <div style={{height:1500, position:"relative",left:400}}>
            <Header logged={logged}/>
            </div>
            <div class="card" style={{height:850,position:"relative", top:150,right:550,backgroundColor:"steelblue"}}>
                <div className="card-body" style={{width:1000}}>
                    <h1>{video.title}</h1>
                    <p className="card-text"> {video.description}</p>
                    <p className="card-text"style={{color:"white"}}><small  className="">{new Date(video.createdAt).toLocaleDateString() +" " +new Date(video.createdAt).toLocaleTimeString()}</small></p>
                </div>
                
                <iframe className="card-img-bottom" width="1000" height="528" src={`https://www.youtube.com/embed/${video.videoURL}?rel=0`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"  allowFullScreen></iframe>
                <div>
                <p>Comedian: <strong>{video.comedian}</strong></p><br></br>
                <p style={{marginTop:-10}}>Uploaded by: <span style={{color:"yellow"}}>{user.username}</span></p>
                </div>
            </div>
        </div>
    )
}
export default VideoPlayer;