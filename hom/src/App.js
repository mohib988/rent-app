import './App.css';
import Home from "./Home.js"
import React from "react";
import Login from './login.js';
import Signup from './Signup.js'
import { useState ,useEffect} from 'react';
import { Route, Routes,} 
from "react-router-dom";
import Product from './product.js';
import Overall from './overall.js';

import Oneproduct from './oneproduct.js';
import Axios from 'axios';
import Uploadyourproduct from './uploadyourproduct.js';
import Yourproduct from './yourproduct.js';
import { useContextNow,useSearchProduct,RefreshNow } from './getevery';
function App() {


  // setA({})
 const  userinformation=useContextNow()
  const [productonload,setProductonload]=useState({})
  const [yourproduct1,setYourproduct1]=useState({})
  const [c1,setC1]=useState({})
  const [c2,setC2]=useState({})
  const [c3,setC3]=useState({})
 
  const [c4,setC4]=useState({})
  const [c5,setC5]=useState({})
  const[displaysearchproduct,setDisplayseachproduct]=useSearchProduct()
const [refresh,setRefresh]=RefreshNow()
function category(a){
  Axios.post("http://localhost:3001/selectcategory",{category:a}
    ).then((response) =>{
if (a==='c1'){
  setC1(response.data)
}
if (a==='c2'){
  setC2(response.data)
}
if (a==='c3'){
  setC3(response.data)
}
if (a==='c4'){
  setC4(response.data)
}
if (a==='c5'){
  setC5(response.data)
}

    })

}
  const product=async()=>{
    await Axios.get("http://localhost:3001/product"
    ).then((response) =>{
     
      setProductonload(productonload=>response.data)
    })
  }


  function yourproduct(a){
    Axios.post("http://localhost:3001/yourproduct",{user_id:a}
    ).then((response) =>{
     
      setYourproduct1(yourproduct1=>response.data)
  
    })
  }

  useEffect(() => {
    category('c1')
    category('c2')
    category('c3')
    category('c4')
    category('c5')
    setDisplayseachproduct({})
    product()
 },[refresh])
  
  useEffect(() => {
yourproduct(userinformation.user_id)

  },[userinformation.user_id,refresh])
  return (
    
    <>
    <div className="App">
     
          {/* <Home/> */}
        
    <Routes>
     
        
        <Route path="/home" caseSensitive={false} element={<Home  productonload={productonload}/>} >
          
        <Route path="" caseSensitive={false} element={<Overall product1={c1}  product2={c2}  product3={c3} product4={c4} product5={c5}  />} />
        <Route path="Vehicles" caseSensitive={false} element={<Product product={c1} />} />

    
<Route path="Electronic" caseSensitive={false} element={<Product  product={c2} />} />



<Route path="Houses" caseSensitive={false} element={<Product product={c3}/>} />
<Route path="Sports" caseSensitive={false} element={<Product product={c4}/>} />
<Route path="Others" caseSensitive={false} element={<Product product={c5}/>} />

<Route path="p4" caseSensitive={false} element={<Product product={displaysearchproduct}/>} />


        </Route>
        <Route path="/login" caseSensitive={false} element={<Login />} />

        <Route path="/oneproduct" caseSensitive={false} element={<Oneproduct productonload={productonload} />} />


        <Route path="/Signup" caseSensitive={false} element={<Signup/>} />

        <Route path="/uploadyourproduct" caseSensitive={false} element={<Uploadyourproduct/>} />
        <Route path="/yourproduct" caseSensitive={false} element={<Yourproduct yourproduct={yourproduct1} productonload={productonload}/>} />

    </Routes>
   

    
      
    </div>
    </>
  );
}

export default App;
