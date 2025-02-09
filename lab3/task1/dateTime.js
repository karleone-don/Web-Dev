function getWeekDay(date) {
    let days = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];
  
    return days[date.getDay()];
}

function getLocalDay(date) {
    let day = date.getDay();
  
    if (day == 0) {
      day = 7;
    }
  
    return day;
}

function getDateAgo(date, days) {
    date.setDate(date.getDate() - days);
    return date.getDate();
}

let date = new Date(2014, 0, 3);
alert( getWeekDay(date) );
alert( getLocalDay(date) );
alert( getDateAgo(date, 1) );

function getLastDayOfMonth(year, month) {
    let date2 = new Date(year, month + 1, 0);
    return date2.getDate();
}

alert( getLastDayOfMonth(2012, 0) );

function getSecondsToday() {
    let d = new Date();
    return d.getHours() * 3600 + d.getMinutes() * 60 + d.getSeconds();
}

function getSecondsToTomorrow() {
    let today = getSecondsToday();
    let total = 86400;
    return total - today;
}

alert( getSecondsToday() );
alert(getSecondsToTomorrow());