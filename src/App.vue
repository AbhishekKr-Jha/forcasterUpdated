
<script>
import Loader from './components/Loader.vue';
import Input from './components/Input.vue';
import { useDateFormatter } from "./composable/Formatter";

 

export default{
name:'App',
data(){
  return{
    weatherDetails:null,
    loader:false,
    cityValue:"helo",
    extraDetailsData:[
      {
        text: 'Real Feel',
        image:'/thermometer.png',
        value:'35'
      },
      {
        text: 'Wind',
        image:'/wind2.png',
        value:'66'
      },
      {
        text: 'Rain',
        image:'/rainy.png',
        value:'0'
      },
      {
        text: 'UV Index',
        image:'/uvIndex.png',
        value:'1.2'
      },
    
    ]
  }
},
setup() {
    const { formatDay, formatTime,isToday,formatDate } = useDateFormatter();
    return { formatDay, formatTime,isToday,formatDate };  
  },
components:{
  Input,
  Loader
},
methods:{
async fetchWeatherData(city){
  console.log("dat fetching strated")
  this.loader=true
  // const res=await fetch(`https://api.weatherapi.com/v1/forecast.json?key=cd09a530ece24614bd775526250603&q=${city}&days=5&aqi=no&alerts=no`)
  

  const res=await fetch(`https://api.weatherapi.com/v1/forecast.json?key=cd09a530ece24614bd775526250603&q=${city}&days=5&aqi=no&alerts=no`)

  console.log("the response coming from the data is",res)
  if (!res.ok) { 
      // alert(res?.message || "Place can not be found!")
      this.$toast.error("Place can not be found!")

      this.loader=false
      return weatherDetails
    }

    const data = await res.json();
    console.log("dat fettching stopped as ",data)
    this.loader=false
    this.$toast.success("Weather Details Fetched")
    this.viewModal=false
  console.log("data has been found") 
  return data
},

async fetchCityWeather(){
  this.weatherDetails = await this.fetchWeatherData(this.cityValue.trim());

  console.log(this.weatherDetails);
}

  },
  async created(){
    // this.$toast.success("Login successful")
    this.weatherDetails = await this.fetchWeatherData('Kolkata');
    this.extraDetailsData=[
      {
        text: 'Real Feel',
        image:'/thermometer.png',
        value:this.weatherDetails?.current?.feelslike_c +'° C'
      },
      {
        text: 'Wind',
        image:'/wind2.png',
        value:this.weatherDetails?.current?.wind_kph+' Km/h'
      },
      {
        text: 'Rain Chance',
        image:'/rainy.png',
        value:this.weatherDetails?.current?.cloud
      },
      {
        text: 'UV Index',
        image:'/uvIndex.png',
        value:this.weatherDetails?.current?.uv
      },
    
    ]
    console.log(this.weatherDetails);
  }
}
</script>



<template>
  
<div v-show="loader" class="w-full h-screen flex flex-col gap-10 items-center justify-center">
  <Loader />
  <p class="text-2xl">Fetching Details...</p> 
</div>

<div v-show="!loader" style="padding: 10px 20px;background-color: yellow;" class="w-full flex flex-row  gap-30 min-h-screen   main-container">

<div  class="w-full flex flex-col gap-10 rounded-lg   weather-container">

<!-- input cities- -->

  <div style="padding: 5px ; background-color: #202B3B ;" class=" w-full rounded-lg flex items-center gap-10 input-container" >
  
    <div class=" ">
    <p  class="text-3xl text-white heading">Forcaster</p>
  </div> 
<input type="text" class="input font-medium text-lg text-white " v-model="cityValue" placeholder="Search for Cities" />
<button @click="fetchCityWeather" type="button" class="rounded-lg text-lg block buy-button search-text" >Search</button>   
<i @click="fetchCityWeather" class="ri-search-line hidden search-icon text-2xl"></i>
</div>


<!-- <p class="text-2xl text-white">Good Morning!</p>  -->

<div class="">
  <p class="text-white text-center text-3xl date-heading">{{ formatDate(weatherDetails?.location?.localtime) }}</p>
<div  class="w-full bg-green relative mx-auto rounded-lg flex flex-row justify-between items-start overflow-hidden current-weather-box  text-2xl">
  <!-- <img src="/sunny.png" class="w-full h-full object-fit-contain" />

  <div class="inner-current-weather-box">
    hello
  </div> -->


 <div style="padding: 10px 15px;" class="flex flex-col gap-60 text-white">
<div class="">
  <h2>{{ weatherDetails?.location?.name }} ,</h2>
  <h2>{{ weatherDetails?.location?.region }}</h2>
</div>
  <h2 class="text-4xl font-semibold block temp text-white  temp1">{{ weatherDetails?.current?.temp_c }}° C</h2>
 </div>
  
 <div class="weather-img ">
  <img :src="weatherDetails?.current?.condition?.icon"  class="w-full h-full object-fit-contain"  />
 </div>
 <h2 style="padding: 10px;" class="text-4xl mx-auto text-white font-semibold block  temp hidden temp2">{{ weatherDetails?.current?.temp_c }}° C </h2>



</div>
</div>




<div style="padding: 20px;" class="w-full flex flex-col gap-10  rounded-lg  bg-dark hourly-weather-container text-white ">  
  <p class="text-2xl text-white">Today  &nbsp;forecast</p>
  <div class="w-full flex flex-nowrap overflow-x-auto justify-between  gap-60   hide-scrollbar  ">

    <div style="flex-shrink: 0;" v-for="ele in  weatherDetails?.forecast?.forecastday[0]?.hour" :key="ele?.time" class="flex  flex-col items-center gap-10 hourly-weather-items">
<p>{{ ele?.time?.split(" ")[1] }}</p>
<img :src="ele?.condition?.icon" width="60px" height="60px" class="object-fit-contain" />
<p>{{ele?.temp_c }}° C</p>
    </div>


  </div>

</div>



<div style="padding: 20px;" class="w-full flex flex-col gap-10  rounded-lg  bg-dark  text-white bg-dark extra-weather-details">  
  <p class="text-2xl text-white">Air Conditions</p>


<div class="w-full  flex flex-wrap gap-60 justify-between  extra-details-container">



  <!-- ----------this style-------- -->
  <div style="width: 44%;max-width: 450px;" v-for="item in extraDetailsData" :key="item.text" class=" flex gap-10 items-center justify-center text-2xl extra-details-box " >
    <img :src="item.image" width="50px" height="50px" class="object-fit-contain"  />
    <div style="gap:5px;" class=" flex flex-col flex-nowrap ">
<span class="">{{ item.text }}</span>
<p class="">{{item.value}}</p>
</div>
</div>


</div>


  </div>









</div>












<div style="padding: 15px;" class="w-full flex flex-col gap-10 sticky top-25 rounded-lg forcast-container text-white bg-dark ">
  <p class="text-2xl text-white">7 day forecast</p>
  <div class="w-full h-full overflow-hidden overflow-y-scroll  flex flex-col  hide-scrollbar">

<div style="padding:10px;flex-shrink: 0;"  v-for="ele in  weatherDetails?.forecast?.forecastday" :key="ele?.date" class="flex flex-col gap-10  rounded-lg text-lg forecast-items bg-dark2  ">

  <p class="text-center text-xl">{{ ele?.day?.condition?.text }}</p>

<div class="flex justify-between  items-center">
  <p class="">{{isToday(ele?.date)?"Today": formatDay(ele?.date) }}</p>
<div class="flex items-center gap-10">
  <img :src="ele?.day?.condition?.icon" width="50px" height="50px" class="object-fit-contain" />

</div>
<p>{{ ele?.day?.maxtemp_c }}॰ C</p>
</div>
<hr class=" mt-10 w-90 mx-auto">
</div>
</div>
</div>



</div>


</template>