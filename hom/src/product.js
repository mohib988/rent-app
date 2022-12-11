import React from 'react'
import "./product.css"

import { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {useContextNow} from "./getevery.js"
import {useProductNow1} from "./getevery.js"


export default function Product(props)
{
    const navigate=useNavigate()
    const  [Basket,setBasket] =useState();
    
    const userinfo=useContextNow()
    // const openit= (k)=>{
        //     console.log(k)
        
    // }
    
    // let b=useContextNow()
    // let   producttoopen=useProductNow2()
    let   [producttoopen,setProducttoopen]=useProductNow1()
//   setProducttoopen(props.product[0])
    

    return (
        <>
        {
        (props.product.length!==0 )  ? <div className="product">
{props.product.map((k,i)=> 
  
<div className="one-product"  id={i} key={i} onClick={()=>{
    
    setProducttoopen(k)
    
    return  navigate('/oneproduct')
    //    setBasket(k)
}
}
>
    {userinfo.user_id===k.user_id? <div style={{color:"white",fontSize:'2vh'}}>My product</div>:''}
    
<div className="product-img" > 
<img src={'/uploads/'+k.picture} alt="j" /></div>
    <p className="p1">Name:{k.Product_name}</p>
    <p className="p2">Price per day: Rs. {k.price}</p>
    <p>Rateings: &nbsp; &nbsp; <span>{' '}</span>  
    {Array(parseInt(k.rating/k.total_rate)).fill().map((i)=>{return <span className='star'>⭐</span>
    })
}
</p>
   
    </div>
)}
   </div> 
   : <></>}
   </>
  )}
