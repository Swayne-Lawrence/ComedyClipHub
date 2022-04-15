import React, {useEffect, useState} from "react";
import axios from "axios";
import { Link,useParams } from "react-router-dom";

const SearchResults=(props)=>{
    const [videoList,setVideoList]=useState([]);
    const {item} = useParams();
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
    },[])


    return(
        <div>
            {
                videoList.length>0?
                videoList.map((video,index)=>{
                    return(
                        <div>
                            <Link to={`/video/${video._id}`}>{video.title}</Link>
                        </div>
                    )
                })
                :
                <p>could not find results</p>
            }
        </div>
    )
}
export default SearchResults

