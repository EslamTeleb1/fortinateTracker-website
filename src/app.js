const express= require('express');
const hbs=require('hbs');
const path=require('path')
const port=process.env.PORT||3000;
const publicDirectoryPath= path.join(__dirname,'../public');
const viewsPath=path.join(__dirname,'../views')
const app=express();
//APi
const FortniteAPI = require("fortnite-api-io");
 
// Instantiate with API Credentials
const API_Key='edc47162-9716dc98-c724884c-58bb9cb9'
const fortniteAPI = new FortniteAPI(API_Key)


app.set('view engine','hbs');
app.set('views',viewsPath);
app.use(express.static(publicDirectoryPath));

app.get('',(req,res)=>{

    res.render('home')
})
app.get('/home',(req,res)=>{

    res.render('home')
})
app.get('/creative',(req,res)=>{

    res.render('creative')
})

app.get('/shop',(req,res)=>{

    res.render('shop')

})
app.get('/details',(req,res)=>{

    res.render('details')

})
app.get('/upcoming',(req,res)=>{

    res.render('upcoming')

})

app.get('/*',(req,res)=>{

    res.send(" 404 , this is page not found ")
})
app.listen(port,()=>{

    console.log("server is running on port "+port)
})