export function timeConverter(UNIX_timestamp: number) {
  var a = new Date(UNIX_timestamp * 1000);
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time =
    date +
    " " +
    month +
    " " +
    year +
    " " +
    hour +
    ":" +
    min +
    ":" +
    sec +
    " " +
    "WIB";
  return time;
}

export function kelvinToCelsius(kelvin: number) {
  return kelvin - 273.15;
}

export function format_time(s: number) {
  const date = new Date(s * 1e3);

  const year = date.getFullYear();
  const month = date.getMonth() + 1; // getMonth() returns 0-11
  const day = date.getDate();
  const hours = date.getUTCHours() + 7; // Adjust for Jakarta timezone (UTC+7)
  const minutes = date.getUTCMinutes();

  // Pad single digit minutes with a leading zero
  const paddedMinutes = minutes.toString().padStart(2, "0");

  return `${year} - ${month} - ${String(day).padStart(2, "0")}  ${String(
    hours
  ).padStart(2, "0")}:${paddedMinutes} WIB`;
}
