import React, { useState,useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";


const Login=(props)=>{
    const [email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const [errors, setError] = useState("");

    const [logged,setLogged]=useState({})

    useEffect(()=>{
        axios.get("http://localhost:8000/api/users/logged",{withCredentials:true}).then((res)=>{
            console.log(res.data);
            setLogged(res.data);
        }).catch((err)=>{
            console.log(err)
        })
    },[])
    
    const navi = useNavigate();
    
    const submitHandler=(e)=>{
        e.preventDefault();

        axios.post("http://localhost:8000/api/users/login",{email:email,password:password},{withCredentials:true}).then((res)=>{
            console.log(res.data)
            navi("/home");

        }).catch((err)=>{
            console.log(err)
            setError("Invalid email or password")
        })
    }

    return(
        <div id="mainContainerReg">
                        <div id="regClips">
            <h1 style={{
                        fontSize:60,
                        color:"goldenrod"
                                }}>
                                    Comedy Clips Hub</h1>
            <img id="comedyLogoReg" src="https://cdn2.iconfinder.com/data/icons/theater-stage-performers/287/artist-show-performance-006-512.png"/>
            </div>
            {!logged._id?
            <div id="regForm" className> 
                <form  className="px-4 py-3" onSubmit={(e)=>{submitHandler(e)}}> 
                    {!errors? 
                        <div>
                    <div className="form-floating mb-3">
                        
                            <input className="form-control" id="floatingInput" placeholder="Email" type="email" name="email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                        <label for="floatingInput"><span style={{color:"grey"}}>Email:</span></label>
                   
                    </div>
                    <div className="form-floating mb-3">
                        <input className="form-control" id="floatingPassword" placeholder="Password" type="password" name="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                        <label for="floatingPassword"><span style={{color:"grey"}}>Password:</span></label>
                       </div>
                    </div>
                    :
                    <div>
                         <div className="form-floating mb-3">
                        
                        <input className="form-control is-invalid" id="floatingInputInvalid" placeholder="Email" type="email" name="email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                    <label for="floatingInputInvalid"><span style={{color:"red"}}>Invalid Email/Password</span></label>
               
                </div>
                <div className="form-floating mb-3">
                    <input className="form-control is-invalid" id="floatingInputInvalid" placeholder="Password" type="password" name="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                    <label for="floatingInputInvalid"><span style={{color:"red"}}>Invalid Email/Password</span></label>
                   </div>
                    </div>
                    
                    }
                    <button className="btn btn-dark" type="submit">Login</button>
                </form>
                <div className="dropdown-divider"></div>
                <Link className="dropdown-item" to="/register"> <strong>Register </strong></Link>
                
            </div>
            :
            navi("/home")
            }
        </div>
    )
}
export default Login;