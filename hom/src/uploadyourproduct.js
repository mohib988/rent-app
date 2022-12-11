import React from 'react'
import { useReducer ,useState,useRef} from 'react';
// import './signup.css'
import './upload.css'
import {useNavigate } from "react-router-dom";
import Axios from 'axios'
import {useContextNow,RefreshNow} from './getevery.js'


export default function Uploadyourproduct() {
const setcategory=useRef()
const 
userinformation=useContextNow()
const [refresh,setRefresh]=RefreshNow()
const navigate=useNavigate()
  const reducer=(state,action)=>{
  switch (action.type){
  case 'name':{
  return {...state,name:action.payload}
  }
  case 'description':{
  return {...state,description:action.payload}
  }
  case 'price':{
  return {...state,price:action.payload}
  }

  default:
  return{...state}
  
  
  }
  
  }
  let initialstate={
    name:'',
    description:'',
    price:0,


  }
  const [state,dispatch]=useReducer(reducer,initialstate)

  const [checkallinput,SetCheckallinput]=useState(false)


const fullinitializer=(e,tg)=>{
  
    dispatch({type:tg, payload: e.target.value})

console.log(e.target.value)



  }
  const error=()=>{
if(checkallinput){
  return <p>error please fill  form correctly</p>}
  

}

const [fileinfo, setFileinfo] = useState({
  file:[],
  filepreview:null,
 });

 const handleInputChange = (event) => {
  setFileinfo({
    file:event.target.files[0],
    filepreview:URL.createObjectURL(event.target.files[0]),
  }
);

}
const [isSucces, setSuccess] = useState(null);

  return (
    
    <div>

<div className="signup">
      <h1>Upload Product</h1>
    <div className='Signuppage'>

<div className="inputblock">
  <div>Name</div><input type="text"  onChange={(e)=>fullinitializer(e,'name')}/>
  <hr />
  </div>
<div className="inputblock inputpassword">
  <div>description</div><input type="text"  onChange={(e)=>fullinitializer(e,'description')}/>
<hr /> 

  </div>


<div className="inputblock">
  <div>price</div><input type="text" onChange={(e)=>fullinitializer(e,'price')}/>
<hr /> 
  </div>


  

<div className="selection">
  <label htmlFor="cars">Select Category</label>
<select name="cars" id="cars"  ref={setcategory}>
    
    <option value="null"></option>
    <option value="c1">Vehicle</option>
    <option value="c2">Electronic</option>
    <option value="c3">House</option>
    <option value="c4">Sports</option>
    <option value="c5">Others</option>
    </select>
</div>
{/* <hr />  */}
<div className='label1' >

<hr  />
<label 
className="choosefiletext" style={{color:"blue",fontSize:'0.5em'}}>Select Image:</label>
          <input type="file" className="form-control" name="upload_file"  onChange={handleInputChange} />
          </div>

<hr style={{height:'0.01em'}} /> 
<div className='error1'>{error()}</div>
<div className="signupbutton">


<button onClick={()=>{


if ( state.name!=='' && state.description!=='' && state.price!==0 && fileinfo.file.name !==undefined && setcategory.current.value!=='null'){
const formdata = new FormData(); 
formdata.append('avatar', fileinfo.file);
formdata.append('name',state.name);
formdata.append('price',state.price);

formdata.append('description',state.description);

formdata.append('user_id',userinformation.user_id);
formdata.append('category',setcategory.current.value);

// Axios.post()
Axios.post("http://localhost:3001/productupload", formdata,{   
        headers: { "Content-Type": "multipart/form-data" } 
})
.then(res => { 
  console.warn(res);
  if(res.data.success === 1){
    setSuccess("Image upload successfully");
setRefresh(refresh+1)
navigate("/yourproduct")
    
  }

})
}
else{
SetCheckallinput(true)
}
}} className="uploadbtn"> upload</button>


{/* <button onClick={()=>{
  

    console.log()
  }}>see</button>
 */}


  
                </div>
                </div>
                </div>
    </div>
  )
}
