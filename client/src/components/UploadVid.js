import React,{useState,useEffect} from "react";
import axios from "axios";
import {useNavigate,Link} from "react-router-dom";

const UploadVid= (props)=>{
    const[user,setUser]=useState({});
    const [errors,setErrors]=useState({});

    const navi=useNavigate();
    

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

   

    const inputHandler=(e)=>{

        setVideo({
            ...video,
            [e.target.name]: e.target.value
        });

    }



    const modifyHandler=()=>{

        if(video.videoURL.slice(13,14) != "."){
            setVideo({
                ...video,
                comedian: (first+" "+ last).toLowerCase(),
                videoURL:video.videoURL.slice(32,video.videoURL.length),
                createdBy: user._id,
                titleTag:video.title.toLowerCase()
            })
        }else{
                    setVideo({
            ...video,
            comedian: (first+" "+ last).toLowerCase(),
            videoURL:video.videoURL.slice(17,video.videoURL.length),
            createdBy: user._id,
            titleTag:video.title.toLowerCase()
        })
        }
        


        
    }

    const submitHandler=(e)=>{
        e.preventDefault();

        
       

        axios.post("http://localhost:8000/api/videos",video,{withCredentials:true}).then((res)=>{
            console.log(res.data)
            navi(`/tags/${res.data._id}`)
            
        }).catch((err)=>{
            console.log(err)
            setErrors(err.response.data.errors)
        })
    }

    return(
        <div >
        {  
            user._id?
        <form  onSubmit={(e)=>{submitHandler(e)}}>
            
                <div>
                    <label>Title:</label>
                    <input type="text" name="title" value={video.title} onChange={(e)=>{inputHandler(e)}}/>
                    {
                        errors.title?
                        <p style={{color:"red"}}>{errors.title.message}</p>
                        :
                        null
                    }
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
                    {
                        errors.comedian?
                        <p style={{color:"red"}}>{errors.comedian.message}</p>
                        :
                        null
                    }
                </div>
                <div>
                    <label>YouTube URL:</label>
                    <input type="text" name="videoURL" value={video.videoURL} onChange={(e)=>{inputHandler(e)}}/>
                    {
                        errors.videoURL?
                        <p style={{color:"red"}}>{errors.videoURL.message}</p>
                        :
                        null
                    }
                </div>
            
            <button type="submit" onMouseEnter={()=>{modifyHandler()}}>Upload</button>
            
        </form>
        :
        <p>please log in</p>
        }  
            
        </div>
    )
}
export default UploadVid;