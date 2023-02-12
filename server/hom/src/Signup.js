import React from 'react'
import { useReducer ,useState,useRef} from 'react';
import './signup.css'
import {useNavigate } from "react-router-dom";
import Axios from 'axios'
export default function Signup() {


const [gender,setGender]=useState(-1)
const navigate=useNavigate()
  const reducer=(state,action)=>{
  switch (action.type){
  case 'name':{
  return {...state,name:action.payload}
  }
  case 'password':{
  return {...state,password:action.payload}
  }
  case 'repassword':{
  return {...state,repassword:action.payload}
  }
  
  
  case 'address':{
  return {...state,address:action.payload}
  }
  case 'email':{
  return {...state,email: action.payload}
  }
  case 'phone':{
  return {...state,phone: action.payload}
  }
  case 'age':{
  return {...state,age: action.payload}
  }
  case 'country':{
  return {...state,country: action.payload}
  }
  default:
  return{...state}
  
  
  }
  
  }
  let initialstate={
    name:'',
    password:'',
    repassword:'',
    address:'',
    email:'',
    phone:'',
    age:0,
    country:'',

  }
  const [state,dispatch]=useReducer(reducer,initialstate)

  const [checkallinput,SetCheckallinput]=useState(true)
  const [signupmessage,setSignupmessage]=useState(false)

const fullinitializer=(e,tg)=>{
  
    dispatch({type:tg, payload: e.target.value})

console.log(e.target.value)



  }
  const error=()=>{
if(!checkallinput){
  return <p>error please fill correct form</p>}
  if (signupmessage===true){
    return <p style={{color:'green'}}>Sign Up Successfull</p>  
  }
}

  
 
 
  const passwordcheck=(a)=>{
    
  
    const format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
var format1=/[0-9]/
    if(format.test(a)  && a.length>7 && format1.test(a)){
        return '✔';
    } else {
      return '';
    }

  }
  

  
  const repasswordcheck=(a)=>{
    if(a===state.repassword && state.password!=='')
  return '✔'

  }
  const numbercheck=(ab)=>{
    if(ab.length>10  &&  ab.length<12){
  return '✔'
    }
  }

  return (


    <div className="signup">
      <h1>Sign Up Page</h1>
    <div className='Signuppage'>

<div className="inputblock">
  <div>Name</div><input type="text"  onChange={(e)=>fullinitializer(e,'name')}/>
  <hr />
  </div>
<div className="inputblock inputpassword">
  <div>Password</div><input type="text"  onChange={(e)=>fullinitializer(e,'password')}/><span>{passwordcheck(state.password)
}</span>
<hr /> 
<p style={{fontSize:'9px'}}>password must contain special character and number and must be greater than 7 letter  </p>
  </div>
<div className="inputblock">
  <div>repeat-Password</div><input type="text" onChange={(e)=>fullinitializer(e,'repassword')}/><span>{repasswordcheck(state.password)}</span>
<hr /> 

  </div>
<div className="inputblock">
  <div>gmail account</div><input type="text" onChange={(e)=>fullinitializer(e,'email')}/>
<hr /> 
  </div>
<div className="inputblock">
  <div>age</div><input type="number" onChange={(e)=>fullinitializer(e,'age')}/>
<hr /> 
  </div>
<div className="inputblock">
  <div>country</div><input type="text" onChange={(e)=>fullinitializer(e,'country')}/>
<hr /> 
  </div>
<div className="inputblock">
  <div>address</div><input type="text" onChange={(e)=>fullinitializer(e,'address')}/>
<hr /> 
  </div>
<div className="inputblock">
  <div>phone Number</div><input type="text" onChange={(e)=>fullinitializer(e,'phone')}/><span>{numbercheck(state.phone)}</span>
<hr /> 

  </div>
<div className="inputblock">
  <label htmlFor="radio-one">Male</label>
<input type="radio" name="gender"  onChange={()=>{
  setGender(1)
}
}
   value="male" id="radio-one" />
  <label htmlFor="radio-two">Female</label>
<input type="radio" name="gender" onChange={()=>{
  setGender(0)
}
}
   id="radio-two" value="female"/>
<hr /> 

  </div>
  


  
<div className='error'>{error()}</div>

<div className="signupbutton">



  <button onClick={()=>{
    if
( state.name!=='' && state.password!=='' && state.repassword!=='' && state.address!=='' && state.phone!=='' && state.email!=='' && state.password===state.repassword && passwordcheck(state.password)==='✔'  && numbercheck(state.phone)==='✔' && state.age>=0 && gender >-1 && state.country!==''){  
  
  Axios.post("http://localhost:3001/signup", {
                    name: state.name,
                    password:state.password,
                    address: state.address,
                    email:state.email,
                    phone:state.phone,
                    age:state.age,
                    gender:gender,
                    country:state.country
                  }).then(() =>{
                    console.log("yess")
                    SetCheckallinput(true)
                    setSignupmessage(true)
                    navigate("/login")
                    
                  })
                 }
                  else{
                    console.log(gender)
                      SetCheckallinput(false)
                  }
                }}>signup</button>

              
                </div>
                </div>
                </div>
                )
              }
              