function isEmpty(obj){
    for(let key in obj){
        return false;
    }
    return true;
}

function sum(obj){
    let s = 0;
    for(let key in obj){
        s += obj[key];
    }
    return s;
}

function multiplyNumeric(obj) {
    for (let key in obj) {
      if (typeof obj[key] == 'number') {
        obj[key] *= 2;
      }
    }
}