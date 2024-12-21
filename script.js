
//Define our constants
const resultBox = document.getElementById("resultBox");
const errorMessage = "Invalid Expression"
const welcomeMessage = "Enter an expression"
const resultHistory = new Array()

//On the initial load or refresh of the site, 
//set the zero state message in the result box
window.onload = function() {
    resultBox.textContent = welcomeMessage
    //Set focus immediately into the result box
    resultBox.focus()
    moveCursorToFarRight();
  };

//Add an event listener to the Enter key, and try to evaluate the current expression
resultBox.addEventListener('keypress', function (event) {
    
    //First clear the welcome expression on any key press
    if(resultBox.textContent == welcomeMessage){clearResult();}

    //Evaluate the expression if we hit the enter key
    if (event.key === 'Enter') {
        evaluateExpression();
    }
});

function appendCharToResult(character){

    //Check if we have the welcome message and if so clear it before appending any more chars
    if(resultBox.textContent == welcomeMessage){clearResult();}

    resultBox.textContent += character;

    //Set focus back into the result box so hitting "Enter"
    //can immediately evalute the expression
    resultBox.focus()
    moveCursorToFarRight();
}

//Set the expression back to the empty string
function clearResult(){
    resultBox.textContent = ""
    //Set focus immediately into the result box
    resultBox.focus()
    moveCursorToFarRight();
}

function evaluateExpression(){
     
    //First clean up the expression replacing common chars with 
    //their JS math counterparts
    preprocessExpression();

    //try to evaluate the expression and throw an error if unable to do so
    try {
        resultBox.textContent = eval(resultBox.textContent)
    } catch (error) {
        resultBox.textContent = errorMessage
    }

    //push the evaluated expression to the history array
    resultHistory.push(resultBox.textContent)

    //Set focus back into the result box
    resultBox.focus()
    moveCursorToFarRight();

}

function preprocessExpression(){
    //First replace all occurrences of the 'π' char with 'Math.PI'
    resultBox.textContent = resultBox.textContent.replaceAll('π','Math.PI')
    resultBox.textContent = resultBox.textContent.replaceAll('Pi','Math.PI')
    resultBox.textContent = resultBox.textContent.replaceAll('pi','Math.PI')
    //Also, replace any occurrences of 'x' with '*'
    resultBox.textContent = resultBox.textContent.replaceAll('X','*')
    resultBox.textContent = resultBox.textContent.replaceAll('x','*')
    //Allow users to enter '^' as an exponentiation operator
    resultBox.textContent = resultBox.textContent.replaceAll('^','**')
}

function moveCursorToFarRight() {

    // Create a range and set the cursor position at the end of the div's text content
    var range = document.createRange();
    var selection = window.getSelection();

    // Move the cursor to the end
    range.selectNodeContents(resultBox);
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);
}