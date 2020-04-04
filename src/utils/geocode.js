let request=require("request")

let geocode=(address,callback)=>{
    let request=require("request")
    geourl="https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1Ijoidml2ZWstczUyNTI1NCIsImEiOiJjazg0OHJseHMxaGVzM2ZwZ2Job3AzYjQxIn0.X3c7shFUeXCf_JoE-tg7zg&limit=1"
    
    request({url:geourl,json:true},(error,{body}={})=>{
    //if error is present
    if(error){
      callback("unable to connect your server",undefined)
   
    }else if(body.features.length===0){
     callback("unable to find your location try another location",undefined )
  
    }else{
      //to call the call back function with our data
      callback(undefined,{
        longitude:body.features[0].center[0],
        latitude:body.features[0].center[1],
        location:body.features[0].place_name
      })
    } 
    })
  }

  //to give this geocode to any other function
  module.exports=geocode