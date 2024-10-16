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
function operate(fNum, sNum, operator) {
    return OPERATOR[operator](fNum, sNum).toFixed(3) * 1;
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

const PLUSMINUS = {
    add: '+',
    subtract: '-',
}


const INDEX = {i: 0,};
const CURRENTVALUE = {
    first: 'first',
    second: 'second',
}


const N1 = [
]

const RESULT ={n: '',}
const N = {
    current: 'first',
    first: '',
    second: '',
    result: '',
    selOperation: '',
}

function OpPair(number) {
    this.n = number;
    this.op = '';
}

// ==================================
BTN_NUMBER.forEach(button => {
    button.addEventListener('click', e => {
        makeNum(e.target);
    });
})

BTN_OPERATION.forEach(button => {
    button.addEventListener('click', e => {
        if (e.target.id === 'equals') {
            equals();
        } else {
            operation(e.target);
        };
    });
})

BTN_END.forEach(button => {
    button.addEventListener('click', e => {
        clearEquals(e.target);
    });
})

// ----------------------------------

function makeNum(target) {
    let overwrite = 0;

    if (N.result !== '' || N.result === 0) {
        // if (target.id === 'dot') {
        //     display(0, 0);
        // };
        overwrite = 1;
        N.result = '';
    };
    if (target.id === 'dot' && N[N.current] === '') {
        display(0, 0);
    };

    N[N.current] += target.innerText;
    display(target.innerText, overwrite);

}

function display(text, overwrite) {
    if (overwrite) {
        RESULT_DISPLAY.innerText = text;    
    } else {
        RESULT_DISPLAY.innerText += text;
    };
}

// <<<<<<<<<<<<<<<<<<<<<<< o ADD A LIMIT OF DIGITS PLUS CHARACTERS
// <<<<<<<<<<<<<<<<<<<<<<< o GOTTA MAKE OPERATION DISPLAY SHOW OPERATION
//                         AND RESULT DISPLAY TO SHOW ONLY RESULT
// <<<<<<<<<<<<<<<<<<<<<<< o try a solution of display being three item array to make easier to change values, dot etc



function operation(target) {
    if (N.selOperation === '') {
        if (N.first === '') {
            if (N.result === '') {
                N.first = '0';
                display(0, 0);
            } else {
                N.first = N.result;
                N.result = '';
            };
        };
        N.current = CURRENTVALUE.second;
        N.selOperation = target;
        display(target.innerText, 0);
    } else {
        if (N.second === '') {
            N.current = CURRENTVALUE.second;
            N.selOperation = target;
            displayBackspace();
            display(target.innerText, 0);
        } else {
            equals();
            operation(target);
        };
    };
};

function displayBackspace() {
    let text = RESULT_DISPLAY.innerText;
    RESULT_DISPLAY.innerText = text.slice(0, text.length - 1);    
}

function clearEquals(target) {
    if (target.id === 'clear') {
        clear();
    } else if (target.id === 'equals') {
        equals();
    };
}

function equals() {
    // if operation not selected do nothing
    if (N.selOperation) {

        // if second number is '' return first number
        let result = (() => {
            if (N.second) {
                if (N.first === '.') N.first = 0;
                if (N.second === '.') N.second = 0;
                return operate(N.first, N.second, N.selOperation.id);
            } else {
                return N.first;
            };
        })();
        
        N.result = result;
        reset();
        display(result * 1, 1);
    };
}

function clear() {
    N.result = '';
    reset();
    display('', 1);
}

function reset() {
    N.current = CURRENTVALUE.first;
    N.first = '';
    N.second = '';
    N.selOperation = '';
}