import React,{useEffect,useState} from "react";
import axios from "axios";
import { Link,useNavigate,useParams } from "react-router-dom";
import Header from "./Header";

const Tags=(props)=>{
    const [tags,setTags]=useState([]);
    const [video,setVideo]=useState({});
    const {id}=useParams();
    var array=[];
    const[word,setWord]=useState("");
    const [str, setStr]=useState("");
    const [cont,setCont]=useState(false);
    const navi = useNavigate(); 
    const [logged,setLogged]=useState({});

    useEffect(()=>{
        axios.get("http://localhost:8000/api/users/logged",{withCredentials:true}).then((res)=>{
            console.log(res.data);
            setLogged(res.data);
        }).catch((err)=>{
            console.log(err)
        })
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
        <div id="mainContainer">
            
            <div  style={{
                position:"relative",
                left:200,
                height:2000
                            }}>
                <Header  logged={logged}/>
            </div>
            <div>
            <h1 style={{color:"white",position:"relative",
        top:150,right:400}}>Add Tags</h1>
            <form  id="tagForm" onSubmit={(e)=>{submitHandler(e)}}>
                 <p style={{color:"white"}}>{str}</p> 
                <div className="input-group">
                   
                    
                    <input value={word} type="text"  className="form-control" placeholder="Tags" onChange={(e)=>{setWord(e.target.value)}}/>
                <button id="addBtn" className="btn btn-primary" onClick={()=>{arrayHandler()}}>Add</button>
                <button className="btn btn-warning" style={{color:"white"}} type="submit" onClick={()=>{setCont(true)}}>Continue</button>
                </div>

                
            </form>
           </div>
        </div>
    );
}

export default Tags;