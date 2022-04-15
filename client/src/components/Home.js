import { useState,useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const Home= (props)=>{
    const navi= useNavigate();
    const [logged,setLogged]=useState({})
    const [videoList, setVideoList]=useState([]);
    
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
        
        

    },[])

    const deleteVid=(id)=>{
        axios.delete(`http://localhost:8000/api/videos/${id}`)
        .then((res)=>{
            console.log(res.data)
            setVideoList(videoList.filter((video=>video._id != id)))
        }).catch((err)=>{console.log(err)})
    }



    return(
        <div >
            <div id="mainContainer">
           {
            logged._id?
            <div>
            <Header videoList={videoList} logged={logged} />
            <p>Hello</p>
            {
                videoList.map((video,index)=>{
                    return(
                        <div>
                            <Link to={`/video/${video._id}`}>{video.title}</Link>
                            {
                                logged._id==video.createdBy?
                                <div>
                            <button onClick={()=>{deleteVid(video._id)}} >Delete</button>
                            <Link to={`/edit/${video._id}`}>Edit</Link>
                            </div>
                            :
                            null
                            }
                        </div>

                    )
                })
            }
            
            
            </div>:

            
                navi("/login")
            

            
            }
            </div>
        </div>
    )
}
export default Home;