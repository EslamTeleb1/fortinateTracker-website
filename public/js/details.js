
var qs = (function(a) {
    if (a == "") return {};
    var b = {};
    for (var i = 0; i < a.length; ++i)
    {
        var p=a[i].split('=', 2);
        if (p.length == 1)
            b[p[0]] = "";
        else
            b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
    }
    return b;
})(window.location.search.substr(1).split('&'));
let id =qs['id']
console.log(id)
const url =`https://fortniteapi.io/v1/items/get?id=${id}&lang=en`
const API_Key='361618b4-f348534e-6616046c-7e87897f'


fetch(url, {method:'GET', 
headers: {'Authorization': API_Key}})
.then((result)=>{
 
   result.json().then((result)=>{
 

    console.log(result);
    var border=result.item.rarity==='uncommon'?'handmade':result.item.rarity;
    
    var Html=`<div class="fortnite-db-item fortnite-db-item--%rarity%">
    <img class="fortnite-db-item__image" id='item-img' src="https://trackercdn.com/legacycdn/fortnite/9E415206_large.png" itemprop="image" alt="item from fortnite store" />`
    
    Html=Html.replace('%rarity%',border);
    const stars=result.item.interest.toFixed(1)<=0?0:result.item.interest.toFixed(1);
    
    document.getElementById('stars').style.width=`${stars*20>100?100:stars*20}%`
    
    document.querySelector('.borderAdd').insertAdjacentHTML('afterbegin', Html);
    
    document.getElementById('nmOfSales').textContent=result.item.shopHistory.length+" ";
    document.getElementById('item-nm').textContent=result.item.name;
    document.getElementById('item-nm1').textContent=result.item.name;
    document.getElementById('name').textContent=result.item.name+' - Fortnite Tracker';
    document.getElementById('rarity').textContent=result.item.rarity
    document.getElementById('item-category').textContent=result.item.type;
    document.getElementById('item-price').textContent=result.item.price;
       //add src from result.item.featured
       const imgs = result.item.images
         let img=imgs.featured;
         if(imgs.featured==undefined)
         {
             img=imgs.background
             if(!img)
               {
                   img=imgs.full_background
                if(!img)
                img=imgs.icon
            }
               
         }
    document.getElementById('item-img').src=img;
    //document.getElementById('item-votes').textContent=result.
    //document.getElementById('ratio-value').textContent=result.
    //document.getElementById('ratio-name').textContent=result.
    document.getElementById('description').textContent=result.item.description;
    
    for(let i=0;i<=result.item.shopHistory.length-1;i++)
    {
    
    var HtmlDate=`<tr v-for="sale in history" class="trn-table__row "><td>%date%</td><td><img style="height: 16px;" src="https://cdn.thetrackernetwork.com/cdn/trackernetwork/3C7Avbucks.png" /><span>%price%</span></td></tr>`;
    
    HtmlDate=HtmlDate.replace('%date%',result.item.shopHistory[i])
    HtmlDate=HtmlDate.replace('%price%',result.item.price)
    document.querySelector('.datePrice').insertAdjacentHTML('afterbegin',HtmlDate);
    
    }
    
    }).catch((e)=>{
    
        console.log(e)
    })
})