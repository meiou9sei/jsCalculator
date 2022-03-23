main();

//global variables


function main() {

    makeButtonsClickable();

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

///////////////
// FUNCTIONS //
///////////////

// determines which math function to use
// operate works when pass in string
function operate (userInput) {


    /////////////MAKE THIS ITS OWN FUNCTION - "CHECKIFEQUATION"///////////
    //regexs
    const REGEX_NUM_OP_NUM = /\d+[\+\-\*x\/]\d+/; //regex for number, then +, -, */x, or /, then number
    const REGEX_OPERATORS = /([\+\-\*x\/])/; //regex for operators, w/ catching brackets () (used for .split)

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


    /////////////////////////////////////////////


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

//makes buttons clickable
function makeButtonsClickable() {
    //makes NUMBERS AND OPERATORS buttons do things
    const inputButtons = document.querySelectorAll('.inputButtons > button');
    
    inputButtons.forEach(inputButton => {
        inputButton.addEventListener('click', () => displayOnDisplay(inputButton.textContent));
    });

    //makes CLEAR button do things
    const clearButton = document.querySelector('#clearButton');

    clearButton.addEventListener('click', () => clearDisplay());

}

//makes input display on display, then store that variable into 
function displayOnDisplay(input) {
    input = input.trim(); //gets rid of extra space, idk why it's there

    const display = document.querySelector('#display');
    
    if ( !isNaN(input) ) {
    //for numbers 
        if (display.textContent === "0") {
            display.textContent = input;
        } else {
            display.textContent += input;    
        }
    } else if (input === ".") {
    //for decimal
        display.textContent += input;
    } else {
    //for operators 
        display.textContent += " " + input + " ";
    }
}

//clear display and equation (used by clear button)
function clearDisplay() {
    const display = document.querySelector('#display');
    
    if (display.textContent !== "0") {
        display.textContent = "0";
    } else {
        //code to reset operation too
    }
}