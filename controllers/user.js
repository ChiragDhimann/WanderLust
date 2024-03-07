const User=require("../models/user");


module.exports.signupRenderForm=(req,res)=>{
    res.render("users/signup.ejs");
}

module.exports.signup=async(req,res)=>{
    try{
    let {username,email,password}=req.body;
    // console.log(req.body);
    const newUser=new User({ email , username });
    // console.log(newUser);
    const registredUser=await User.register(newUser,password);
    // console.log(registredUser);
    req.login(registredUser,(err)=>{
        console.log("1");
        if(err){
            console.log("2");
            return next(err);
            console.log("3");
        }
        req.flash("success","Welcom on WanderLust");
        res.redirect("/listings");
    });
    }catch(err){
        req.flash("error",err.message);
        res.redirect("/signup");
    }
};

module.exports.renderLoginForm=(req,res)=>{
    res.render("users/login.ejs")
};

module.exports.login=async(req,res)=>{
    req.flash("success","Welcome back on WanderLust");
    res.redirect("/listings");
};

module.exports.logout=(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","you logged out!")
        res.redirect("/listings");
    })
};