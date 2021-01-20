
let url ='https://fortniteapi.io/v1/shop?lang=en'
const API_Key='361618b4-f348534e-6616046c-7e87897f'


fetch(url, {method:'GET', 
headers: {'Authorization': API_Key}})
.then((result)=>{
 
   result.json().then(result=>{
 //add Daily Items
 //console.log('daily items id')
console.log(result)

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
nwHtml=nwHtml.replace('%star%',result.daily[i].interest.toFixed(1))

document.querySelector('.fortnite-db-store--daily').insertAdjacentHTML('beforeend', nwHtml);

 }


//add Featured items

//console.log('featured items id')
//console.log(result.featured[0].id)

 for(let i=0;i<=result.featured.length-1;i++)
 {
     var border=result.featured[i].rarity==='uncommon'?'handmade':result.featured[i].rarity;

 
var  html=`<a href="/details?id=%id%" class="fortnite-db-item fortnite-db-item--%rarity% " id="%id%"><img loading="lazy" class="fortnite-db-item__image" src="%img%" alt="fortnite shop item" /><div class="fortnite-db-item__details"><div class="fortnite-db-item__name" >%name%</div><div class="fortnite-db-item__price"><img loading="lazy" src="https://cdn.thetrackernetwork.com/cdn/trackernetwork/3C7Avbucks.png" alt="2000 v-bucks" /> <span>%price%</span></div></div><div class="fortnite-db-item__rating"><i class="ion ion-star"></i> %star%</div></a>`;

newHtml=html.replace('%id%', result.featured[i].id);
// src of the image
newHtml=newHtml.replace('%img%',result.featured[i].image);
//change border style
newHtml=newHtml.replace('%rarity%',border);
newHtml=newHtml.replace('%name%',result.featured[i].name);
newHtml=newHtml.replace('%price%',result.featured[i].price);
newHtml=newHtml.replace('%star%',result.featured[i].interest.toFixed(1));

document.querySelector('.fortnite-db-store--weekly').insertAdjacentHTML('beforeend', newHtml);

 }


}).catch((e)=>{

 console.log(e)
})
   })

   //news
 url ='https://fortniteapi.io/v1/news?lang=en&type=br'
/* 
temp

fetch(url, {method:'GET', 
headers: {'Authorization': API_Key}})
.then((result)=>{
 
   result.json().then(result=>{



   })
})

*/
//add recent news
fetch(url, {method:'GET', 
headers: {'Authorization': API_Key}})
.then((result)=>{
 
   
   result.json().then(result=>{

      console.log(result)

      for(let i=0;i<result.news.length;i++)
      {
         var html=` <article class="trn-card trn-article "  itemscope="" itemtype="https://schema.org/Article"><div itemprop="publisher" itemscope="" itemtype="https://schema.org/Organization"><meta itemprop="name" style="font-size: 200%" content="The Tracker Network"><link itemprop="sameAs" href="https://thetrackernetwork.com" rel="publisher"><div itemprop="logo" itemscope="" itemtype="https://schema.org/ImageObject"><meta itemprop="url" content="https://cdn.thetrackernetwork.com/cdn/trackernetwork/EED7icon-120.png"></div></div><meta itemprop="headline" content="Fortnite will remain at 60 FPS on next-gen consoles"><meta itemprop="dateModified" content="11/2/2020 5:25:49 PM"><meta itemprop="mainEntityOfPage" content="https://fortnitetracker.com#"><div class="trn-article__hero trn-article__hero--image"><a  itemprop="url"><img src=%image%></a></div><div class="trn-card__content"><h1 class="trn-article__title"><a  itemprop="url">%title%</a></h1><div class="trn-article__details"><span class="trn-article__author" itemscope="" itemtype="https://schema.org/Person" itemprop="author"> <span itemprop="name" style="font-size:150%">%author%</span>,</span><time class="trn-article__time" itemprop="datePublished" datetime="%date%">%date%</time></div></div> </article> `

         var newHtml=html.replace('%image%',result.news[i].image)
         newHtml=newHtml.replace('%title%',result.news[i].title)
         newHtml=newHtml.replace('%author%',result.news[i].tabTitle+"  "+result.news[i].body)
         newHtml=newHtml.replace('%date%',result.news[i].date) 
         newHtml=newHtml.replace('%date%',new Date(result.news[i].date).toDateString())
         document.querySelector('.news').insertAdjacentHTML('beforeend', newHtml);
  
      }
    

   })
})

