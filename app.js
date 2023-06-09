//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let Object = [];

app.get("/",function(req,res){
  res.render("home",{para1: homeStartingContent,para4: Object})
  // console.log(Object)
})

app.get("/about",function(req,res){
  res.render("about",{para2: aboutContent})
})

app.get("/contact",function(req,res){
  res.render("contact",{para3: contactContent})
})

app.post("/compose",function(req,res){
  // let text = req.body.textbox
  // let text1 = req.body.textarea
  // compose_text.push(text)
  // console.log(compose_text)
  // console.log(text1)

  const obj = {                    // Object
    title: req.body.textbox,
    body: req.body.textarea
  };
  Object.push(obj)
  res.redirect("/")
})

app.get("/compose",function(req,res){
  // res.render("compose",{compose_para: compose_text})
  res.render("compose")
})

app.get('/posts/:name', function(req, res){
  let postsName = _.lowerCase(req.params.name);        // lodash   
  console.log(postsName);
  Object.forEach(element =>{  
    
    let post_title; let post_body;
    if(_.lowerCase(element.title) === postsName){
      console.log("match found")

      post_title = element.title;
      post_body = element.body;
      res.render("post",{para5: post_title, para6: post_body})
    }
    else{
      console.log("match not found")
    }
    
  })
})












app.listen(3000, function() {
  console.log("Server started on port 3000");
});
