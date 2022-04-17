import React,{useState,useEffect} from "react";
import axios from "axios";
import { useParams,useNavigate } from "react-router";
import Header from "./Header";

const EditVideo=(props)=>{
    const [video,setVideo]=useState({});
    const [errors,setErrors]=useState({})
    const {id}=useParams()
    const [logged,setLogged]=useState({})
    const navi= useNavigate();

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/videos/${id}`,{withCredentials:true}).then((res)=>{
            console.log(res.data)

            setVideo(res.data)
        }).catch((err)=>{
            console.log(err)
            
            }
            )
            axios.get("http://localhost:8000/api/users/logged",{withCredentials:true}).then((res)=>{
                console.log(res.data);
                setLogged(res.data);
            }).catch((err)=>{
                console.log(err)
            })

        
    },[])

    const inputHandler=(e)=>{

        setVideo({
            ...video,
            [e.target.name]: e.target.value
        });

    }
    const modifyHandler=()=>{

        
            setVideo({
                ...video,
                comedian: video.comedian.toLowerCase(),
                titleTag:video.title.toLowerCase()
            })
        
            
    }

    const submitHandler=(e)=>{
        e.preventDefault();

        
       

        axios.put(`http://localhost:8000/api/videos/${id}`,video,{withCredentials:true}).then((res)=>{
            console.log(res.data)
            
            navi("/home")
        }).catch((err)=>{
            console.log(err)
            setErrors(err.response.data.errors)
        })

        
    }
    const deleteVid=(id)=>{
        axios.delete(`http://localhost:8000/api/videos/${id}`,{withCredentials:true})
        .then((res)=>{
            console.log(res.data)
            navi("/home")
        }).catch((err)=>{console.log(err)})
    }

    return(
        <div id="mainContainer">
            {
                logged._id==video.createdBy?
            <div style={{height:2000}}>
                <Header logged={logged}/>
      
            <form onSubmit={(e)=>{submitHandler(e)}}>

 


                <div class="card" style={{height:950,position:"relative", top:50,backgroundColor:"steelblue"}}>
                <div className="card-body" style={{width:1000}}>
                <div>             {
                    !errors.title?
                <div className="form-floating mb-3">
                    
                    <input type="text" className="form-control" id="floatingInput" placeholder="Title" name="title" value={video.title} onChange={(e)=>{inputHandler(e)}}/>
                    <label for="floatingInput"><span style={{color:"grey"}}>Title:</span></label>
                    
                        
            
                </div>:
                <div className="form-floating mb-3"> 
                    <input type="text" className="form-control is-invalid" id="floatingInputInvalid" placeholder="Title" name="title" value={video.title} onChange={(e)=>{inputHandler(e)}}/>

                    <label for="floatingInputInvalid"><span style={{color:"red"}}>Invalid Title</span></label>
                </div>
                }</div>
                    <div className="form-floating">
                    <textarea className="form-control" placeholder="Description" id="floatingTextarea2" style={{height:100}} name="description" value={video.description} onChange={(e)=>{inputHandler(e)}}/>
                    <label for="floatingTextarea2"><span style={{color:"grey"}}>Description:</span></label>
                   
                </div>
                <div className="form-floating mb-3">
                    
                    <input style={{marginTop:20}} type="text" className="form-control" id="floatingInput" placeholder="Thumbnail URL" name="thumbnailURL" value={video.thumbnailURL} onChange={(e)=>{inputHandler(e)}}/>
                    <label for="floatingInput"><span style={{color:"grey"}}>Image Link for thumbnail:</span></label>
                    
                        
            
                </div>
                    <p className="card-text"style={{color:"white"}}><small  className="">{new Date(video.createdAt).toLocaleDateString() +" " +new Date(video.createdAt).toLocaleTimeString()}</small></p>
                </div>
                
                <iframe className="card-img-bottom" width="1000" height="528" src={`https://www.youtube.com/embed/${video.videoURL}?rel=0`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"  allowFullScreen></iframe>
                <div>
                                    <div> {
                        !errors.comedian?
                <div class="form-floating mb-3">
                    
                     <input className="form-control" id="floatingInput" placeholder="Comedian" type="text" name="comedian" value={video.comedian} onChange={(e)=>{inputHandler(e)}}/>
                    <label for="floatingInput">Comedian:</label>
                   
                    </div>
                        
                        :
                        <div class="form-floating ">
                    
                        <input className="form-control is-invalid" id="floatingInputInvalid" placeholder="Comedian" type="text" name="comedian" value={video.comedian} onChange={(e)=>{inputHandler(e)}}/>
                       <label for="floatingInputInvalid">Invalid Name</label>
                      
                       </div>
                }</div>
                
                <p style={{marginTop:10}}>Uploaded by: <span style={{color:"yellow"}}>{logged.username}</span></p>
                </div>

            </div>
                           <button type="submit"style={{position:"relative",left:260,width:500,marginTop:70}}  className="btn btn-primary btn-lg" onMouseEnter={()=>{modifyHandler()}}>Edit</button>
            </form>
                      <button className="btn btn-danger btn-lg" style={{position:"relative",left:260,width:500, marginTop:10}} onClick={()=>{deleteVid(video._id)}} >Delete</button>
       
        </div>: <p>unauthorized</p> }
        </div>
    )
}
export default EditVideo;