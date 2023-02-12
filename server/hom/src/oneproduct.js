import './oneproduct.css'
import {useState,useEffect,useRef  } from 'react'
import Nav from './na.js'
import { useProductNow1,useContextNow,RefreshNow } from './getevery'
import Axios  from 'axios'
export default function Oneproduct(props) {

const userinfo=useContextNow()
  const [comment,setComment]= useState([]);
  const showratebox=useRef()
  const sentrequestbutton=useRef()
  const [refresh,setRefresh]=RefreshNow()
  const dayscounter=useRef()
const alert=useRef()
  const showrequestbox=useRef()
  const acceptbutton=useRef()
  const deletebutton=useRef()
  const [typecomment,setTypecomment]= useState('');
  const [request,setRequest]= useState(0);
  const [yourrequest,setYourrequest]= useState([]);
  const [requestlist,setRequestlist]= useState([]);
  const [lastday,setLastday]= useState(-1);
  

  const [complain,setComplain]= useState('');
  const [text1,setText1]= useState('request for rent');
  const [onecomment,setOneComment]= useState('');
  const [product1,setProduct]
  =useProductNow1()
  const [ownerinfo,setOwnerinfo]=useState([])

  const [counterbtn,setCounterbtn]=useState(0)

  const [intervalId, setIntervalId] = useState(0);
  const starttime = () => {

    const newIntervalId = setInterval(() => {
      setCounterbtn(counterbtn => counterbtn + 1);
    }, 10000);
    setIntervalId(newIntervalId);
          if(intervalId==='2'){
            counterbtn(99)
           
          }
  };
 
  useEffect(() => {
    Axios.post('http://localhost:3001/displaycomment',{product_id:product1.product_id}).then((response)=>{
      setComment(response.data)
    })
    Axios.post('http://localhost:3001/productownerinfo',{product_id:product1.product_id}).then((response)=>{
      setOwnerinfo(response.data)
    }
    )
    
  }, [typecomment]);
 
  useEffect(
    ()=>{
    Axios.post('http://localhost:3001/productownerinfo',{product_id:product1.product_id}).then((response)=>{
      setOwnerinfo(response.data)
    }
    )

  },[product1])

  const giverate=(a)=>{
    
    Axios.put("http://localhost:3001/giverate1",{product_id:product1.product_id,new_rate:product1.rating+a,total_rate:(product1.total_rate+1)}).then((response)=>{
showratebox.current.style.visibility='hidden'
    })
  }
  
  
function rentinfo(){
Axios.post("http://localhost:3001/rentinfo",{requestdays:request,
product_id:product1.product_id,
user_id:userinfo.user_id})

}

function loadallcomments(a,b){
  Axios.post("http://localhost:3001/sendcomment",{product_id:product1.product_id,comment:a
  ,user_id:userinfo.user_id
,private:b}).then((response)=>{
      console.log('')
    })
}
//     function a(){
//     const myinterval=setInterval(()=>{ 
// let i=0
// i=i+1
// console.log(i)
// setCountnumber(i)
//       // setCounterbtn(countnumber)
   
//     }, 1000);
//     }
   useEffect(
    ()=>{
      Axios.post("http://localhost:3001/loadyourrequest",{product_id:product1.product_id,user_id:userinfo.user_id}).then((response)=>{

        setYourrequest(response.data[0])
        if(response.data.length!==0){
          if(response.data[0].request_status==='sent'
  ){
setText1('request sent')
}
if(response.data[0].request_status==='accepted'
){
  
  setText1('confirm')
  setLastday(response.data[0].requested_days)
}

  
if(text1==='request for rent' && response.data[0].request_status==='Accepted'){
  setCounterbtn(0)
}


}

})
    
},[])



const todeleterequest=(user_id,product_id)=>{
  Axios.delete(`http://localhost:3001/deleterequest/
  ${ user_id} / ${product_id}`,).then((reponse)=>{
      console.log('ury')
    })



}

useEffect(()=>{
 if(counterbtn==lastday){
 alert.current.style.visibility="visible"
 }
})


//   useEffect(() => {
// let  i=0
//     const interval = setInterval(() => {

//       document.getElementById('first').innerHTML=i+"day"
//       i=i+1
//     }, 60000);
  
//     return () => clearInterval(interval)
//   }, []);
  return (
    <>
  <Nav productonload={props.productonload}/>

    <div className='oneproduct'>
<div className="product-img" > 
<img src={'/uploads/'+product1.picture} alt="" /></div>
<div className="p1">
    <p id='p1'>{"Product Name: "+product1.Product_name}</p>
    <span>Ratings:</span>
    <br />
    {Array(parseInt(product1.rating/product1.total_rate)).fill().map((i)=>
    
    <span key={i}>⭐</span>
    )}
    <p ><h2>Product details: </h2>{product1.product_detail}</p>
    <p ><h2>Price per Day: </h2>{"Rs. "+product1.price}</p>
    </div>










<button className='rentnow' id='first' ref={sentrequestbutton} onClick={
  ()=>
{
  if(text1==='request for rent'
  && userinfo.user_id !==undefined){
     showrequestbox.current.style.visibility='visible'
  }
   if(text1==='confirm'){
    starttime()
rentinfo()
   setText1('return')
   
  }
  if(sentrequestbutton.current.innerText==='return'){
    setText1('request for rent')
    clearInterval(intervalId)
    setCounterbtn(0)
     todeleterequest(userinfo.user_id,product1.product_id)
     setCounterbtn(0)


  }
}
}>{text1}</button>

<div className="requestfilluppage" ref={showrequestbox}>
  <div className='crosssign' onClick={()=>{
    showrequestbox.current.style.visibility='hidden'
  }}>❌
  </div>
 <div className='inputtoenterdays'>input days for rent
  <input type="number"className='enterdays'  onChange={(e)=>{
    setRequest(e.target.value)
  }}/>
 </div>
<button onClick={()=>{

if(userinfo.user_id!==undefined && product1.user_id!==userinfo.user_id && request !== '' && text1==='request for rent' ){
  
 Axios.post('http://localhost:3001/request',{request_days:request,user_id:userinfo.user_id,product_id:product1.product_id}).then((response)=>{
console.log('df')
})
showrequestbox.current.style.visibility='hidden'
setText1('request sent')
}




}} >sent Request</button>
</div>


<button className='addtolater' ref={dayscounter}onClick={()=>{

// a()
console.log('h')
}}>{counterbtn}</button>

<div className="ratewindow" ref={showratebox}>
  <div className='crosssign' onClick={()=>{
    showratebox.current.style.visibility='hidden'
  }}>❌
  </div>
  <h1>Rates us </h1>
<div className="ratewindow2">
  <span>&nbsp;</span>
  {Array(5).fill().map((l,i)=>{
return <span  className="ratestars"onClick={()=>{giverate(i+1)
  setRefresh(refresh+1)
showratebox.current.style.visibility='hidden' }} key={i}>⭐</span>
  })}
</div>
</div>
<button className='ratesus' onClick={()=>{showratebox.current.style.visibility='visible'}}>Rates us </button>
<span className='complain'><button 
onClick={()=>{
  if(userinfo.user_id!==undefined && complain!==""){
  Axios.post('http://localhost:3001/usercomplain',{product_id:product1.product_id,complain:complain,user_id:userinfo.user_id})
  document.getElementById("complainid").value=""
}}}
className='complainbutton'>complain us </button></span>
<div className="textboxcontainercomplain">
    <textarea name="" id="complainid" cols="30" rows="30" 
    
    onChange={(e)=>{setComplain(e.target.value)}
    }>

      
    </textarea>
    </div>

   <div className="textboxcontainer">
    <span className='commentspan' >Comments:</span>
    <textarea name="" id="commentbox" cols="30" rows="30" 
    
    onChange={(e)=>{setOneComment(e.target.value)}
    }
    >

      
    </textarea>
    <button className='commentbutton' 
    
    onClick={()=>
      {
        if(userinfo.user_id!==undefined  && onecomment !== ''){
        setTypecomment(onecomment)
        loadallcomments(onecomment,0)
        document.getElementById("commentbox").value=""
    }
    }}
    >Enter</button>
    <button className='commentbutton' 
    
    onClick={()=>
      {
        if(userinfo.user_id!==undefined  && onecomment !== ''){
        setTypecomment(onecomment)
        loadallcomments(onecomment,1)
    }
    }}
    >Private Comments</button>
 
   </div>
      </div>
    <div className='Comment-heading'>
   <h1>Comment</h1>
   <div className='tocenter'>
   <div className='comment' > 
   <table className='table'>

{comment.map((i,j)=>{
  if(i.private===0){
    return <tbody key={j}>
  <tr>
    <td className='row-one'>{i.name}</td>
  </tr>
  <tr>
    <td className='row-two'>{i.comments}</td>
  </tr> 
  </tbody>
  }
  if(i.private===1 && userinfo.user_id===product1.user_id){
    return <tbody key={j}>
    <tr>
      <td className='row-one'>{i.name}</td>
    </tr>
    <tr>
      <td className='row-two'>{i.comments}</td>
    </tr> 
    </tbody>

  }
  
  
})}
</table>
   </div>
   
  {ownerinfo.map((i)=>{
return <div className='userinfo'>
  <h1>Onwer Info</h1>
<div className="owner_name">Product owner: <span className='span1'>{i.name}</span></div>

<div className="location"><span className='span1'>{'📍'+i.address}</span></div>

<div className="contact">📞 contact : &nbsp; &nbsp;<span className='span1'>{'0'+i.phone} </span></div>
<div className="contact">📧Email : &nbsp; &nbsp;<span className='span1'>{i.email} </span></div> 
 </div>
})}
</div>
   </div>
{ userinfo.user_id === product1.user_id ?
<>
   <div className='requestbox' onClick={()=>{
    let right1=document.getElementById('requestdropdown').style.right

    if(right1==='0px'){
      document.getElementById('requestdropdown').style.right='-20vw'
    }
    else{
      Axios.post("http://localhost:3001/loadrequest1",{product_id:product1.product_id    }
    ).then((response)=>{
setRequestlist(response.data)
console.log(response.data)
    })
    document.getElementById('requestdropdown').style.right='0px'
      
    }
   }}>
    <p className='totalrequest'>{requestlist.length}</p>
      <p> ------</p> 
      <p> ------</p> 
      <p> ------ </p> 
   </div>
   <div className='requestdropdown' id='requestdropdown'>
{requestlist.map((i,j)=>{

return <div key={j}className="eachrequest">{i.name +' resquest this product for '+i.requested_days +' days'}

<button  ref={acceptbutton}className='requestbutton'
onClick={()=>{
  if(acceptbutton.current.innerText==='accept'){

    Axios.put("http://localhost:3001/acceptrequest",{
      user_id:i.request_by_user_id,
      product_id:product1.product_id
    }).then((reponse)=>{
      console.log('ury')
    })
    acceptbutton.current.style.backgroundColor='green'
    acceptbutton.current.innerText='confirm'
    deletebutton.current.style.visibility='hidden'
    
  }

}}>accept</button>
<button className='requestbutton' ref={deletebutton}

onClick={()=>{
  todeleterequest(i.request_by_user_id,product1.product_id)  
  
}}
>cancel</button>
</div>
})}
   </div>
   </>

  : '' }
 <div className='Alert' ref={alert}>
  <h2>Please return the product</h2>
  <button onClick={()=>{
  alert.current.style.visibility="hidden"
  }}>Ok</button>
  </div>  

   
      </>
  )
}
