
main();



function main() {
    let userInput = window.prompt("Enter a simple math equation: ");
    operate(userInput);
}

// 4 BASIC MATH FUNCTIONS
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

// determines which math function to use
function operate (userInput) {

    //regexs
    const regexNumSumNum = /\d+[\+\-\*x\\]\d+/; //regex for number, then +, -, */x, or /, then number
    const regexNum = /\d+/; //regex for number (digit+)
    
    /* 
        notes: 
        I think you need to .split based on number, operator, number
        I'm not sure if you use a regex or not for that
    */

    if (!regexNumSumNum.test(userInput)) {
        console.log("bad equation");
        return;
    }

    // DO A .split HERE OF userInput AND PASS INTO BELOW SWITCH

    //switch determines which operation to use
    // prob need to return some variable later, for use in equations like 1 + 2 - 3 -> need to separate to 1 + 2, then 3 - 3
    switch (operator) {
        case "+":
            console.log(add(num1, num2));
            break;
        case "-":
            console.log(sub(num1, num2));
            break;
        case "*":
        case "x":
            console.log(multiply(num1, num2));
            break;
        case "/":
            console.log(divide(num1, num2));
            break;
        default:
            console.log("invalid operator");
            break;
    } 
}