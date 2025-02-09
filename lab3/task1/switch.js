let browser = '';

if (navigator.userAgent.includes("Edg")) {
    browser = "Edge";
} else if (navigator.userAgent.includes("Chrome")) {
    browser = "Chrome";
} else if (navigator.userAgent.includes("Firefox")) {
    browser = "Firefox";
} else if (navigator.userAgent.includes("Safari")) {
    browser = "Safari";
} else if (navigator.userAgent.includes("Opera") || navigator.userAgent.includes("OPR")) {
    browser = "Opera";
} else {
    browser = "Unknown";
}

if(browser =='Edge'){
    alert("You've got the Edge!");
}
else if(browser =='Chrome' || browser =='Firefox' || browser =='Safari' || browser =='Opera'){
    alert('Okay we support these browser too');
}
else{
    alert('We hope that this page looks ok!');
}