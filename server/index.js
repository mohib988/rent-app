const express=require("express");
const app=express();
const mysql=require("mysql");
const cors = require("cors");
const path=require('path')
const multer = require('multer');
const { response } = require("express");
app.use(cors());
app.use(express.json());


const storage = multer.diskStorage({
  destination: path.join(__dirname, '../hom/public', 'uploads'),
  filename: function (req, file, cb) {   
      // null as first argument means no error
      cb(null, Date.now() + '-' + file.originalname )  
  }
})


const db=mysql.createConnection(

    {
        user:"root",
        host:"localhost",
        password:"",
        database:"mohib",
        multipleStatements:true
        


    }
)

app.post("/signup", (req, res) => {
  const name = req.body.name;
  const password = req.body.password;
  const address = req.body.address;
  const email = req.body.email;
  const phone = req.body.phone;
  const age = req.body.age;
  const gender = req.body.gender;
  const country = req.body.country;


let q1="insert into mb (phone) values (?);"
q1+="insert into user_info (name,password,address,email,phone,age,gender) values (?,?,?,?,?,?,?);"
q1+="insert into location(address,country) values(?,?)"


    db.query(
      q1,[phone,name,password,address,email,phone,age,gender,address,country],

     (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
    );
  }
    );

    app.post("/login", (req, res) => {
      const password = req.body.password;
      const phone = req.body.phone;
    

    db.query("SELECT m.user_id, m.phone,info.name,info.email,info.address FROM mb m,user_info info  WHERE m.phone=info.phone and info.password = ?  and m.phone=?",[password,phone], 
    (err, result) => {
      if (err) {
        console.log(err);
      }
       else {
        res.send(result);
        console.log(result)

      }
    })});

    app.get("/product", (req, res)  => {
    
     db.query("SELECT * FROM product order by rating desc", 
    (err, result) => {
      if (err) {
        console.log(err);
      }
       else {
         res.send(result);
      

      }
    })});


    app.post("/yourproduct", (req, res) => {
      const user_id=req.body.user_id
    
    db.query("SELECT * FROM product where user_id=?",[user_id], 
    (err, result) => {
      if (err) {
        console.log(err);
      }
       else {
        res.send(result);
        console.log('df')

      }
    })});

  


    app.post('/productupload', (req, res) => {	
      try {
          let upload = multer({ storage: storage}).single('avatar');

         upload(req, res, function(err) {
      
  
            if (!req.file) {
                  return res.send('Please select an image to upload');
              }
              // else if (err instanceof multer.MulterError) {
              //     return res.send(err);
              // }
              else if (err) {
                  return res.send(err);
              }
              const description=req.body.description
  
              const name=req.body.name
              const user_id=req.body.user_id
              const price=req.body.price
              const category=req.body.category
              const classifiedsadd = {
                image: req.file.filename,
                
        };
        db.query("INSERT INTO product(picture,Product_name,product_detail,price,user_id,category) values(?,?,?,?,?,?)", [classifiedsadd.image,name,description,price,user_id,category], (err, results) =>
               {  if (err) throw err;
                res.json({ success: 1 })      
                
                console.log(name)
              });  
              
            }); 
            
          }catch (err) {console.log(err)}
  })

app.post('/sendcomment',(req,res)=>{

  const user_id=req.body.user_id
  const comment=req.body.comment
  const product_id=req.body.product_id
  const private=req.body.private

db.query('insert into comment(product_id,comments,by_user_id,private) values(?,?,?,?)',[product_id,comment,user_id,private],(err, results) =>{
if(err){
  console.log(err)
}



})

})

app.post('/displaycomment',(req,res)=>{
  const product_id=req.body.product_id
  db.query("select c.comments ,c.private,info.name from comment c,mb m,user_info info where m.user_id=c.by_user_id  and m.phone=info.phone and c.product_id= ?  order by c.comment_id desc",[product_id],(err,results)=>{
    if(err){
    console.log(err)
  }
  else{
    res.send(results)

  }
}


)})

app.post('/productownerinfo',(req,res)=>{
  
  const product_id=req.body.product_id
  
  db.query('select info.name,info.address,m.phone,info.email,p.Product_name from mb m,product p,user_info info where p.user_id=m.user_id and m.phone=info.phone and p.product_id=?',[product_id],(err,results)=>{

    if(err){
      console.log(err)
    }
    else{
      res.send(results)
    }

  })
  
})

app.post('/usercomplain',(req,res)=>{
  const product_id=req.body.product_id
  const complain=req.body.complain
  const user_id=req.body.user_id
db.query('insert into complain(product_id,complains,complain_by_user_id) values(?,?,?)',[product_id,complain,user_id],(err,results)=>{
  if(err){
    console.log(err)
  }
 
})
})

app.put('/giverate1',(req,res)=>{
  const product_id=req.body.product_id
  const new_rate=parseInt(req.body.new_rate)
  const total_rate=req.body.total_rate
  db.query('update  product set rating=? ,total_rate=? where product_id = (?)',[new_rate,total_rate,product_id],(err,result)=>{
    
    if(err){
      console.log(err)
    }
  })
  
})
app.post('/request',(req,res)=>{
  const product_id=parseInt(req.body.product_id)
  const user_id=req.body.user_id
  const request_days=parseInt(req.body.request_days)
  db.query('insert into request(product_id,request_by_user_id,requested_days) values(?,?,?)',[product_id,user_id,request_days]
  ,(err,results)=>{
if(err){
  console.log(err)
}
})
})
app.post('/loadrequest1',(req,res)=>{
    const product_id=parseInt(req.body.product_id)
db.query('select r.request_by_user_id,info.name,r.product_id,r.requested_days from request r, mb m,user_info info where m.user_id=r.request_by_user_id and m.phone=info.phone and product_id=?',[product_id],(err,results)=>{
if(err){
  console.log(err)
}
else{
  res.send(results)
}
})
})

app.post('/loadyourrequest',(req,res)=>{
    const product_id=parseInt(req.body.product_id)
    const user_id=req.body.user_id
db.query('select request_status,requested_days from request where request_by_user_id=? and product_id=?',[user_id,product_id],(err,results)=>{
if(err){
  console.log(err)
}
else{
  res.send(results)
}
})
})
app.post('/itemtoget',(req,res)=>{
 
    const itemforsearch=req.body.itemforsearch;
db.query(`select * from product where Product_name like '%${itemforsearch}%' order by rating desc`,[itemforsearch],(err,results)=>{
if(err){
  console.log(err)
}
else{
  res.send(results)

}
})
})


app.put('/acceptrequest',(req,res)=>{
    const product_id=parseInt(req.body.product_id)
    const user_id=req.body.user_id
db.query('update request set request_status=? where request_by_user_id=? and product_id=?',['accepted',user_id,product_id],(err,results)=>{
if(err){
  console.log(err)
}
})
})


app.delete('/deleterequest/:user_id/:product_id',(req,res)=>{
    const product_id=parseInt(req.params.product_id)
    const user_id=req.params.user_id
db.query('delete from request  where request_by_user_id=? and product_id=? ',[user_id,product_id],(err,results)=>{
if(err){
  console.log(err)
}
})
})
app.delete('/removeproduct/:Product_Id',(req,res)=>{
    const product_id=parseInt(req.params.Product_Id)
db.query('delete from product  where  product_id=? ',[product_id],(err,results)=>{
if(err){
  console.log(err)
}
})
})


app.post("/selectcategory",(req,res)=>{

  const category=req.body.category
db.query(`select * from product where category like'${category}'order by rating desc`,(err,results)=>{
if(err){
  console.log(err)
}
else{
  res.send(results)
}

})
})

app.post("/rentinfo",(req,res)=>{

  user_id=req.body.user_id
  product_id=req.body.product_id
  requestdays=req.body.requestdays
db.query("insert into rent_info(by_user_id,product_id,rent_days) values(?,?,?)",[user_id,product_id,requestdays],(err,results)=>{
if(err){
  console.log(err)
}
})
})


app.listen(3001,()=>{
    console.log("here we are")
});
