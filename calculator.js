const calculator = {
    displayValue: '0',
    waitingForSecondOperand: false,
    operator: null,
    firstOperant: null
}

const keys = document.querySelector('.keys');
keys.addEventListener('click', event => {
    const { target } = event;
    const { value } = target;

    if (!target.matches('button')) {
        return;
    }

    switch (value) {
        case '+':
        case '-':
        case '*':
        case '/':
        case '=':
            handleOperator(value);
            break;  
        case '.':
            inputDecimal(value);
            break;
        default:
            if (Number.isInteger(parseFloat(value))) {
                inputDigit(value);
              }  
    }
    updateDisplay();
})

// Функция обновления дисплея

function updateDisplay() {
    const screen = document.querySelector('.screen');
    screen.value = calculator.displayValue;
}

// Функция нажатия на цифры

function inputDigit(digit) {
    const { displayValue, waitingForSecondOperand } = calculator;
    if (waitingForSecondOperand === true) {
        calculator.displayValue = digit;
        calculator.waitingForSecondOperand = false;
    } else {
        calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
    }
}

// Очистка поля ввода

const clearButton = document.querySelector('.clear');
clearButton.addEventListener('click', event => {
    calculator.displayValue = '0';
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
    calculator.firstOperant = null;
    updateDisplay();
}
)

function handleOperator(newOperator) {
    const { firstOperant, displayValue, operator } = calculator;
    const inputValue = parseFloat(displayValue);
    let result;

    if (operator && calculator.waitingForSecondOperand) {
        calculator.operator = newOperator;
        return;
    }

    if (firstOperant == null && !isNaN(inputValue)) {
        calculator.firstOperant = inputValue;
    } else if (operator) {
        if (operator === "+") {
            result = firstOperant + inputValue;
        } else if (operator === "-") {
            result = firstOperant - inputValue;
        } else if (operator === "*") { 
            result = firstOperant * inputValue;
        } else if (operator === "/") {
            result = firstOperant / inputValue;
        }
        calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
        calculator.firstOperant = result;
    }
    calculator.waitingForSecondOperand = true;
    calculator.operator = newOperator;
}

function inputDecimal(dec) {
    if (calculator.waitingForSecondOperand === true) {
        calculator.displayValue = '0.';
        calculator.waitingForSecondOperand = false;
        return;
    } 

    if (!calculator.displayValue.includes(dec)) {
        calculator.displayValue += dec;
    }
}