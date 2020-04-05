console.log("clint side server has started")


let weatherform=document.querySelector("form")
//here is to selecct the input 
let search=document.querySelector("input")

   //to access the content of the paragraph
   let  messageOne=document.querySelector("#message-1")
   let  messageTwo=document.querySelector("#message-2")
   let messageThree=document.querySelector("#message-3")
   let messageFour=document.querySelector("#message-4")
   let messageFive=document.querySelector("#message-5")
   let messageSix=document.querySelector("#message-6")


weatherform.addEventListener("submit",(event)=>{
    event.preventDefault()
    //to extract the value present in the search bar
    let location=search.value

    messageOne.textContent="Loading.... "
    messageTwo.textContent=" "
    messageThree.textContent=" "
    messageFour.textContent=" "
    messageFive.textContent=" "
    messageSix.textContent=" "

//here is the code to fetch the data for the location provided
fetch("/weather?address="+location).then((response)=>{
    
        response.json().then((data)=>{
            if(data.error){
                messageOne.textContent=data.error
               
            }else{
                messageOne.textContent='location :'+data.location
                messageTwo.textContent="Summary :"+data.Summary
                messageThree.textContent="Current Temperature : "+data.temperature
                messageFour.textContent="Rain Probablity : "+data.rainProbablity
                messageFive.textContent="Minimum Temperature : "+data.minTemp
                messageSix.textContent="Maximum Temperature : "+data.maxTemp
              
            }
 
        })
}) 
})