import moment from "moment";

export function useDateFormatter() {
  const formatDay = (date) => moment(date).format("dddd"); 
  const formatDate = (date) => moment(date).format("YYYY-MM-DD"); 
  const formatTime = (date) => moment(date).format("HH:mm"); 
  const isToday = (date) => moment(date).isSame(moment(), "day");
  // const getTimeOfDay = () => {
  //   const hour = moment().hour(); 
  //   if (hour < 12) return "Morning";
  //   if (hour < 18) return "Afternoon";
  //   return "Evening";
  // };


  return { formatDay, formatDate, formatTime,isToday };
}