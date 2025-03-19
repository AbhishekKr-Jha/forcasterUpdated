import moment from "moment";

export function useDateFormatter() {
  const formatDay = (date) => moment(date).format("dddd"); // Get day name (Monday, Tuesday, etc.)
  const formatDate = (date) => moment(date).format("YYYY-MM-DD"); // Get only the date
  const formatTime = (date) => moment(date).format("HH:mm"); // Get only the time
  const isToday = (date) => moment(date).isSame(moment(), "day");


  return { formatDay, formatDate, formatTime,isToday };
}