const request=require('request');
const chalk=require('chalk')



const weatherReport=(lat,lon,callback)=>{
    const url='http://api.weatherstack.com/forecast?access_key=a627a3fe73d0f03ab9f3e3ab9fbcfcb7&query='+lat+','+lon+'&units=m';
    
       request({url,json:true},(error,res={})=>{
           const {body} =res;
           if(error){
               callback(chalk.red.bold('Something Went Wrong ,Check internet connection'),undefined)
           }else if(body.error){
               callback(chalk.red.bold(body.error.info));
           }else{
               const reqData={
                temperature:body.current.temperature,
                weather_descriptions:body.current.weather_descriptions[0],
                location:body.location.name
    
               }
               callback(undefined,reqData)
           }
       })
    };

    module.exports=weatherReport;