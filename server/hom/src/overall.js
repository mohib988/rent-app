import React from 'react'
import './overall.css'
import {useProductNow1} from "./getevery.js"
import {useContextNow} from "./getevery.js"
import { useNavigate } from 'react-router-dom'
export default function Overall(props) {
    const navigate=useNavigate()
    let   [producttoopen,setProducttoopen]
    =useProductNow1()
    const userinfo=useContextNow()
  return (
    <div className='overall'>
        <h1 className='topproduct'>Top products</h1>
        <h1>Vehicles</h1>
<div className="shortvehicles">
{props.product1.slice(0,5).map((k,i)=>{
  return <div className="one-product"
    id={i} key={i} onClick={()=>{ 
        setProducttoopen(k) 
        return  navigate('/oneproduct')}}
        > 
    {userinfo.user_id===k.user_id? <div style={{color:"white",fontSize:'2vh'}}>My product</div>:''}
    
<div className="product-img" > 
<img src={'/uploads/'+k.picture} alt="j" /></div>

    <p className="p1">Name:{k.Product_name}</p>
    <p className="p2">Price per day: Rs. {k.price}</p>
    <p>Ratings: &nbsp; &nbsp; <span>{' '}</span>  
    {Array(parseInt(k.rating/k.total_rate)).fill().map((i,j)=>{return <span className='star' key={j}>⭐</span>
    })
}
</p> 
    </div>
})}
</div>

<h1>Electronics</h1>
<div className="shortelectronics">
{props.product2.slice(0,5).map((k,i)=>{
  return <div className="one-product"
    id={i} key={i} onClick={()=>{ 
        setProducttoopen(k) 
        return  navigate('/oneproduct')}}
        > 
    {userinfo.user_id===k.user_id? <div style={{color:"white",fontSize:'2vh'}}>My product</div>:''}
    
<div className="product-img" > 
<img src={'/uploads/'+k.picture} alt="j" /></div>

    <p className="p1">Name:{k.Product_name}</p>
    <p className="p2">Price per day: Rs. {k.price}</p>
    <p>Ratings: &nbsp; &nbsp; <span>{' '}</span>  
    {Array(parseInt(k.rating/k.total_rate)).fill().map((i,j)=>{return <span className='star' key={j}>⭐</span>
    })
}
</p> 
    </div>
})}
</div>
<h1>Houses and Households</h1>
<div className="shorthouses">
{props.product3.slice(0,5).map((k,i)=>{
  return <div className="one-product"
    id={i} key={i} onClick={()=>{ 
        setProducttoopen(k) 
        return  navigate('/oneproduct')}}
        > 
    {userinfo.user_id===k.user_id? <div style={{color:"white",fontSize:'2vh'}}>My product</div>:''}
    
<div className="product-img" > 
<img src={'/uploads/'+k.picture} alt="j" /></div>

    <p className="p1">Name:{k.Product_name}</p>
    <p className="p2">Price per day: Rs. {k.price}</p>
    <p>Ratings: &nbsp; &nbsp; <span>{' '}</span>  
    {Array(parseInt(k.rating/k.total_rate)).fill().map((i,j)=>{return <span className='star' key={j}>⭐</span>
    })
}
</p> 
    </div>
})}
</div>
<h1>Sports</h1>
<div className="shortsports">
{props.product4.slice(0,5).map((k,i)=>{
  return <div className="one-product"
    id={i} key={i} onClick={()=>{ 
        setProducttoopen(k) 
        return  navigate('/oneproduct')}}
        > 
    {userinfo.user_id===k.user_id? <div style={{color:"white",fontSize:'2vh'}}>My product</div>:''}
    
<div className="product-img" > 
<img src={'/uploads/'+k.picture} alt="j" /></div>

    <p className="p1">Name:{k.Product_name}</p>
    <p className="p2">Price per day: Rs. {k.price}</p>
    <p>Ratings: &nbsp; &nbsp; <span>{' '}</span>  
    {Array(parseInt(k.rating/k.total_rate)).fill().map((i,j)=>{return <span className='star' key={j}>⭐</span>
    })
}
</p> 
    </div>
})}
</div>
<h1>Others</h1>
<div className="shortothers">
{props.product5.slice(0,5).map((k,i)=>{
  return <div className="one-product"
    id={i} key={i} onClick={()=>{ 
        setProducttoopen(k) 
        return  navigate('/oneproduct')}}
        > 
    {userinfo.user_id===k.user_id? <div style={{color:"white",fontSize:'2vh'}}>My product</div>:''}
    
<div className="product-img" > 
<img src={'/uploads/'+k.picture} alt="j" /></div>

    <p className="p1">Name:{k.Product_name}</p>
    <p className="p2">Price per day: Rs. {k.price}</p>
    <p>Ratings: &nbsp; &nbsp; <span>{' '}</span>  
    {Array(parseInt(k.rating/k.total_rate)).fill().map((i,j)=>{return <span className='star' key={j}>⭐</span>
    })
}
</p> 
    </div>
})}
</div>

    </div>
  )
}
