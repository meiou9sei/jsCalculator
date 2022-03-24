//////////////////////
// GLOBAL VARIABLES //
//////////////////////

//REGEXS
const REGEX_NUM_OP_NUM = /\-?\d+[\+\-\*x\/]\-?\d+/; //regex for (+/-) number, then +, -, */x, or /, then (+/-) number
const REGEX_OPERATORS = /([\+\-\*x\/])/; //regex for operators, w/ catching brackets () (used for .split)
const REGEX_NEGATIVE_NUM = /\-\d+/;

//SELECTORS
const inputButtons = document.querySelectorAll('.numInput, .opInput'); //NOTE: PERIOD "." IS INCLUDED UNDER ".numInput"
const clearButton = document.querySelector('#clearButton');
const equalButton = document.querySelector('#equalButton');

const mainDisplay = document.querySelector('#mainDisplay');
const historyDisplay = document.querySelector('#historyDisplay');

main();

function main() {
    //clears display if previously used
    clearDisplay();
    //basically sets up the whole calculator
    makeButtonsClickable();
}

///////////////
// FUNCTIONS //
///////////////

//makes buttons clickable
function makeButtonsClickable() {
    //makes NUMBERS AND OPERATORS buttons do things    
    inputButtons.forEach(inputButton => {
        inputButton.addEventListener('click', () => displayOnMainDisplay(inputButton.textContent));
    });
    console.log("nofun");

    //makes CLEAR button do things
    clearButton.addEventListener('click', () => clearDisplay());

    //makes ENTER button (=) do things
    equalButton.addEventListener('click', () => checkIfEquation(mainDisplay.textContent));
}

//makes input display on mainDisplay, then store that variable into 
function displayOnMainDisplay(input) {
    if (typeof input === "string")
        input = input.trim(); //gets rid of extra space, idk why it's there
    
    if ( !isNaN(input) || input === "." ) {
        //for numbers or decimal point
        if (mainDisplay.textContent === "0") {
            mainDisplay.textContent = input;
        } else {
            mainDisplay.textContent += input;    
        }
    } else if (input === "-" && mainDisplay.textContent === "0") {
        //dealing with making 0 mainDisplay negative
        mainDisplay.textContent = input;
    } else {
        //for operators 
        if (REGEX_OPERATORS.test(mainDisplay.textContent)) {
            //if there's an operator prior in the equation
            checkIfEquation(mainDisplay.textContent);
            
            if (REGEX_NEGATIVE_NUM.test(mainDisplay.textContent)) {
                //if it fails the equation test and there's a negative number
                mainDisplay.textContent += " " + input + " ";
            }
            
        } else {
            //simple, no operators prior to this input
            mainDisplay.textContent += " " + input + " ";
        }
    }
}

//displays equation performed in historyDisplay
function displayOnHistoryDisplay(equation) {
    historyDisplay.textContent = equation;
}

//clear display and equation (used by clear button)
function clearDisplay() {    
    if (mainDisplay.textContent !== "0") {
        //if there are numbers in mainDisplay
        mainDisplay.textContent = "0";
    } else {
        //code to reset operation too
    }
}

function checkIfEquation (equation) {
    //removes all whitespace
    let equationNoSpace = equation.replace(/\s/g,"");
    
    //returns if not an equation formatted properly
    if (!REGEX_NUM_OP_NUM.test(equationNoSpace)) {
        console.log("not an equation");
        return;
    }

    //splits the equation into num1, operator, num2
    const splitOperation = equation.split(REGEX_OPERATORS);
    console.log(splitOperation);
    
    const num1 = Number(splitOperation[0]);
    const operator = splitOperation[1];
    const num2 = Number(splitOperation[2]);

    //call operate
    let result = operate (num1, operator, num2);

    displayOnHistoryDisplay(equation);
    clearDisplay();
    displayOnMainDisplay(result);
}

// determines which math function to use
// operate works when pass in string
function operate (num1, operator, num2) {

    let result = null;
    //switch determines which operation to use
    switch (operator) {
        case "+":
            result = add(num1, num2);
            break;
        case "-":
            result = subtract(num1, num2);
            break;
        case "*":
        case "x":
            result = multiply(num1, num2);
            break;
        case "/":
            result = divide(num1, num2);
            break;
        default:
            console.log("invalid operator");
            break;
    } 

    return result;
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