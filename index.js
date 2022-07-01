const  express = require("express");
const app = express();
const Blogs =require("./models/Blogs.js");
const path = require("path");
const ejs = require('ejs');


//getting path of public folder
const static_path= path.join(__dirname,"/public")

//getting path of views folder
const views= path.join(__dirname,"/views")

app.use(express.static(static_path));
app.use(express.static(views));
app.use(express.json());

app.set("view engine", "ejs");

const connectDB = require("./db/connection");
connectDB()


app.use(express.urlencoded({extended:false}));

// home and search 
app.get("/home",(req,res)=>
{
  if(req.query.category)
  {
    let user={};
    user = {category:req.query.category.split(',')};
    Blogs.find(user)
    .then(Blogs=>
    {
      if(!Blogs)
      {       
        console.log(`Error`)
      }
      else
      {  
        console.log(Blogs)
        res.render("blogs/category",{Blogs});
      }
    })
    .catch(err=>
    {
      console.log(`Error`)
    })
  }      
  else
  {
    Blogs.find()
    .then(Blogs=>
    {
      res.render("home",{Blogs})
    })
    .catch(()=>
    {
      console.log(`Error`)
    })
  }
})

app.get("/home/:id",(req,res)=>
{
  if(req.params.id)
  {
    const id = req.params.id;
    Blogs.findById(id)
    .then(Blogs=>
    {
      if(!Blogs)
      {
        console.log(`Error`)
      }
      else
      {
        res.render("blogs/blog",{Blogs})
      }
     }).catch(err=>{
      console.log(`Error`)
     })
 }
 else{
  console.log(`Error`)
 }
});

//show all blogs
app.get("/blogs", async (req, res) => {
  try {
    const blogs = await Blogs.find();
    res.render("blogs/blogs", { blogs });
  } catch (error) {
    console.log(`Oh No ERROR!`);
    res.send(error.message);
  }
});

//render create new blog page
app.get("/new", (req, res) => {
  res.render("blogs/new");
});

//create new blog
app.post("/home",(req, res) => {
  const { title, img,Author,CreatedDate,category,Description } = req.body;

  const blog = new Blogs({
    title,
    img,
    Author,
    CreatedDate,  
    category,
    Description,
  });

   blog.save().then(blogs=>{
    res.redirect("/blogs");
   }).catch(error=>{
    console.log(`Oh No ERROR!`);
    res.send(error.message);
  })
})

//show details page
app.get("/blogs/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const foundBlog = await Blogs.findById(id);

    res.render("blogs/blog", { foundBlog });
  } catch (error) {
    console.log(`Oh No ERROR!`);
    res.send(error.message);
  }
});

//edit blog form
app.get("/update", async (req, res) => {
  const id = req.query.id;
  const foundBlog = await Blogs.findById(id);
  res.render("blogs/update", { foundBlog });
});

//update route
app.post("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const foundBlog = await Blogs.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    console.log(foundBlog);
    res.redirect("/blogs");
  } catch (error) {
    console.log(`Oh No ERROR!`);
    res.send(error.message);
  }
});

//Delete blog
app.get("/delete/:id", async (req, res) => {
  try {
    await Blogs.findByIdAndDelete(req.params.id);
    res.redirect("/blogs");
  } catch (error) {
    console.log(`Oh No ERROR!`);
    res.send(error.message);
  }
});
app.listen(5500, () => {
  console.log("SERVER STARTED at 5500");
});