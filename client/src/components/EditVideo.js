import React,{useState,useEffect} from "react";
import axios from "axios";
import { useParams,useNavigate } from "react-router";

const EditVideo=(props)=>{
    const [video,setVideo]=useState({});
    const [errors,setErrors]=useState({})
    const {id}=useParams()
    const navi= useNavigate();

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/videos/${id}`,{withCredentials:true}).then((res)=>{
            console.log(res.data)

            setVideo(res.data)
        }).catch((err)=>{
            console.log(err)
            
            }
            )
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
            
            
        }).catch((err)=>{
            console.log(err)
            setErrors(err.response.data.errors)
        })

        navi("/home")
    }


    return(
        <div>
            <form onSubmit={(e)=>{submitHandler(e)}}>
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
                    <label>Comedian:</label>
                    <input type="text" name="comedian" value={video.comedian} onChange={(e)=>{inputHandler(e)}}/>
                    {
                        errors.comedian?
                        <p style={{color:"red"}}>{errors.comedian.message}</p>
                        :
                        null
                    }
                </div>
                <button type="submit" onMouseEnter={()=>{modifyHandler()}}>Edit</button>
            </form>
        </div>
    )
}
export default EditVideo;