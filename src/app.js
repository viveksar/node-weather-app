//here is the variable to manipulate about the path
let path=require("path")
let hbs=require("hbs")

let express=require("express")
let app=express()
let port=process.env.PORT || 3000

//to call the geocode and weatherfunctions here
let geocode=require('./utils/geocode')
let weatherfunction=require('./utils/weatherfunction')

app.set("view engine","hbs")

//code to join this page with other page in the other folder that is public
let otherdirpath=path.join(__dirname,'../public')
let partialsPath=path.join(__dirname,"../views/partials")
//set up static directry to serve
app.use(express.static(otherdirpath))
hbs.registerPartials(partialsPath)

//route for the home page
app.get("/",(req,res)=>{
    res.render("index",{
        name:"Vivek Saroha",
        title:"Weather app"
    })
})


//to get the input for the help command
app.get("/help",(req,res)=>{
 res.render("help",{
     title:"Help",
     message:"This is help page created by Vivek Saroha.",
     name:"Vivek Saroha"
 })
})


//to get the input for the about command
app.get("/about",(req,res)=>{
 res.render("about",{
     title:'About Me',
     name:"Vivek Saroha"
 })
})

//to give the weather command
app.get("/weather",(req,res)=>{
   //here is the code which must accpect the value of the location
   if(!req.query.address){
   return res.send({
       error:"You must give the address"
   })
  
  
  }
     //to call the geocode function
  geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
    if(error){
     return  res.send({
         error:error
     })
    }
  
    //here is the function to call weather function
  weatherfunction(latitude,longitude,(error,weatherdata)=>{
    if(error){
     return res.send(error)
    }else{
       
      let current=weatherdata.currently
      let anot=weatherdata.daily.data[0].summary
      res.send({
        address:req.query.address,
        location:location,
        forecast:"Today the summary is:"+anot+" The temperature outside is "+current.temperature+" and the probablity of rain is "+current.precipProbability+"."
     
    })
     
    }
    })
  })
  
})

app.get('/help/*',(req,res)=>{
    res.render("helperror",{
        name:"Vivek Saroha",
        title:"Help Error"
    })
})

//when none of input given by the user does not match with the above inputs
app.get("*",(req,res)=>{
  res.render("error",{
      name:"Vivek Saroha",
      title:"Error"
  })
})



//to start the server
app.listen(port,()=>{
    console.log("server has started on port "+ port)
})