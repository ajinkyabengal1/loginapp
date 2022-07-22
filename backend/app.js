const express = require("express");
const app = express();
const  cors = require("cors");
app.use(cors());
const bcrypt= require("bcryptjs");
const mongoose= require("mongoose")
app.use(express.json());
const jwt = require("jsonwebtoken")

const jwt_secret = "hgdfjhgwaiaifgfgfiewugfiwfiuw3247376357685439872498447"

const mongoUrl= "mongodb+srv://ajinkya:ajinkya@cluster0.otdlyqx.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(mongoUrl,{
    useNewUrlParser:true
}).then(()=>{
  console.log("connected to database");  
})
.catch(e=>console.log(e));

//post userDeatils
require("./userDetails")
const User = mongoose.model("UserInfo");

app.post("/register",async (req,res)=>{
    const {fname, lname, email, password} = req.body;
    const encryptedPass= await bcrypt.hash(password, 10)
    try {
        const Olduser = await User.findOne({email});
        if(Olduser){
          return  res.send({error: "User Alredy Exist"})
        }
        await User.create({
            fname,
            lname,
            email,
            password: encryptedPass,
        });
        res.send({status:"ok"});
    } catch (error) {
        res.send({status:"error"});
    }
});

// login api
app.post("/login-user", async(req,res)=>{
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(!User){
        return  res.json({error: "User Not Exist"})
      }
      if (await bcrypt.compare(password, user.password)){
        const token = jwt.sign({email: user.email}, jwt_secret);
        if(res.status(201)){
            return res.json({status:"ok", data:token})
        }else{
            return res.json({status:"error"})
        }
      }
      res.json({status:"error", error:"Incorrect password"})
})

// api to get userData
app.post("/userData", async (req, res) => {
    const { token } = req.body;
    try {
      const user = jwt.verify(token, jwt_secret);
      console.log(user);
  
      const useremail = user.email;
      User.findOne({ email: useremail })
        .then((data) => {
          res.send({ status: "ok", data: data });
        })
        .catch((error) => {
          res.send({ status: "error", data: error });
        });
    } catch (error) {}
  });

app.listen(6969,()=>{
    console.log("Server Started Successfully !");
});

