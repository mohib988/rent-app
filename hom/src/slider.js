import React from 'react'
import "./slider.css"



const ie=["https://thumbs.dreamstime.com/b/resource-rent-text-blackboard-business-concept-background-resource-rent-text-blackboard-197954256.jpg",

"https://media.istockphoto.com/vectors/rent-a-car-template-vector-id881699826?s=612x612",
"https://thumbs.dreamstime.com/b/rent-text-magnifiyng-glasses-yellow-desk-rent-text-magnifiyng-glasses-yellow-desk-197283879.jpg" ]




function Slider() {
    
  return (
    <>
    <div className="bo">
    <div className="slider">
        
    <div  className="img-slider">
    {
    ie.map((k,j)=>{  
    return <img src={k} key={j} alt=""/>})}
    </div>
    
       
    </div>
    <div className='bt'>


      <button></button>
  <button></button>
  <button></button>
    </div>
    </div>
    </>
  )
}
export default Slider;