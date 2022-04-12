import React,{useState,useEffect} from "react";
import axios from "axios";
import {useNavigate,Link} from "react-router-dom";

const UploadVid= (props)=>{
    const[user,setUser]=useState({});
    var hideUpload=true;

    useEffect(()=>{
        axios.get("http://localhost:8000/api/users/logged",{withCredentials:true}).then((res)=>{
            console.log(res.data);
            setUser(res.data);
        }).catch((err)=>{
            console.log(err)
        })
    },[])

    const [video,setVideo]= useState({
        title: "",
        description:"",
        createdBy:"",
        comedian:"",
        videoURL:""
    })

    const [first, setFirst]=useState("");
    const [last,setLast]=useState("");

    const[url,setUrl]=useState("");

    const inputHandler=(e)=>{

        setVideo({
            ...video,
            [e.target.name]: e.target.value
        });

    }

    const urlHandler=()=>{
        
    
    }

    const modifyHandler=()=>{
        
        setVideo({
            ...video,
            comedian: (first+" "+ last).toLowerCase(),
            videoURL:video.videoURL.slice(17,video.videoURL.length),
            createdBy: user._id
        })

        
    }

    const submitHandler=(e)=>{
        e.preventDefault();

        
       

        axios.post("http://localhost:8000/api/videos",video,{withCredentials:true}).then((res)=>{
            console.log(res.data)
        }).catch((err)=>{
            console.log(err)
        })
    }

    return(
        <div >
                
        <form  onSubmit={(e)=>{submitHandler(e)}}>
            
                <div>
                    <label>Title:</label>
                    <input type="text" name="title" value={video.title} onChange={(e)=>{inputHandler(e)}}/>
                </div>
                <div>
                    <label>Description:</label>
                    <input type="text" name="description" value={video.description} onChange={(e)=>{inputHandler(e)}}/>
                </div>
                <div>
                    <label>First Name:</label>
                    <input type="text" name="first" value={first} onChange={(e)=>{setFirst(e.target.value)}}/>
                </div>
                <div>
                    <label>Last Name:</label>
                    <input type="text" name="last" value={last} onChange={(e)=>{setLast(e.target.value)}}/>
                </div>
                <div>
                    <label>YouTube URL:</label>
                    <input type="text" name="videoURL" value={video.videoURL} onChange={(e)=>{inputHandler(e)}}/>
                </div>
            
            <button type="submit" onMouseEnter={()=>{modifyHandler()}}>Upload</button>
            
        </form>
            
        </div>
    )
}
export default UploadVid;