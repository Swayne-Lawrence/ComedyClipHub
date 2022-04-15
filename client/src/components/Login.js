import React, { useState,useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";


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
        <div>
            {!logged._id?
            <form onSubmit={(e)=>{submitHandler(e)}}> 
                {errors? 
                    <p style={{color:"red"}}>{errors}</p>:null}
                <div>
                    <label>Email:</label>
                    <input type="email" name="email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" name="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                </div>
                <button type="submit">Login</button>
            </form>
            :
            navi("/home")
            }
        </div>
    )
}
export default Login;