
const url ='https://fortniteapi.io/v1/creative/featured'
const API_Key='edc47162-9716dc98-c724884c-58bb9cb9'


fetch(url, {method:'GET', 
headers: {'Authorization': API_Key}})
.then((result)=>{
 
   result.json().then((result)=>{
 

    //add listFeaturedCreativeIslands
    
        console.log(result)
    
    for(let i=0;i<=result.featured.length-1;i++)
        {
    var html=`<div class="trn-card fc-map"><div class="trn-card__hero"><img src="%img%" /><div class="fc-map__actions"><span class="fc-map__actions-code" onclick="window.getSelection().selectAllChildren(event.target); document.execCommand('copy')" >%code%</span></div></div><div class="trn-card__content fc-map__info"><div><h1 class="trn-title mb0 trn-title--large" style="text-transform: unset;"><a href="/creative/1632-3365-6975" >%title%</a></h1><h2 >Author: %creator%</h2><p class="trn-text--dimmed mb0">%description%</p></div><div class="fc-map__stats"><div class="fc-map__stats-entry trn-card"><strong>93</strong><span>Score</span></div><div class="fc-map__stats-entry trn-card"><strong>1,092</strong><span>Views</span></div><a href="/creative/1632-3365-6975" class="trn-button trn-button--primary">View Island</a></div></div></div>`,
    
      nwHtml=html.replace('%img%', result.featured[i].image);
      nwHtml=nwHtml.replace('%code%',result.featured[i].code);
      //change border style
      nwHtml=nwHtml.replace('%title%',result.featured[i].title)
      nwHtml=nwHtml.replace('%name%',result.featured[i].name)
      nwHtml=nwHtml.replace('%creator%',result.featured[i].creator)
      nwHtml=nwHtml.replace('%description%',result.featured[i].introduction)
    
      document.querySelector('.fc-map-list').insertAdjacentHTML('beforeend', nwHtml);
    
        }
    
    }).catch((e)=>{
    
        console.log(e)
    })})