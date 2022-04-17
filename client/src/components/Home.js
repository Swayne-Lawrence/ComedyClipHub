import { useState,useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const Home= (props)=>{
    const navi= useNavigate();
    const [logged,setLogged]=useState({})
    const [videoList, setVideoList]=useState([]);
    const [user,setUser]=useState({});
    const [userList,setUserList]=useState([])
    
    useEffect(()=>{
        axios.get("http://localhost:8000/api/users/logged",{withCredentials:true})
        .then((res)=>{
            console.log(res.data)
            setLogged(res.data)
            
                console.log("1")
        }).catch((err)=>{console.log(err)})

        axios.get("http://localhost:8000/api/videos",{withCredentials:true})
        .then((res)=>{
            console.log(res.data)
            setVideoList(res.data)

        }).catch((err)=>{console.log(err)})
        
        axios.get("http://localhost:8000/api/users",{withCredentials:true})
        .then((res)=>{
            console.log(res.data)
            setUserList(res.data)
        })

    },[])

    return(
        <div >
            <div id="mainContainer">
           {
            logged._id?
            <div >
            <Header  logged={logged} />
            <h1 style={{color:"white",textDecorationLine:"underline"}}>All Clips</h1>
            <div className="row row-cols-1 row-cols-md-3 g-4 " style={{width:1200,marginTop:30}}>
               
            {
                videoList.map((video,index)=>{
                        
                    return(
                             <div className="col" > 
                             { 
                                !video.thumbnailURL?
                        <div className="card" style={{
                            width:280,
                            height: 360,
                            backgroundColor:"steelblue"
                            }}>
                            <img style={{height:150,width:200, position:"relative",left:50
                            }} src="https://cdn0.iconfinder.com/data/icons/party-human-1/66/34-512.png" className="card-img-top"/>
                            <div className="card-body">
                                <h5 className="card-title">{video.title}</h5>
                                <div ><p style={{marginTop:-5}}>Comedian: <strong>{video.comedian}</strong></p>
                                <p style={{marginTop:-20}}> Uploaded by: <span style={{color:"yellow"}}>{video.username}</span></p>
                                </div>
                                
                            
                                
                                <button style={{color:"white",
                            position:"relative",
                            left:90,
                            top:50
                            
                            }} className="btn btn-outline-warning" onClick={()=>{navi(`/video/${video._id}`)}}>Watch</button>
                            {
                                logged._id==video.createdBy?
                                <div id="delEdit">
                            
                            <button className="btn btn-outline-dark"  onClick={()=>{navi(`/edit/${video._id}`)}}>Manage</button>
                            </div>
                            :
                            null
                            }
                            </div>
                        </div>: 
                            <div className="card" style={{
                            width:280,
                            height: 360,
                            backgroundColor:"steelblue"
                            }}>
                            <img style={{height:160,width:250, position:"relative",left:15
                            }} src={video.thumbnailURL} className="card-img-top"/>
                            <div className="card-body">
                                <h5 className="card-title">{video.title}</h5>
                                <div ><p style={{marginTop:-5}}>Comedian: <strong>{video.comedian}</strong></p>
                                <p style={{marginTop:-20}}> Uploaded by: <span style={{color:"yellow"}}>{video.username}</span></p>
                                </div>
                                
                            
                                
                                <button style={{color:"white",
                            position:"relative",
                            left:90,
                            top:50
                            
                            }} className="btn btn-outline-warning" onClick={()=>{navi(`/video/${video._id}`)}}>Watch</button>
                            {
                                logged._id==video.createdBy?
                                <div id="delEdit">
                            
                            <button className="btn btn-outline-dark"  onClick={()=>{navi(`/edit/${video._id}`)}}>Manage</button>
                            </div>
                            :
                            null
                            }
                            </div>
                        </div>}
                        </div>
                    )
                })
            }
            
            </div>

            
            
            </div>
            
            :

            
                navi("/")
            

            
            }
            </div>
        </div>
    )
}
export default Home;