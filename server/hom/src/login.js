import React from 'react'
import "./login.css"
import { useState } from 'react'
import {useNavigate } from "react-router-dom";
// import Home from './Home.js';
import {useContextNow} from "./getevery.js"
import {useContextNow2} from "./getevery.js"

import Axios from 'axios'

export default function Login() {
    const [phone,setPhone]= useState(0)
    const [password,setPassword]= useState('')
const [findid,setFindid]=useState(true)

    const [employeeList, setEmployeeList] = useState([]);

    const a=()=>{
    
        
        if (!findid){
         return  <p>wrong password and id</p>
        }
      
       
       
    }

    let b=useContextNow()
    let b2=useContextNow2()
    const Navigate=useNavigate()

  return (
    <div className="outer-login">
          <h1>WELCOME ✨✨✨</h1>
          <h1>Login page</h1>
        <div className="main-outer">
          <h1>login here</h1>
        <div className="name">
            <span>Phone Number:</span>
            <input type="number"
            inputmode="numeric" placeholder='Phone 
            Number' className='phone' onChange={(e)=>{
setPhone(e.target.value)
            }} />
            </div> 
        <div className="password">
            <span>Password:</span>
            <input type="text" placeholder='Password'  onChange={(e)=>{
              setPassword(e.target.value)
            }}/>
             
            </div>

            <div className='wrongpassword' >
              {a()}
               </div>

<div className='buttoncontainer'>


            <button  className='butto'
            id='btn' onClick={()=>{

                 Axios.post("http://localhost:3001/login", {
                  phone:phone,
                   password:password,
                  }
                  ).then((response) =>{
                    if ((response.data).length===0){
                      console.log("eror")
                      setFindid(false)
                    
                      
                    }
                    else{
                      console.log(response.data)
                    
                        setFindid(true)
                      
                        b2(response.data[0])
                    console.log(b)
                    Navigate('/home')
                    }
                  })
                  
               
                }}>Login</button>


       
              <button className='link-button' onClick={()=>{
                // console.log(b.phone ==undefined)
                Navigate('/signup')
              }}>Signup</button>



           
            {/* </Link> */}


            </div>
            </div> 
               </div>
    )
}
