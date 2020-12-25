let url ='https://fortniteapi.io/v1/loot/list?lang=en'
const API_Key='edc47162-9716dc98-c724884c-58bb9cb9'

fetch(url, {method:'GET', 
headers: {'Authorization': API_Key}})
.then((result)=>{
 
   result.json().then(result=>{
console.log(result.weapons)
      result.daily=result.weapons
      for(let i=0;i<=result.daily.length-1;i++)
      {
         var border=result.daily[i].raritwy==='uncommon'?'handmade':result.daily[i].rarity;
     var html=`<a href="/details?id=%id%" class="fortnite-db-item fortnite-db-item--%rarity%" title="%title%"><img loading="lazy" class="fortnite-db-item__image" src="%img%" alt="fortnite shop item Whiteout" /><div class="fortnite-db-item__details"><div class="fortnite-db-item__name"><span >%name%</span></div><div class="fortnite-db-item__price"><img loading="lazy" src="https://cdn.thetrackernetwork.com/cdn/trackernetwork/3C7Avbucks.png" alt="1500 v-bucks" /><span >%price%</span></div></div><div class="fortnite-db-item__rating"><i class="ion ion-star" ></i> <span>%star%</span></div></a>`,
     
     nwHtml=html.replace('%id%', result.daily[i].id);
     // src of the image
     nwHtml=nwHtml.replace('%img%',result.daily[i].image);
     //change border style
     nwHtml=nwHtml.replace('%rarity%',border)
     nwHtml=nwHtml.replace('%name%',result.daily[i].name)
     nwHtml=nwHtml.replace('%title%',result.daily[i].name)
     nwHtml=nwHtml.replace('%price%',result.daily[i].price)
     //nwHtml=nwHtml.replace('%star%',result.daily[i].interest.toFixed(1))
     
     document.querySelector('.all-items').insertAdjacentHTML('beforeend', nwHtml);
     
      }

   })
})