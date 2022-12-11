import React from 'react'
import { useState } from 'react';
import "./na.css";
import {Link, useNavigate} from "react-router-dom"
import { useContextNow,useContextNow2,useSearchProduct } from './getevery';
import  Axios  from 'axios';




function Nav(props) {
  const navigate=useNavigate()
  const [value1, setValue1] = useState("");
  const [displaysearchproduct,setDisplayseachproduct]=useSearchProduct()
const b=useContextNow()
const setB=useContextNow2()
  const onChange = (event) => {
    setValue1(event.target.value);
  
  };
 function gotosearch(a){
  Axios.post("http://localhost:3001/itemtoget",{itemforsearch:a}).then((Response)=>{
  
  setDisplayseachproduct(Response.data)
  navigate("/home/p4")
} 
)
 }
  return (
    <div className="outer">
        <div className="img-src"
        onClick={()=>{
          navigate('/home')
        }}> 
            Rent </div>
            
        <div className="input-text">
            <input type="text" placeholder='Search here'  value={value1} onChange={onChange}/>
            
            <div className="search-tag" onClick={()=>{
gotosearch(value1)
 


            }}>🔍</
            div>
            <div className="dropdown">
            {(props.productonload)
            .filter((item) => {
              const searchTerm = value1.toLowerCase();
              const fullName = item.Product_name.toLowerCase();

              return (
                searchTerm &&
                fullName.startsWith(searchTerm) &&
                fullName !== searchTerm
              );
            })
         
            .map((item) => (
              <div
                className="dropdown-row"
                onClick={()=>{
                  setValue1(item.Product_name)
                  gotosearch(item.Product_name)
                }}
              >
                {item.Product_name}
              </div>
            ))}
            </div>
            </div>
      
            <div className="card">
            
              <div className="cards">
                   { 
               (b.name ===undefined)
                  ?
                  <>
                  <Link to='/signup'  className='signuplink'>
                <div className="one">
                  <span>register here</span>
                  <span>Sign In</span>
                  </div>
                  </Link>
                  <Link to='/login'  className='signuplink'>
                <div className="one">
                  <span>&nbsp;</span>
                  <span>Log In</span>
                  </div>
                  </Link>
                  </>
                  
                  
                  :
<>
                  <div className="one"> 
                    <span>Welcome</span>
                  <span>{b.name}</span>
                  </div>
      <Link to='/yourproduct' className='signuplink'>
      <div className="one">
      <span>Your Products</span>
      <span className='cart'>🛒</span>

      </div>
      </Link>
                <div className="one" onClick={()=>{
                  setB({})
                  navigate("/login")
                                    }}>
                  <span>&nbsp;</span>
                  <span>Log Out </span>
                  </div>
</>




}
              
                  
              </div>
            </div>
            </div>
  
)
}
export default  Nav;