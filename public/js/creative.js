
let url ='https://fortniteapi.io/v1/creative/featured'
const API_Key='361618b4-f348534e-6616046c-7e87897f'


fetch(url, {method:'GET', 
headers: {'Authorization': API_Key}})
.then((result)=>{
 
   result.json().then((result)=>{
 

    //add listFeaturedCreativeIslands
    
      //  console.log(result)
    
    for(let i=0;i<=result.featured.length-1;i++)
        {
    var html=`<div class="trn-card fc-map"><div class="trn-card__hero"><img src="%img%" /><div class="fc-map__actions"><span class="fc-map__actions-code" onclick="window.getSelection().selectAllChildren(event.target); document.execCommand('copy')" >%code%</span></div></div><div class="trn-card__content fc-map__info"><div><h1 class="trn-title mb0 trn-title--large" style="text-transform: unset;"><a <--!href="/creative/1632-3365-6975"-->%title%</a></h1><h2 >Author: %creator%</h2><p class="trn-text--dimmed mb0">%description%</p></div><div class="fc-map__stats"></div></div></div>`,
    
      nwHtml=html.replace('%img%', result.featured[i].image);
      nwHtml=nwHtml.replace('%code%',result.featured[i].code);
      //change border style
      nwHtml=nwHtml.replace('%title%',result.featured[i].title)
      nwHtml=nwHtml.replace('%name%',result.featured[i].name)
      nwHtml=nwHtml.replace('%creator%',result.featured[i].creator)
      nwHtml=nwHtml.replace('%description%',"<span style='color :gold'>Intro : </span>"+result.featured[i].introduction +"<br> <span style='color :gold'>Description : </span> "+result.featured[i].description)
    
      document.querySelector('.fc-map-list').insertAdjacentHTML('beforeend', nwHtml);
    
        }

        // creation add 


    
    }).catch((e)=>{
    
        console.log(e)
    })})


   // add creation 

   'addCreation'
   'creationId'
   document.getElementById('addCreation').addEventListener('click',()=>{


    var code =document.getElementById('creationId').value;
    //console.log(code)
    if(!addCreation(code))
    {
        document.querySelector('.fc-map-list').innerHTML="Sorry ,Not FOUND try again :) "

    }

   })


   const addCreation =(code )=>{

    url =`https://fortniteapi.io/v1/creative/island?code=${code}`

fetch(url, {method:'GET', 
headers: {'Authorization': API_Key}})
.then((result)=>{
 
   result.json().then(result=>{

//console.log(result)

if(result.response==false)
 return false;

document.querySelector('.fc-map-list').innerHTML="";


var html=`<div class="trn-card fc-map"><div class="trn-card__hero"><img src="%img%" /><div class="fc-map__actions"><span class="fc-map__actions-code" onclick="window.getSelection().selectAllChildren(event.target); document.execCommand('copy')" >%code%</span></div></div><div class="trn-card__content fc-map__info"><div><h1 class="trn-title mb0 trn-title--large" style="text-transform: unset;"><a <--!href="/creative/1632-3365-6975"-->%title%</a></h1><h2 >Author: %creator%</h2><p class="trn-text--dimmed mb0">%description%</p></div><div class="fc-map__stats"></div></div></div>`,
    
nwHtml=html.replace('%img%', result.island.image);
nwHtml=nwHtml.replace('%code%',result.island.code);
//change border style
nwHtml=nwHtml.replace('%title%',result.island.title)
nwHtml=nwHtml.replace('%name%',result.island.name)
nwHtml=nwHtml.replace('%creator%',result.island.creator)
nwHtml=nwHtml.replace('%description%',"<span style='color :gold'>Intro : </span>"+result.island.introduction +"<br> <span style='color :gold'>Description : </span> "+result.island.description)

document.querySelector('.fc-map-list').insertAdjacentHTML('beforeend', nwHtml);
      

   })


}).catch((e)=>{
    
  return false
})
   }



