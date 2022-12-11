import React from 'react'
import './yourproduct.css'
import { Link } from 'react-router-dom'
import {useProductNow1,RefreshNow} from "./getevery.js"
import  Axios  from 'axios'
import Nav from './na.js'
import { useNavigate } from 'react-router-dom'
import { useRef } from 'react'
export default function Yourproduct(props) {

  let   [producttoopen,setProducttoopen]=useProductNow1()
  const deletedisplay=useRef()
  const navigate=useNavigate()
  const [refresh,setRefresh]=RefreshNow()
  return (
    <>
    <Nav productonload={props.productonload}/>
    <header className='header'>
      <h1>Your Products</h1>      
      <Link to='/uploadyourproduct'>
      <h2 className='uploadyourproductlink'>Upload Product
</h2>
      </Link>
</header>

{

(props.yourproduct.length!==0) ?
      <div className='yourproduct'>
    
  
  {
  props.yourproduct.map((i)=>{
    return (<div className='youroneproduct' key={i.product_id}
    >
      <span className='deleteproduct' style={{top:'0'}} onClick={()=>{
deletedisplay.current.style.visibility="visible"
      }}>❌</span>
     
    <div className='yourproductimg' onClick={()=>{
setProducttoopen(i)
navigate("/oneproduct")
    }}><img src={'./uploads/'+i.picture} alt="fd" /></div>
    <div className='productname'><span>Name: </span>{i.Product_name}</div>
    <div className='productname'><span>Description: </span>{i.product_detail}</div>
    <div className='ratings'>
      <span>Ratings: </span>

    {Array(i.rating).fill().map((j)=> 
    <span key={j} className='star'>⭐</span>
    )}
    <div className='productcategory'><span> Category: </span>{i.category}</div>
    <div className='productcategory'><span> Price: Rs.</span>{i.price}</div>
    </div>
    <div className='checksurety' ref={deletedisplay}><h2>Are You Sure</h2>
<div className='deletebutton' >

<button onClick={()=>{
  const Product_Id=i.product_id
    Axios.delete(`http://localhost:3001/removeproduct/
     ${Product_Id}`).then((reponse)=>{
        console.log('ury')
        setRefresh(refresh+1)
      })
  
  deletedisplay.current.style.visibility="hidden"
}}>yes</button>

<button onClick={()=>{

return deletedisplay.current.style.visibility="hidden"
      }}>no</button>
</div>
</div>
  </div>
  
  )
  })}
    </div>
    : <h1 className='noproduct' >NO product..... Upload Now</h1>}


    </>
  )
}
