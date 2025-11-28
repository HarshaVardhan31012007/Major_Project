const express=require('express');
const app=express();
const cookieParser=require('cookie-parser');
app.use(cookieParser("secretcode"));
app.listen(3000,()=>{
    console.log('this is listening...');
});
app.get('/',(req,res)=>{
    res.send('hero');
});
app.get('/greet',(req,res)=>{
    let {name="anonymous"} =req.cookies;
    res.send(`Hi ${name}`);
});
app.get('/signedcookies',(req,res)=>{
      res.cookie("made-in","India",{signed:true});
      res.send('made-in india cookie sent');
});
app.get('/verify',(req,res)=>{
    if(req.signedCookies["made-in"])
    res.send('verified');
    else
    res.send("not verified")
});
app.get('/getcookies',(req,res)=>{
    res.cookie('greet','hello');
    console.dir(req.cookies);
    res.send('sent you some cookies');
});