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
    const [userList,setUserList]=useState([]);
    const [logged,setLogged]=useState({})
    const [exist,setExist]=useState(false)

    useEffect(()=>{
        axios.get("http://localhost:8000/api/users/logged",{withCredentials:true}).then((res)=>{
            console.log(res.data);
            setLogged(res.data);
        }).catch((err)=>{
            console.log(err)
        })
        axios.get("http://localhost:8000/api/users").then((res)=>{
            console.log(res.data)
            setUserList(res.data)
        }).catch((err)=>{console.log(err)})
    },[])

    const navi= useNavigate();

    const inputHandler=(e)=>{
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const [error,setError]=useState({});
    const checkUnique=()=>{
        userList.map((u,index)=>{
            if(u.email==user.email){
                setExist(true)
                return;
            }
            
        })
    }

    const submitHandler=(e)=>{
        e.preventDefault();
        
        console.log(exist)
        if(exist==true){
            console.log("but its true")
            alert("email already exist")
            window.location.reload(false);

            return;
        }

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
            <form id="regForm" onSubmit={(e)=>{submitHandler(e)}}>
                {
                    !error.username?
                <div className="form-floating mb-3">
                    
                    <input type="text" className="form-control" id="floatingInput" placeholder="Username" name="username" value={user.username} onChange={(e)=>{inputHandler(e)}}/>
                    <label for="floatingInput"><span style={{color:"grey"}}>Username:</span></label>
                    
                        
            
                </div>:
                <div className="form-floating mb-3"> 
                    <input type="text" className="form-control is-invalid" id="floatingInputInvalid" placeholder="Username" name="username" value={user.username} onChange={(e)=>{inputHandler(e)}}/>
                    <label for="floatingInputInvalid"><span style={{color:"red"}}>Invalid Username</span></label>
                </div>
                }
                {
                    !error.email?
                <div className="form-floating mb-3">
                    
                    <input type="email" className="form-control" id="floatingInput" placeholder="Email" name="email" value={user.email} onChange={(e)=>{inputHandler(e)}}/>
                    <label for="floatingInput"><span style={{color:"grey"}}>Email:</span></label>
                    
                        
            
                </div>:
                <div className="form-floating mb-3"> 
                    <input type="email" className="form-control is-invalid" id="floatingInputInvalid" placeholder="Email" name="email" value={user.email} onChange={(e)=>{inputHandler(e)}}/>
                    <label for="floatingInputInvalid"><span style={{color:"red"}}>Invalid Email</span></label>
                </div>
                }
 {
                    !error.password?
                <div className="form-floating mb-3">
                    
                    <input type="password" className="form-control" id="floatingInput" placeholder="Password" name="password" value={user.password} onChange={(e)=>{inputHandler(e)}}/>
                    <label for="floatingInput"><span style={{color:"grey"}}>Password:</span></label>
                    
                        
            
                </div>:
                <div className="form-floating mb-3"> 
                    <input type="passpassword" className="form-control is-invalid" id="floatingInputInvalid" placeholder="Password" name="password" value={user.password} onChange={(e)=>{inputHandler(e)}}/>
                    <label for="floatingInputInvalid"><span style={{color:"red"}}>Invalid Password</span></label>
                </div>
                }
 {
                    !error.confirmPassword?
                <div className="form-floating mb-3">
                    
                    <input type="password" className="form-control" id="floatingInput" placeholder="Confirm Password" name="confirmPassword" value={user.confirmPassword} onChange={(e)=>{inputHandler(e)}}/>
                    <label for="floatingInput"><span style={{color:"grey"}}>Confirm Password:</span></label>
                    
                        
            
                </div>:
                <div className="form-floating mb-3"> 
                    <input type="password" className="form-control is-invalid" id="floatingInputInvalid" placeholder="Confirm Password" name="confirmPassword" value={user.confirmPassword} onChange={(e)=>{inputHandler(e)}}/>
                    <label for="floatingInputInvalid"><span style={{color:"red"}}>Must match password</span></label>
                </div>
                }
 
                
                <button onMouseEnter={()=>{checkUnique()}} className="btn btn-dark" type="submit">Register</button>
            </form>
            :
            navi("/home")
            }
        </div>
    )

}
export default Register;
