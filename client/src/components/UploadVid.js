import React,{useState,useEffect} from "react";
import axios from "axios";
import {useNavigate,Link} from "react-router-dom";
import Header from "./Header";

const UploadVid= (props)=>{
    const[logged,setLogged]=useState({});
    const [errors,setErrors]=useState({});

    const navi=useNavigate();
    

    useEffect(()=>{
        axios.get("http://localhost:8000/api/users/logged",{withCredentials:true}).then((res)=>{
            console.log(res.data);
            setLogged(res.data);
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
                createdBy: logged._id,
                titleTag:video.title.toLowerCase(),
                username:logged.username
            })
        }else{
                    setVideo({
            ...video,
            comedian: (first+" "+ last).toLowerCase(),
            videoURL:video.videoURL.slice(17,video.videoURL.length),
            createdBy: logged._id,
            titleTag:video.title.toLowerCase(),
            username:logged.username
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
        <div id="mainContainer">
        {  
            logged._id?
            <div style={{height:1000}}> 
                <Header logged={logged}/>
        <form id="uploadForm" onSubmit={(e)=>{submitHandler(e)}}>
            <h2 style={{color:"white"}}>Video info</h2>
            
        {
                    !errors.title?
                <div className="form-floating mb-3">
                    
                    <input type="text" className="form-control" id="floatingInput" placeholder="Title" name="title" value={video.title} onChange={(e)=>{inputHandler(e)}}/>
                    <label for="floatingInput"><span style={{color:"grey"}}>Title:</span></label>
                    
                        
            
                </div>:
                <div className="form-floating mb-3"> 
                    <input type="text" className="form-control is-invalid" id="floatingInputInvalid" placeholder="Title" name="title" value={video.title} onChange={(e)=>{inputHandler(e)}}/>
                    <label for="floatingInputInvalid"><span style={{color:"red"}}>Invalid Title</span></label>
                </div>
                }
                <div className="form-floating">
                    <textarea className="form-control" placeholder="Description" id="floatingTextarea2" style={{height:100}} name="description" value={video.description} onChange={(e)=>{inputHandler(e)}}/>
                    <label for="floatingTextarea2"><span style={{color:"grey"}}>Description:</span></label>
                   
                </div>
                <div className="form-floating mb-3">
                    
                    <input style={{marginTop:20}} type="text" className="form-control" id="floatingInput" placeholder="Thumbnail URL" name="thumbnailURL" value={video.thumbnailURL} onChange={(e)=>{inputHandler(e)}}/>
                    <label for="floatingInput"><span style={{color:"grey"}}>Image Link for thumbnail:</span></label>
                    
                        
            
                </div>
                <h2 style={{color:"white"}}>Comedian</h2>
                       {
                        errors.comedian?
                <div className="row" style={{marginTop:20}}>
                <div className="col form-floating mb-3">
                    <input id="floatingInputInvalid" className="form-control is-invalid" placeholder="First Name"type="text" name="first" value={first} onChange={(e)=>{setFirst(e.target.value)}}/>
                    <label for="floatingInputInvalid"><span style={{color:"red"}}>Name Invalid</span></label>

                </div>
                <div className="col form-floating mb-3">
                    <input id="floatingInputInvalid" className="form-control is-invalid" placeholder="Last Name" type="text" name="last" value={last} onChange={(e)=>{setLast(e.target.value)}}/>
                    <label for="floatingInputInvalid"><span style={{color:"red"}}> Name Invalid</span></label>

                   
                        
             
                </div>
                </div>           
                :
                <div  className="row" style={{marginTop:20}}>
                    <div className="col form-floating mb-3">
                    <input id="floatingInput" className="form-control" placeholder="First Name"type="text" name="first" value={first} onChange={(e)=>{setFirst(e.target.value)}}/>
                    <label for="floatingInput"><span style={{color:"gray"}}> First Name:</span></label>

                </div>
                <div className="col form-floating mb-3">
                    <input id="floatingInput" className="form-control" placeholder="Last Name" type="text" name="last" value={last} onChange={(e)=>{setLast(e.target.value)}}/>
                    <label for="floatingInput"><span style={{color:"grey"}}> Last Name:</span></label>

                   
                        
             
                    </div>
                </div>
                    }
                    <h2 style={{color:"white"}}>YouTube Url</h2>
                    <p style={{color:"yellowgreen"}}>*Right click youtube video and select either copy link or copy video url</p>
                    
                    {
                        !errors.videoURL?
                <div className="input-group form-floating mb-3">
                    
                    <input type="text" className="form-control" id="floatingInput" placeholder="Youtube Url" name="videoURL" value={video.videoURL} onChange={(e)=>{inputHandler(e)}}/>
                    <label for="floatingInput"><span style={{color:"gray"}}>ex: https://www.youtube.com/watch?(random letters)</span></label>
                    <button style={{color:"white"}} className="btn btn-warning" type="submit" id="button-addon2" onMouseEnter={()=>{modifyHandler()}}>Upload</button>
                    
                    </div>   
                        :
                        <div className="input-group form-floating mb-3">
                            <input type="text" className="form-control is-invalid" id="floatingInputInvalid" placeholder="Youtube Url" name="videoURL" value={video.videoURL} onChange={(e)=>{inputHandler(e)}}/>
                    <label for="floatingInputInvalid"><span style={{color:"red"}}>YouTube URL:</span></label>
                    <button style={{color:"white"}} className="btn btn-warning" type="submit" id="button-addon2" onMouseEnter={()=>{modifyHandler()}}>Upload</button>
                        </div>

                    }
                
            
            
            
        </form>
        </div>
        :
        navi("/")
        }  
            
        </div>
    )
}
export default UploadVid;