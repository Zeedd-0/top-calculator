// ==================================
function add(a, b) {
    return parseFloat(a) + parseFloat(b);
}

function subtract(a, b) {
    return parseFloat(a) - parseFloat(b);
}

function multiply(a, b) {
    return parseFloat(a) * parseFloat(b);
}

function divide(a, b) {
    return parseFloat(a) / parseFloat(b);
}

// ----------------------------------
function operate(fNum, sNum, operation) {
    return OPERATOR[operation](fNum, sNum).toFixed(3) * 1;
}

// ==================================
const RESULT_DISPLAY = document.querySelector('#result-display');
const OPERATION_DISPLAY = document.querySelector('#operation-display');
const BTN_NUMBER = document.querySelectorAll('.button.number');
const BTN_OPERATION = document.querySelectorAll('.button.operation')
const BTN_END = document.querySelectorAll('#equals, #clear');

const OPERATOR = {
    'add': add,
    'subtract': subtract,
    'multiply': multiply,
    'divide': divide,
};

const NUMBER = {
    first: '',
    second: '',
    result: '',
    selOperation: '',
}

// ==================================
BTN_NUMBER.forEach(button => {
    button.addEventListener('click', e => {
        makeNum(e.target);
    });
})

BTN_OPERATION.forEach(button => {
    button.addEventListener('click', e => {
        let  target = e.target;
        if (target.id !== 'equals') {
            if (NUMBER.result !== '' && NUMBER.first === '') {
                NUMBER.first = NUMBER.result;
                NUMBER.result = '';
            };
            NUMBER.selOperation = target;
            display(target.innerText, 0);
        };
    });
})

BTN_END.forEach(button => {
    button.addEventListener('click', e => {
        switch (e.target.id) {
            case 'clear':
                clear();
                break;
            case 'equals':
                equals();
                break;
        };
    });
})

// ----------------------------------

function makeNum(target) {
    let overwrite = 0;
    if (NUMBER.selOperation) {
        NUMBER.second += target.innerText;
    } else {
        if (NUMBER.result) {
            overwrite = 1;
            NUMBER.result = '';
        };
        NUMBER.first += target.innerText;
    };
    display(target.innerText, overwrite);
}

function display(text, overwrite) {
    if (overwrite) {
        RESULT_DISPLAY.innerText = text;    
    } else {
        RESULT_DISPLAY.innerText += text;
    };
}

function equals() {
    if (NUMBER.selOperation) {
        let result = operate(NUMBER.first, NUMBER.second, NUMBER.selOperation.id);
        NUMBER.first = '';
        NUMBER.second = '';
        NUMBER.result = result;
        NUMBER.selOperation = '';
        display(result, 1);
    };
}

function clear() {
    NUMBER.first = '';
    NUMBER.second = '';
    NUMBER.result = '';
    NUMBER.selOperation = '';
    display('', 1);
}