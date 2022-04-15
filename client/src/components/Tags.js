import React,{useEffect,useState} from "react";
import axios from "axios";
import { Link,useNavigate,useParams } from "react-router-dom";

const Tags=(props)=>{
    const [tags,setTags]=useState([]);
    const [video,setVideo]=useState({});
    const {id}=useParams();
    var array=[];
    const[word,setWord]=useState("");
    const [str, setStr]=useState("");
    const [cont,setCont]=useState(false);
    const navi = useNavigate(); 

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/videos/${id}`,{withCredentials:true}).then((res)=>{
            console.log(res.data);
            setVideo(res.data)
        }).catch((err)=>{
            console.log(err)
        })
        
    },[id])

    const arrayHandler=()=>{
                setTags([...tags,word.toLowerCase()]);
                setStr(str+word+",")
                console.log(str)
                axios.put(`http://localhost:8000/api/videos/${id}`,video,{withCredentials:true}).then((res)=>{
                    console.log(res.data)
                    
                       
                }).catch((err)=>{console.log(err)})
                
  
    
   
    
    }

    const submitHandler=(e)=>{
        e.preventDefault(); 
        console.log("we in")     
        setVideo({
            ...video,
            tags:tags
        } )
    axios.put(`http://localhost:8000/api/videos/${id}`,video,{withCredentials:true}).then((res)=>{
        console.log(res.data)
        if(cont){
            navi("/home")
        }
        
           
    }).catch((err)=>{console.log(err)})
    
    }



    return(
        <div>
            <form onSubmit={(e)=>{submitHandler(e)}}>
                <div>
                    <p style={{color:"grey"}}>{str}</p>
                    <label>Tags</label>
                    <input value={word} type="text" onChange={(e)=>{setWord(e.target.value)}}/>
                </div>
                <button onClick={()=>{arrayHandler()}}>Add</button>
                <button type="submit" onClick={()=>{setCont(true)}}>Continue</button>
                
            </form>
           
        </div>
    );
}

export default Tags;