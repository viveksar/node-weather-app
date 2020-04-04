console.log("clint side server has started")


let weatherform=document.querySelector("form")
//here is to selecct the input 
let search=document.querySelector("input")

   //to access the content of the paragraph
   let  messageOne=document.querySelector("#message-1")
   let  messageTwo=document.querySelector("#message-2")



weatherform.addEventListener("submit",(event)=>{
    event.preventDefault()
    //to extract the value present in the search bar
    let location=search.value

    messageOne.textContent="Loading.... "
    messageTwo.textContent=" "

//here is the code to fetch the data for the location provided
fetch("/weather?address="+location).then((response)=>{
    
        response.json().then((data)=>{
            if(data.error){
                messageOne.textContent=data.error
               
            }else{
                messageOne.textContent='location :'+data.location
                messageTwo.textContent="forecast:"+data.forecast
            
              
            }
 
        })
}) 
})