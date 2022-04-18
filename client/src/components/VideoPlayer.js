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
    const[commentList,setCommentList]=useState([]);
    const[comment,setComment]=useState({
        message:"",
        createdBy:"",
        username:"",
        video:""
    })
    const [newComment,setNewComment]=useState({});
    const[time,setTime]=useState("");


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

        axios.get(`http://localhost:8000/api/comments/${id}`).then((res)=>{
            console.log(res.data);
            setCommentList(res.data)
        }).catch((err)=>{console.log(err)})
        
    },[newComment])

    const inputHandler=(e)=>{

        setComment({
            ...comment,
            [e.target.name]: e.target.value
        });

    }

    const modifyHandler=()=>{
        setComment({
            ...comment,
            createdBy:logged._id,
            username:logged.username,
            video:id
        })
    }

    const deleteComment=(id)=>{
        axios.delete(`http://localhost:8000/api/comments/${id}`,{withCredentials:true}).then((res)=>{
            console.log(res)
            window.location.reload(false);
        }).catch((err)=>{console.log(err)})
    }

    const submitHandler=(e)=>{
        e.preventDefault()
        axios.post("http://localhost:8000/api/comments",comment,{withCredentials:true})
        .then((res)=>{
            console.log(res.data);
            setNewComment(res.data)
            window.location.reload(false);

        }).catch((err)=>{console.log(err)})

    }
    const getTime=(createdAt)=>{
    
        const num1=Math.round(new Date(createdAt).getTime()/1000)
        const num2= Math.round(new Date().getTime()/1000)
        const sec=num2-num1;
        if(sec<60){
            return(`${sec} second ago`);
        }
        if(sec>60 && sec<3600){
            return(`${Math.round(sec/60)} mins ago`)
        }
        if(sec>3600 && sec<86400){
            return(`${Math.round(sec/3600)} hours ago`)
        }
        if(sec>86400 && sec<2628002){
           return(`${Math.round(sec/86400)} days ago`)
        }
        if(sec>2628002 && sec<31536000){
            return(`${Math.round(sec/2628002)} months ago`)
        }
        if(sec>31536000){
            return(new Date(createdAt).toLocaleDateString())
        }


    }

    return(
        <div id="mainContainerVideo">
            <div style={{ position:"relative",left:400}}>
            <Header logged={logged}/>
            </div>
            <h3 style={{position:"relative",top:120,left:1510,color:"goldenrod"}}> Comments</h3>
            <div className="" style={{height:850,width:850,  position:"relative", top:10,left:300,backgroundColor:"steelblue"}}>
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
            <div className="card"style={{position:"relative",bottom:700,left:1400, backgroundColor:"midnightblue", borderColor:"midnightblue",overflow:"scroll", overflowX:"hidden",height:400,width:400}}>
          
            <div >
                
                {
                    commentList.map((comment,index)=>{
                        return(
                                (comment.createdBy==logged._id || video.createdBy==logged._id)?
                            
                             <div className="card border-warning mb-3" style={{maxWidth:300,height:160,marginLeft:30,backgroundColor:"steelblue"}}>
                            <div className="card-header" style={{color:"yellow"}}>{comment.username} </div><button style={{position:"relative", left:275,bottom:35,height:6,width:6}} className="btn-close" aria-label="Close" onClick={()=>{deleteComment(comment._id)}}></button>
                            <div className="card-body"></div>
                            <h6 style={{color:"white",fontStyle:"italic", position:"relative",left:5}} className="card-title">{getTime(comment.createdAt)}</h6>
                            <p style={{position:"relative",left:5}}>{comment.message} </p>
                            </div>
                            :
                           <div className="card border-warning mb-3" style={{maxWidth:300,height:160,marginLeft:30,backgroundColor:"steelblue"}}>
                                <div className="card-header" style={{color:"yellow"}} >{comment.username}</div>
                                <div className="card-body"></div>
                                <h6 style={{color:"white",fontStyle:"italic", position:"relative",left:5}} className="card-title">{getTime(comment.createdAt)}</h6>
                                <p style={{position:"relative",left:5}}>{comment.message} </p>
                            </div>
                        )
                    })
                }
            </div>
         




            </div>   
            <form style={{position:"relative", bottom:650, left:1450,width:300}} onSubmit={(e)=>submitHandler(e)}>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control"  id="floatingInput" name="message" placeholder="Comment" value={comment.message} onChange={(e)=>{inputHandler(e)}}/>
                    <label for="floatingInput">Comment:</label>
           
                </div>
                <button style={{position:"relative", left:110}} type="submit" className="btn btn-outline-warning" onMouseEnter={()=>{modifyHandler()}}>Send</button>
            </form>
        </div>
    )
}
export default VideoPlayer;