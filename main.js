
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
// operate works when pass in string
function operate (userInput) {

    //regexs
    const REGEX_NUM_OP_NUM = /\d+[\+\-\*x\/]\d+/; //regex for number, then +, -, */x, or /, then number
    const REGEX_OPERATORS = /([\+\-\*x\/])/; //regex for operators, w/ catching brackets () (used for .split)
    
    /* 
        notes: 
        I think you need to .split based on number, operator, number
        I'm not sure if you use a regex or not for that
    */

    //removes all whitespace
    userInput = userInput.replace(/\s/g,"");

    
    //rejects if not an equation formatted properly
    if (!REGEX_NUM_OP_NUM.test(userInput)) {
        console.log("bad equation");
        return;
    }

    //splits the equation into num1, operator, num2
    const splitOperation = userInput.split(REGEX_OPERATORS);
    console.log(splitOperation);
  
    const num1 = Number(splitOperation[0]);
    const operator = splitOperation[1];
    const num2 = Number(splitOperation[2]);

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