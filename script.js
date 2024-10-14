// ==================================
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

// ==================================
function operate(fNum, sNum, operation) {
    return operator[operation](fNum, sNum);
}

// ==================================
let fNum = 0;
let sNum = 0;
const operator = {
    add: add,
    sub: subtract,
    mult: multiply,
    div: divide,
    };