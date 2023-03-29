const express=require("express")
const app=express()
const bodyParser=require("body-parser")
const cookieParser=require("cookie-parser")
const jwt=require("jsonwebtoken");
const mongoose=require("mongoose")
const VoterModel=require("./models/voterModel")
const secret=require("./secret/secret")
const authenticate=require("./middleware/authenticate")
const dbURL="mongodb+srv://Admin:admin123@blockchainevoting.erz5x26.mongodb.net/ProjectDatabase?retryWrites=true&w=majority"
mongoose.connect(dbURL,{ useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
    console.log("Successfully connected to DB")
}).catch((err)=>{
    console.log(err);
})
// middleware
app.use(express.json())
app.use(cookieParser())

app.post("/createvoter",(req,res)=>{
    var voterModel=new VoterModel();
    voterModel.name=req.body.name;
    voterModel.voterID=req.body.voterID;
    voterModel.age=req.body.age;
    voterModel.gender=req.body.gender;
    voterModel.password=req.body.password;
    voterModel.save().then(()=>{res.status(200).send()}).catch((err)=>{console.log(error)});
})
app.post("/getvoterdetails",(req,res)=>{
    console.log(req.body.voterID);
    VoterModel.find({voterID:req.body.voterID}).then((data)=>{res.status(200).send(data)}).catch(err=>{console.log(err)});
})
app.post("/login",async (req,res)=>{
    console.log("in login")
    try {
        const user = await VoterModel.findOne({ name: "Jaishankar" });
        if (user.password == req.body.password) {
            console.log("Matched");
            const token = jwt.sign({ _id: user._id }, secret.pass);
            // console.log("TOKEN"+token);
            res.cookie("jwtoken", token, {
                maxAge: 1 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });
            res.status(200).send();
        } else {
          res.status(401).send();
        }
      } catch (err) {
        res.status(401).send();
      }
})
app.get("/isauth",authenticate,(req,res)=>{
    if(req.status=200){
        res.status(200).send();
    }
    res.status(401).send();
})
app.get("/logout",(req,res)=>{
    res.clearCookie("jwtoken",{path:"/"});
    res.status(200).send();
})
app.listen(3001,()=>{
    console.log("server is running");
})