


<script> 
export default{
    name:'ForecastBox',
    props:{
        data:Array
    }
}
</script>

<template>
<div style="padding:10px;flex-shrink: 0;"  v-for="ele in  data" :key="ele?.date" class="flex flex-col gap-10  rounded-lg text-lg forecast-items bg-dark2  ">
<p class="text-center text-xl">{{ ele?.day?.condition?.text }}</p>

<div class="flex justify-between  items-center">
  <p class="">{{isToday(ele?.date)?"Today": formatDay(ele?.date) }}</p>
<div class="flex items-center gap-20">
  <img :src="ele?.day?.condition?.icon" width="50px" height="50px" class="object-fit-contain" />

</div>
<p>{{ ele?.day?.maxtemp_c }}॰ C</p>
</div>

</div>

</template>


