
const url ='https://fortniteapi.io/v2/items/list?lang=en'
const API_Key='edc47162-9716dc98-c724884c-58bb9cb9'


fetch(url, {method:'GET', 
headers: {'Authorization': API_Key}})
.then((result)=>{
 
   result.json().then(function(result){

    const types=['backpack','bannertoken','bundle','contrail','cosmeticvariant','emoji','emote','glider','loadingscreen','music','outfit','pet','pickaxe','spray','toy','wrap']

    console.log(result.items)
        var pagination_container = document.getElementById("items-container");
       const showItems=(start,n)=>{
        for(let i=start;i<=n;i++)
        {
            var border= result.items[i].rarity==='uncommon'?'handmade': result.items[i].rarity;

            var html=`<a class="fortnite-db-item fortnite-db-item--large-text fortnite-db-item--%rarity% " style="grid-column: span 1;" href="/details?id=%id%" id="%id%"><img loading="lazy" class="fortnite-db-item__image" src="%img%" alt="fortnite shop item" /><div class="fortnite-db-item__details"><div class="fortnite-db-item__name" >%name%</div><div class="fortnite-db-item__price"><img loading="lazy" src="https://cdn.thetrackernetwork.com/cdn/trackernetwork/3C7Avbucks.png" alt="2000 v-bucks" /> <span>%price%</span></div></div><div class="fortnite-db-item__rating"><i class="ion ion-star"></i> %star%</div></a>`;
            //console.log(result.items[i])
            nwHtml=html.replace('%id%',  result.items[i].id);
            // src of the image
            if(result.items[i].images)
            nwHtml=nwHtml.replace('%img%', result.items[i].images.icon);
            //change border style
             nwHtml=nwHtml.replace('%rarity%',border)
            nwHtml=nwHtml.replace('%name%', result.items[i].name)
            nwHtml=nwHtml.replace('%title%', result.items[i].name)
            nwHtml=nwHtml.replace('%price%', result.items[i].price)
            //if(result.items[i].interest)
            nwHtml=nwHtml.replace('%star%', result.items[i].interest.toFixed(2)<=0?0:result.items[i].interest.toFixed(2))
             pagination_container.innerHTML+=nwHtml;
        }

       } 

     showItems(0,101)
     var nItems=100,start;
       document.getElementById('LoadMore').addEventListener('click',()=>{
        start=nItems+1
        nItems=start+12;

        showItems(start,nItems)
       })
       

}).catch((e)=>{

    console.log(e)
})


})