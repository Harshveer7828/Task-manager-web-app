var express = require('express');
var router = express.Router();
const userModel=require('./users');
const passport=require('passport');
const localStrategy=require("passport-local");
passport.use(new localStrategy(userModel.authenticate()));

/* GET home page. */
router.get('/',async function(req, res, next) {
  const user = await userModel.find();
  res.render('index',{user});
});

router.post('/details',async function(req, res, next) {
  const userMessage=await userModel.create({
    username:req.body.username,
    email:req.body.email,
    message:req.body.message,
  });
  const user = await userModel.find();

  res.redirect('/');
});

// deleting a task form the database
router.get('/delete/:id',async function(req, res, next){
  const user = await userModel.findOneAndDelete({_id:req.params.id});
  res.redirect('/');
});

// updating the task in the database
router.get("/update/:id", async function (req, res, next) {
  const user = await userModel.findOne({_id: req.params.id});
  res.render("update", {user});
});

router.post("/update/:id", async function (req, res, next) {
  const user = await userModel.findOneAndUpdate({_id: req.params.id}, {username: req.body.username, message: req.body.message, email: req.body.email});
  res.redirect("/");
});



//passport essential code for it to work.

router.get('/profile',isLoggedIn,function(req,res){
  res.send("welcone profile");
});

router.post('/register',async function(req,res){
  let userdata= new userModel({
    username:String,
    secret:String,
  });
  userModel.register(userdata,req,body.password)
  .then(function(registerreduser){
    passport.authenticate("local")(req,res,function(){
      res.redirect('/profile');
    });
  });

});
router.post('/login',passport.authenticate("local",{
  successRedirect:"/profile",
  failureRedirect:"/login",
}),function(req,res){})

router.get('/logout',function(req,res,next){
  req.logOut(function(err){
    if(err) next(err);
    res.redirect('/');
  })
})

function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/');
}
module.exports = router;
