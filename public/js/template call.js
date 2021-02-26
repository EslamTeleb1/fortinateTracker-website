let url ='https://fortnite-api.com/v2/news'
const API_Key='6bcfb6943b53d46d2d2b7c7c36b96dcd7e9b5617'


fetch(url, {method:'GET', 
headers: {'Authorization': API_Key}})
.then((result)=>{
 
   result.json().then(result=>{


      

   })


}).catch((e)=>{
    
   console.log(e)
})