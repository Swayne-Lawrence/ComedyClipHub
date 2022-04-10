import React,{useState,useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const Register=(props)=>{
    const [user,setUser]=useState({
        username:"",
        email:"",
        password:"",
        confirmPassword:"",
        profilePic:""
    }
    )

    const navi= useNavigate();

    const inputHandler=(e)=>{
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const [error,setError]=useState({});

    const submitHandler=(e)=>{
        e.preventDefault();
        axios.post("http://localhost:8000/api/users/register",user,{withCredentials: true}).then((res)=>{
            console.log(res.data);
           axios.post("http://localhost:8000/api/users/login",user,{withCredentials:true}).then((res)=>{
                console.log(res.data)
                navi("/home")

            }).catch((err)=>{console.log(err.response.data)})

       

        }).catch((err)=>{
            console.log(err);
            setError(err.response.data.errors);
        }) 
            setUser({
                username: "",
                email:"",
                password:"",
                confirmPassword:"",
                profilePic:""
            })
    }

    return(
        <div>
            <form onSubmit={(e)=>{submitHandler(e)}}>
                <div>
                    <label>Username:</label>
                    <input type="text" name="username" value={user.username} onChange={(e)=>{inputHandler(e)}}/>
                    {
                        error.username?
                        <p style={{color:"red"}}>{error.username.message}</p>:
                        null
                    }   
            
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" name="email" value={user.email} onChange={(e)=>{inputHandler(e)}}/>
                    {
                        error.email?
                        <p style={{color:"red"}}>{error.email.message}</p>:
                        null
                    }   
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" name="password" value={user.password} onChange={(e)=>{inputHandler(e)}}/>
                    {
                        error.password?
                        <p style={{color:"red"}}>{error.password.message}</p>:
                        null
                    }   
                </div>
                <div>
                    <label>Confirm Password:</label>
                    <input type="password" name="confirmPassword" value={user.confirmPassword} onChange={(e)=>{inputHandler(e)}}/>
                    {
                        error.confirmPassword?
                        <p style={{color:"red"}}>{error.confirmPassword.message}</p>:
                        null
                    }   
                </div>
                <div>
                    <label>Profile Picture:</label>
                    <input type="text" name="profilePic" value={user.profilePic} onChange={(e)=>{inputHandler(e)}}/>
                    {
                        error.profilePic?
                        <p style={{color:"red"}}>{error.profilePic.message}</p>:
                        null
                    }   
                </div>
                
                <button type="submit">Register</button>
            </form>
        </div>
    )

}
export default Register;
