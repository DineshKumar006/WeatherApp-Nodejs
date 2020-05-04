

const searchFrom=document.querySelector('.Form')

const ele=document.querySelector('input');

const msg1=document.querySelector('#msg1')
const msg2=document.querySelector('#msg2')


searchFrom.addEventListener('submit',(event)=>{

    msg1.textContent='Loading.....'
    event.preventDefault();
        console.log(ele.value)
      const address=ele.value 
// fetch('http://localhost:4000/weather?address='+address+' ').then((res)=>{
    // when delpoy to heroku remove localhost:400
    fetch('/weather?address='+address+' ').then((res)=>{


    res.json().then(data=>{

        if(data.error){
            // console.log(error);
            msg1.textContent=error
        }else{
            // console.log(data)
           var resdata=`<ul><li>Temperature:${data.temperature }</li><li>Weather_Descriptions:${data.weather_descriptions }</li><li>Location:${data.location }</li><li>Place_name:${data.place_name }</li></ul>`
            msg1.textContent=address
            msg2.innerHTML=resdata
        }
        
    })
})

})






