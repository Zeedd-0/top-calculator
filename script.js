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

const SLOT = {i: 0,};

const N = [];

const RESULT ={
    n: '', // operation result
    cap: 2 + (-1), // numbers allowed before calculate automatically; (- 1) cause works as array index
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
        if (e.target.id in OPERATOR) operation(e.target);
    });
})

BTN_END.forEach(button => {
    button.addEventListener('click', e => {
        clearEquals(e.target);
    });
})

// ----------------------------------

function makeNum(target) {
    if (! N[SLOT.i]) {
        N.push(new OpPair(''));
    };
    if (RESULT.n !== '' || RESULT.n === 0) {
        RESULT.n = '';
    };
    if (target.id === 'dot') {
        if (N[SLOT.i].n.includes('.')) {
            return; // do nothing
        } else {
            if (N[SLOT.i].n === '') {
                N[SLOT.i].n += '0';
            };
        };
    };

    N[SLOT.i].n += target.innerText;
    display()
}

function operation(target) {
    if (! N[SLOT.i]) {
        if (RESULT.n === '' && N[SLOT.i -1 ].n) {
            N[SLOT.i - 1].op = target;
        } else {
            N.push(new OpPair(''));
            if (RESULT.n) {
                N[SLOT.i].n = RESULT.n;
                RESULT.n = '';
            } else {
                N[SLOT.i].n = '0';
            };
        };
    };

    if (SLOT.i + 1 > RESULT.cap) {
        equals();
        operation(target);
    } else {
        N[SLOT.i].op = target;
        SLOT.i++;
        display();
    };
};

function equals() {
    RESULT.n = (() => {
        if (N[SLOT.i]) {
            return operate(N[SLOT.i - 1].n, N[SLOT.i].n, N[SLOT.i - 1].op.id).toString();
        } else {
            return RESULT.n = N[SLOT.i - 1].n;
        };
    })();
    display(RESULT.n, 1);
    reset();
}

function clearEquals(target) {
    if (target.id === 'clear') {
        clear();
    } else if (target.id === 'equals') {
        equals();
    };
}

function clear() {
    RESULT.n = '';
    reset();
    display('', 1);
}

function reset() {
    SLOT.i = 0;
    N.splice(0);
}

function display(text = '', result = 0) {
    if (result) {
        RESULT_DISPLAY.innerText = text
    } else {
        RESULT_DISPLAY.innerText = N
        .reduce((string, addStr, i) => {
            return string.concat(
                Object.values(addStr)
                .reduce((prev, curr) => {
                    return prev.concat(
                        (typeof curr === 'string') ? curr : curr.innerText);
                    }, '')
                )
            }, '')
    };
};

// <<<<<<<<<<<<<<<<<<<<<<< o ADD A LIMIT OF DIGITS PLUS CHARACTERS
// <<<<<<<<<<<<<<<<<<<<<<< o GOTTA MAKE OPERATION DISPLAY SHOW OPERATION
//                         AND RESULT DISPLAY TO SHOW ONLY RESULT