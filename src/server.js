const express=require('express');
const path=require('path');
const app=express();
const hbs=require('hbs');
const geocode=require('./utils/geocode');
const weatherReport=require('./utils/weatherReport');
const Report=require('./routes/reports');
const cors =require('cors');

const port =4000 | process.env.PORT
// console.log(__dirname)

// console.log(path.join(__dirname,'../public'))

 const publicDir=path.join(__dirname,'../public')

const views=path.join(__dirname,'../templates/views');
const partialsPaths=path.join(__dirname,"../templates/partials");

app.set('view engine','hbs');
app.set('views',views);
hbs.registerPartials(partialsPaths)

app.use(express.static(publicDir))

app.use(cors());
app.use(express.json());


app.get('',(req,res)=>{
    res.render('index',{
        title:'User details',
        name:'Dinesh',
        age:23
    })
});



app.get('/weather',(req,res)=>{

    if(!req.query.address){
        return  res.send({
            Error:'Provide the address'
        })
    }
   
    geocode(req.query.address,(error,data={})=>{
        const {longitude,latitude,place_name}=data;

        if(error){
            res.send({
                Error:error
            })
        }else{
            weatherReport(latitude,longitude,(error,Reportdata={})=>{
                const {temperature,weather_descriptions,location}=Reportdata;
                if(error){
                    return res.send({
                        Error:error
                    })
                }else{
                res.send({
                    weather_descriptions:weather_descriptions,
                    temperature:temperature,
                    location:location,
                    place_name:place_name,
                    address:req.query.address,
                    latitude:latitude,
                    longitude:longitude
                })
            }
            
            })

        }
    })

})



app.get('/about',(req,res)=>{
    res.send([{
        name:'dinesh',
        age:23,
        gender:'male'
    },{
        name:'Latha',
        age:22,
        gender:'female'
    }])
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'This help guide',
        content:'visit @gmail.com'
    })
})







app.get('/help/*',(req,res)=>{
    // res.send('<h1>Help artical not found!<h1>')
    res.render('error',{
        Error:404,
        helpError:'Help artical not found!'
    })
})


app.get('*',(req,res)=>{
    // res.send('<h1>Page not found 404! error<h1>')
    res.render('error',{
        Error:404,
        globalError:'Page not found 404! error'
    })
})

app.use(cors());

app.listen(port,()=>{
    console.log('Server is running on port:',port)
})

