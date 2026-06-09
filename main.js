const currentOpText = document.getElementById('current-operation');
const previousOpText = document.getElementById('previous-operation');

let currentOperand = '0';
let previousOperand = '';
let operation = undefined;

function updateDisplay() {
    currentOpText.innerText = currentOperand;
    if (operation != null) {
        previousOpText.innerText = `${previousOperand} ${operation}`;
    } else {
        previousOpText.innerText = '';
    }
}

function appendNumber(number) {
    // Evita múltiplos pontos decimais
    if (number === '.' && currentOperand.includes('.')) return;
    
    // Substitui o 0 inicial pelo número digitado
    if (currentOperand === '0' && number !== '.') {
        currentOperand = number.toString();
    } else {
        currentOperand = currentOperand.toString() + number.toString();
    }
    updateDisplay();
}

function appendOperator(op) {
    if (currentOperand === '') return;
    if (previousOperand !== '') {
        calculate();
    }
    operation = op;
    previousOperand = currentOperand;
    currentOperand = '0';
    updateDisplay();
}

// Gambiarra apenas para mapear o botão "3" que chama uma função específica no HTML
function clickBtn3(number) {
    appendNumber(number);
}

function clearDisplay() {
    currentOperand = '0';
    previousOperand = '';
    operation = undefined;
    updateDisplay();
}

function deleteLast() {
    if (currentOperand === '0') return;
    if (currentOperand.length === 1) {
        currentOperand = '0';
    } else {
        currentOperand = currentOperand.slice(0, -1);
    }
    updateDisplay();
}

function calculate() {
    let computation;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    
    if (isNaN(prev) || isNaN(current)) return;
    
    switch (operation) {
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case '*':
            computation = prev * current;
            break;
        case '/':
            if (current === 0) {
                alert("Erro: Divisão por zero!");
                clearDisplay();
                return;
            }
            computation = prev / current;
            break;
        default:
            return;
    }
    
    // Limita as casas decimais para não estourar a tela
    currentOperand = +computation.toFixed(5);
    operation = undefined;
    previousOperand = '';
    updateDisplay();
}
