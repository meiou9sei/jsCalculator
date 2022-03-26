//////////////////////
// GLOBAL VARIABLES //
//////////////////////

//REGEXS
const REGEX_NUM_OP_NUM = /\-?\d+\.?[\+\-\*x\/]\-?\.?\d+\.?/; //regex for (+/-) number, then +, -, */x, or /, then (+/-) number. numbers may or may not contain decimal at beginning, within (I think is covered by normal \d tag), or end
const REGEX_OPERATORS = /([\+\-\*x\/])/; //regex for operators, w/ catching brackets () (used for .split)
const ARRAY_OPERATORS = ["+", "-", "x", "*", "/"]; //used for checking decimal flag later (newDecimalAllowed in displayOnMainDisplay) 
const REGEX_OPERATORS_WITH_GLOBAL = /([\+\-\*x\/])/g; //using global tag on above broke some if/else, so made a special one if need a global tag
// further info see: https://stackoverflow.com/questions/59694142/regex-testvalue-returns-true-when-logged-but-false-within-an-if-statement
const REGEX_NEGATIVE_NUM = /\-\d+/; //checks if negative number
const REGEX_DECIMAL_IN_NUM = /\-?\d*\.\d*/ // checks if decimal is in number

//global
newEquation = false; //sets flag to true on operate, prevents new number input just concatenating to old number. if operator, then operates on old number regardless

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

    //makes CLEAR button do things
    clearButton.addEventListener('click', () => clearDisplay());

    //makes ENTER button (=) do things
    equalButton.addEventListener('click', () => evaluateEquation(mainDisplay.textContent));
}

//makes input display on mainDisplay, then store that variable into 
function displayOnMainDisplay(input) { 
    if (typeof input === "string") //this is not used if calling function from evaluateEquation
        input = input.trim(); //gets rid of extra space, idk why it's there
    
    if ( !isNaN(input) || input === "." ) {
        //for numbers or decimal point

        if (newEquation) //clears display if new equation
            clearDisplay();

        if (input === "." || input === "0") {
            //prevent multiple decimals in a number
                //flag set to false if decimal encountered. else, operator encounter resets decimal flag
            //prevent multiple 0 on second number without decimal point
                //flag set to true if decimal or operator encountered. flag set to false if 0 encountered
            numberWithDecimal = false;
            newDecimalAllowed = true;
            non0DigitExists = false;
            newZeroAllowed = true;
            for (let i = 0; i < mainDisplay.textContent.length; i++) {
                if (mainDisplay.textContent.charAt(i) === " ") {
                    numberWithDecimal = false; //new number, no decimal (yet, if ever)
                    newDecimalAllowed = true; //new number, decimal is allowed till a decimal is set
                    newZeroAllowed = true; //new number, any number is allowed
                    non0DigitExists = false; //new number, no digit exists yet
                } else if (mainDisplay.textContent.charAt(i) === ".") {
                    numberWithDecimal = true; //any number of 0s can follow decimal
                    newDecimalAllowed = false; //number now contains decimal, no further decimals allowed
                    new0Allowed = true; //any number of 0s can follow a decimal
                } else if (!isNaN(mainDisplay.textContent.charAt(i)) && input !== "0") { //any non-0 digit
                    non0DigitExists = true; //a non-0 digit exists now
                    newZeroAllowed = true; //any number of 0s can follow a non-0 digit
                } else if (mainDisplay.textContent.charAt(i) === "0") {
                    if ( ! (non0DigitExists || numberWithDecimal) )
                        newZeroAllowed = false; //if there are no non-0 digits (there's an alone 0) AND there is no decimal yet, prevent new 0 input
                }
            }
           
            if (input === "." && newDecimalAllowed === false)
                return;
            if (input === "0" &&  newZeroAllowed === false)
                return;

        }

        //adds input to mainDisplay
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
        //console.log(" ");
        //console.log("mainDisplay.textContent is " + mainDisplay.textContent + " before operators if/else");
        if (REGEX_OPERATORS.test(mainDisplay.textContent)) {
            //console.log("REGEX_OPERATORS detected, entered if portion");
            //if there's an operator prior in the equation
            let equationWorked = evaluateEquation(mainDisplay.textContent);
            //console.log("mainDisplay already has " +  mainDisplay.textContent.match(REGEX_OPERATORS_WITH_GLOBAL).length + " operators");

            if (!equationWorked) {
                if (mainDisplay.textContent.match(REGEX_OPERATORS_WITH_GLOBAL).length >= 1) {
                    //if more than one operator found, does not add new operator (unless it's a negative number)
                    if (REGEX_NEGATIVE_NUM.test(mainDisplay.textContent)) {
                        if (mainDisplay.textContent.match(REGEX_OPERATORS_WITH_GLOBAL).length >= 2) {
                            //for negative number first, switching the operator (technically the second operator in equation)
                            //remove last operator and replace it with new entry
                            let replaceMe = mainDisplay.textContent.slice(-3);
                            //console.log(replaceMe);
                            let newEquation = mainDisplay.textContent.replace(replaceMe, " " + input + " "); 
                            //console.log(newEquation);
                            mainDisplay.textContent = newEquation;
                            
                            return;
                        }
                        else {
                            mainDisplay.textContent += " " + input + " ";
                            //console.log("whackabug1");        
                        }

                    }

                    //for no negative numbers, switching the operator
                    //remove last operator and replace it with new entry
                    let replaceMe = mainDisplay.textContent.slice(-3);
                    //console.log(replaceMe);
                    let newEquation = mainDisplay.textContent.replace(replaceMe, " " + input + " "); 
                    //console.log(newEquation);
                    mainDisplay.textContent = newEquation;

                    return;
                }   

            } else {
                //if only one operator found prior, allows new operator to be added
                mainDisplay.textContent += " " + input + " ";
                //console.log("whackabug2")
            }
      
        } else {
            //simple, no operators prior to this input
            //console.log("entered else portion, mainDisplay.textContent is " + mainDisplay.textContent);
            mainDisplay.textContent += " " + input + " ";
            //console.log("whackabug3");
        }
    }

    newEquation = false; //set flag false for any future input
}

//displays equation performed in historyDisplay
function displayOnHistoryDisplay(equation, result) {
    historyDisplay.textContent = `${equation} = ${result}`;
}

//clear display and equation (used by clear button)
function clearDisplay() {    
    if (mainDisplay.textContent !== "0") {
        //if there are numbers in mainDisplay
        mainDisplay.textContent = "0";
    } else if (!newEquation) {
        //resets history display if mainDisplay is already cleared ("0")
        historyDisplay.textContent = "0";
    }
    newEquation = false; //set to false if click clear button
}

//checks if equation. if not, returns false. if true, calls operate, displays result on mainDisplay and historyDisplay, and returns true 
function evaluateEquation (equation) {
    //removes all whitespace
    let equationNoSpace = equation.replace(/\s/g,"");
    console.log(equationNoSpace);

    //returns if not an equation formatted properly
    if (!REGEX_NUM_OP_NUM.test(equationNoSpace)) {
        console.log("not an equation");
        return false;
    }


    //deals with dividing by 0
    const REGEX_DIVIDE_BY_ZERO = /\/0*\.*00*$/;
    if (REGEX_DIVIDE_BY_ZERO.test(equationNoSpace)) {
        mainDisplay.textContent = "idk"; 
        return;
    }

    let splitEquation = null;
    if (REGEX_NEGATIVE_NUM.test(equation)) {
        //deals with first number being negative 
        splitEquation = equation.split(" ");
        //console.log("if " + splitEquation);
    } else {
        //if first number is not negative
        splitEquation = equation.split(REGEX_OPERATORS);
        //console.log("else " + splitEquation);        
    }

    //splits the equation into num1, operator, num2
    const num1 = Number(splitEquation[0]);
    const operator = splitEquation[1];
    const num2 = Number(splitEquation[2]);

    //call operate
    let result = operate(num1, operator, num2);

    displayOnHistoryDisplay(equation, result);
    clearDisplay();
    displayOnMainDisplay(result);

    newEquation = true; 
    return true;
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