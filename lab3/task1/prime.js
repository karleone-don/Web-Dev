let n = prompt();
for(let i = 2; i <= n; i++){
    let prime = true;
    for(let j = 2; j < i; j++){
        if(i % j == 0){
            prime = false;
            break;
        }
    }
    if (prime){
        alert(i);
    }
}