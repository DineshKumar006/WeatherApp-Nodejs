const request=require('request');
const chalk=require('chalk')

const geocode=(address,callback)=>{
    const locationURL='http://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiZGluZXNoa3VtYXI1IiwiYSI6ImNrOW1jbmIwZzAzNHUzZW1rOTJnd2dzNWkifQ.yEkvbcD_jRKO_j4dvtXDnQ&limit=1'
  
    request({url:locationURL,json:true},(error,res={})=>{
        const {body}=res; 
        
       if(error){
         callback(chalk.red.bold('Something Went Wrong ,Check internet connection'),undefined);
        }else if(body.features<=0){
            callback(chalk.red.bold('unable to find location '),undefined)
        }else{
           const data={
             longitude:body.features[0].center[0],
             latitude:body.features[0].center[1],
             place_name:body.features[0].place_name,
             
            }
            callback(undefined,data);   

        }

    });

   
    
    };

    module.exports=geocode;

