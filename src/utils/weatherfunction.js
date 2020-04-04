let request=require("request")

//here is the function for the weather function
let weatherfunction=(latitude,longitude,callback)=>{
    //to call the url  here 
    let url=' https://api.darksky.net/forecast/c714ec885e8a110cca1df8a26530344f/'+latitude+','+longitude+'?lang=en'
    request({url,json:true},(error,{body})=>{
      if(error){
       callback("Unable to contact the server",undefined)
      }else if(body.error){
        callback("Unvalid location please enter another location",undefined)
      }else{
        callback(undefined,body)
      }
    })
    }

    module.exports=weatherfunction