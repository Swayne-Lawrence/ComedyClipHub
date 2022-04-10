import React,{useState,ueEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const Header=(props)=>{

    const navi= useNavigate()
    const submitHandler=(e)=>{
        e.preventDefault();

        axios.post("http://localhost:8000/api/users/logout",{},{
            withCredentials:true
        }).then((res)=>{
            console.log(res.data)
            navi("/login")
        }).catch((err)=>{console.log(err)})
    }


    return(
        <div>
            <form onSubmit={(e)=>{submitHandler(e)}}>
                <button type="submit">Logout</button>
            </form>
        </div>
    )
}
export default Header;