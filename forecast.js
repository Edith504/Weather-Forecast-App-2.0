const key = 'Ur7ZnxN2RuFGxJl7ZCrbHeDk1jtojHcK';

//get city information
const getCity = async(city)=>{    //async返回promise

    const base ="http://dataservice.accuweather.com/locations/v1/cities/search";
    const query = `?apikey=${key}&q=${city}`;

    const response = await fetch(base+query);    //fetch返回promise,await阻断

    const data = await response.json();    //json()返回promise,获取__proto__的.json() method保存着数据的内容

    console.log(data[0]); 
    return data[0];  // 从 data对象获取 key 并传递给 getWeather函数

};

//get weather information
const getWeather = async(id)=>{    //id==key

    const base ="http://dataservice.accuweather.com/currentconditions/v1/";
    const query =`${id}?apikey=${key}`;

    const response = await fetch(base+query);   

    const data = await response.json(); 

    console.log(data); 
    return data[0];
};

