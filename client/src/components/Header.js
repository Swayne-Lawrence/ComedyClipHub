import React,{useState,ueEffect, useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";


const Header=(props)=>{
    const {logged}=props;
    const [videoList,setVideoList]=useState([]);
    const [searchItem,setSearchItem]=useState("");
    const[ vid,setVid]=useState({});
    
    useEffect(()=>{
        axios.get("http://localhost:8000/api/videos",{withCredentials:true})
        .then((res)=>{
            console.log(res.data);
            setVideoList(res.data)
        }).catch((err)=>{console.log(err)})
    },[])

    const navi= useNavigate()
    const submitHandler=(e)=>{
        e.preventDefault();

        axios.post("http://localhost:8000/api/users/logout",{},{
            withCredentials:true
        }).then((res)=>{
            console.log(res.data)
            navi("/")
        }).catch((err)=>{console.log(err)})
    }

    const tagHandler=()=>{
        videoList.map((video,index)=>{
            for(let i=0; i<video.tags.length; i++){
                if(video.tags[i]== searchItem.toLowerCase()){
                        setVid({video});
                    axios.put(`http://localhost:8000/api/videos/${video._id}`,{...vid,selectedTag:searchItem.toLowerCase()},{withCredentials:true}).then((res)=>{
                        console.log(res.data)
                    }).catch((err)=>{console.log(err)})
                }
            }
        })
    }

    const searchHandler=(e)=>{
        e.preventDefault();
        tagHandler();

        
        navi(`/results/${searchItem.toLowerCase()}`);
    }


    return(
        <div id="headerContainer" >
            <nav class="navbar navbar-expand-lg " style={{backgroundColor:"steelblue"}}>
            <div className="container-fluid">
            <h1 id="headerTitle" style={{color:"goldenrod"}} className="navbar-brand">Comedy Clips Hub</h1>
            <img id="comedyLogo" src="https://cdn2.iconfinder.com/data/icons/theater-stage-performers/287/artist-show-performance-006-512.png"/>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0"> 
                    <li>
                        <Link className="nav-link active" style={{color:"black"}} aria-current="page" to="/home">Home</Link>
                    </li>
                    <li className="nav-item ">
                        <label className="nav-link dropdown-toggle"
                        id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{color:"black"}}>Profile</label>
                        <ul id="headerDrop" className="dropdown-menu" aria-labelledby="navbarDropdown" style={{backgroundColor:"darkgray"}}>
                            <li style={{backgroundColor:"darkgray"}}>
                                <form onSubmit={(e)=>{submitHandler(e)}}>
                                    <button style={{color:"darkred"}} className="dropdown-item" type="submit">Logout</button>
                                </form>
                            </li>
                            <li><hr className="dropdown-divider"></hr></li>
                            <li><Link style={{color:"yellow"}} className="dropdown-item" to="">{logged.username}</Link></li>

                        </ul>
                    </li>
          
                </ul>
            <button id="uploadButton" className="btn btn-warning" onClick={()=>{navi("/upload")}}>Upload</button>
            <form className="d-flex" onSubmit={(e)=>{searchHandler(e)}}>
                    
                    <input className="form-control me-2" value={searchItem} type="search" name="searchItem" placeholder="Search" aria-label="Search" onChange={(e)=>{
                        setSearchItem(e.target.value)}}/>
                
                <button className="btn btn-outline-dark" type="submit" >Search</button>
            </form>
            </div>
            </div>
            </nav>
        </div>
    )
}
export default Header;