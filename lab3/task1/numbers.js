let a = +prompt("The first number?", "");
let b = +prompt("The second number?", "");

alert( a + b );

function readNumber() {
    let num;
  
    do {
      num = prompt("Enter a number please?", 0);
    } while ( !isFinite(num) );
  
    if (num === null || num === '') return null;
  
    return +num;
}

alert(`Read: ${readNumber()}`);