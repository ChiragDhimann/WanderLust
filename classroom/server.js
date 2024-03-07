const express=require("express");
const app=express();
const session=require("express-session");
const flash=require("connect-flash");
const path=require("path");

app.set("views engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.listen(3000,(req,res)=>{
    console.log("req on 3000 port");
})

const sessionOption={secret: "secretcode", resave:true, saveUninitialized:true}

app.use(session(sessionOption));
app.use(flash());

app.use((req,res,next)=>{
    res.locals.errorMsg=req.flash("error");
    res.locals.successMsg=req.flash("success");
    next();
})

app.get("/register",(req,res)=>{
    let {name="anonyms"}=req.query;
    req.session.name=name;
    if(name==="anonyms"){
        req.flash("error","not registerd");
    }else{
    req.flash("success","created succesfully");
    }
    res.redirect("/hello"); 
})

app.get("/hello",(req,res)=>{
    
    res.render("show.ejs",{name:req.session.name });
})

// app.get("/test",(req,res)=>{
//     if(req.session.count){
//         req.session.count++;
//     }else{
//         req.session.count=1;
//     }
//     res.send(`you are requested on ${req.session.count} `);
// })

