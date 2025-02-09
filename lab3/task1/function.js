function chackAge(age){
    return (age > 18) || confirm('Did parents allow you?');
}
function minAB(a, b){
    if (a > b){
        return b;
    }
    else{
        return a;
    }
}

function pow(x, n){
    let y = 1;
    for(let i = 0; i < n; i++){
        y *= x;
    }
    return y;
}