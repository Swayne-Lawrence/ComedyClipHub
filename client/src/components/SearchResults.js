import React, {useEffect, useState} from "react";
import axios from "axios";
import { Link,useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import Header from "./Header";

const SearchResults=(props)=>{
    const [videoList,setVideoList]=useState([]);
    const [logged,setLogged]=useState({});
    const {item} = useParams();
    const navi=useNavigate();
    useEffect(()=>{
        axios.get(`http://localhost:8000/api/videos/comedian/${item}`,{withCredentials:true}).then((res)=>{
            console.log(res.data);
            setVideoList(res.data);
            console.log(videoList.length)
            if(res.data.length==0){
                console.log("we in")
                axios.get(`http://localhost:8000/api/videos/title/${item}`,{withCredentials:true}).then((res)=>{
                    console.log(res.data)
                    setVideoList(res.data);
                    console.log(videoList.length)
                    if(res.data.length==0){
                        axios.get(`http://localhost:8000/api/videos/tag/${item}`,{withCredentials:true}).then((res)=>{
                            console.log(res.data);
                            setVideoList(res.data);
                        }).catch((err)=>{console.log(err)})
                    }
                }).catch((err)=>{console.log(err)})
            }
        }).catch((err)=>{console.log(err)})
        axios.get("http://localhost:8000/api/users/logged",{withCredentials:true})
        .then((res)=>{
            console.log(res.data)
            setLogged(res.data)
            
                console.log("1")
        }).catch((err)=>{console.log(err)})
    },[item])


    return(
        <div id="mainContainerSearch">
            <div style={{position: "relative",left:400}}>
                <Header logged={logged}/>
            </div>
            
            {
                videoList.length>0?
              <div>
                  <h2 style={{color:"white",position:"relative",top:30,left:400,textDecorationLine:"underline"}}>search results: {videoList.length}</h2>
                <div className="row row-cols-1 row-cols-md-3 g-4 " style={{width:1200,marginTop:50,height:900,position:"relative",left:400}}>
                    
                    {
                videoList.map((video,index)=>{
                    return(
                        <div className="col">
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
                })}
                </div>
                </div>
                :
                <div style={{height:2000, }}>
                    <h2 style={{color:"white",position:"relative", top:50,left:400}}>could not find results</h2>
                </div>
                
            }
        </div>
    )
}
export default SearchResults

