const calcScreen = document.querySelector('.display');
const keyBoardKeys = document.querySelector('.keyboard');

keyBoardKeys.addEventListener('click', (e) => {
    const targetElement = e.target;


    if (!targetElement.matches('button')) {
        return;
    }
    let targetClass = targetElement.classList;

    if (targetClass.contains('operator-btn')) {
        inputOperator(targetElement.value);
        return;
    }

    if (targetClass.contains('decimal-btn')) {
        inputDecimal();
        return;
    }

    if (targetClass.contains('all-clear-btn')) {
        updateScreen();
        return;
    }

    if (targetClass.contains('single-clear-btn')) {
        clearSingleCharacter();
        return;
    }

    if (targetClass.contains('equal-sign')) {
        calculateResult();
        return;
    }

    inputNumber(targetElement.value);

})

function updateScreen() {
    calcScreen.value = 0;
}

function inputOperator(operator) {
    if (calcScreen.value !== '0') {
        let result = checkIfPrecedesOperator();
        let newOperator = getOperator(operator);
        if (result) {
            calcScreen.value = calcScreen.value.slice(0, -1) + newOperator;
        } else {
            calcScreen.value = calcScreen.value + newOperator;
        }
    }
}


function getOperator(operator) {
    switch (operator) {
        case  '*':
            return 'x';
        case  '/':
            return '/';
        case  '-':
            return '-';
        default:
            return '+';

    }
}

function checkIfPrecedesOperator() {
    let lastVal = calcScreen.value.substr(calcScreen.value.length - 1)
    if (lastVal === 'x' || lastVal === '/' || lastVal === '-' || lastVal === '+') {
        return true;
    }
    return false;
}

function inputNumber(inputDigit) {
    if (calcScreen.value !== '0') {
        calcScreen.value = calcScreen.value + inputDigit;
    } else {
        calcScreen.value = inputDigit;
    }
}

function clearSingleCharacter() {
    calcScreen.value = calcScreen.value.slice(0, -1);
    if (!calcScreen.value) {
        updateScreen();
    }
}

function calculateResult() {
    if (calcScreen.value !== '0') {
        let result = checkIfPrecedesOperator();
        if (result) {
            calcScreen.value = calcScreen.value.slice(0, -1);
        }
        calcScreen.value = eval((calcScreen.value.replace(/x/g, "*")));
    }
}

function inputDecimal() {
    let lastVal = calcScreen.value.substr(calcScreen.value.length - 1);
    if (lastVal !== '.') {
        calcScreen.value = calcScreen.value + '.';
    }
}


updateScreen();