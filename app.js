const cityForm = document.querySelector("form");

const card = document.querySelector(".card");

const time = document.querySelector("img.time");
const icon = document.querySelector(".icon img");
const details = document.querySelector(".details");

//在用户界面显示数据
const updateUI = (data)=>{

    // const cityDetails = data.cityDetails;
    // const weather = data.weather;
    const {cityDeatails,weather}=data;

    //显示details
    details.innerHTML=`
        <h4>${cityDeatails.EnglishName}</h4>
        <div>${weather.WeatherText} </div>
        <div>
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    `;

    card.removeAttribute("style");//移除style,显示card

    // update the day and night images
    let timeSrc =null;

    timeSrc = (weather.IsDayTime) ? "img/day.svg" : "img/night.svg";
    time.setAttribute('src',timeSrc);

    //display icon
    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);

};




//输入城市，返回城市信息和天气
const updateCity = async(city) =>{  

    //because getCity() is async func return promise, 
    //await to make sure getCity(city) is finished before 赋值给 cityDetails
    const cityDeatails= await getCity(city);  // object about the city

    const weather = await getWeather(cityDeatails.Key);  //object about the weather

    return {  //return object
        cityDeatails:cityDeatails,
        weather:weather
    };

};


cityForm.addEventListener("submit", event=>{
    event.preventDefault();

    const city =cityForm.city.value.trim(); //trim()删除字符串前后空格

    updateCity(city)   //调用updateCity()函数，
    .then(data=>updateUI(data))   //返回的promise 通过 .then方式转换为可用的object,然后调用updateUI函数
    .catch(error=>console.log(error));

});