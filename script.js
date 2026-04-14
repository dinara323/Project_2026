window.onload = function() {
    let a = '';
    let b = '';
    let expressionResult = '';
    let selectedOperation = null;

    const outputElement = document.getElementById('result');
    
    const digitButtons = document.querySelectorAll('[id ^= "btn_digit_"]');

    function onDigitButtonClicked(digit) {
        if (!selectedOperation) {
            if ((digit != '.') || (digit == '.' && !a.includes('.'))) {
                a += digit;
            }
            outputElement.innerHTML = a;
        } 
        else {
            if ((digit != '.') || (digit == '.' && !b.includes('.'))) {
                b += digit;
                outputElement.innerHTML = b;        
            }
        }
    }

    digitButtons.forEach(button => {
        button.onclick = function() {
            const digitValue = this.innerHTML;
            onDigitButtonClicked(digitValue);
        };
    });

    document.getElementById("btn_op_mult").onclick = function() { 
        if (a === '') return;
        selectedOperation = 'x';
    }
    document.getElementById("btn_op_plus").onclick = function() { 
        if (a === '') return;
        selectedOperation = '+';
    }
    document.getElementById("btn_op_minus").onclick = function() { 
        if (a === '') return;
        selectedOperation = '-';
    }
    document.getElementById("btn_op_div").onclick = function() { 
        if (a === '') return;
        selectedOperation = '/';
    }

    document.getElementById("btn_op_sign").onclick = function() { 
        if (!selectedOperation) {
            if (a === '') return;
            if (a.startsWith('-')) {
                a = a.substring(1);
            } else {
                a = '-' + a;
            }
            outputElement.innerHTML = a;
        } 
        else {
            if (b === '') return;
            if (b.startsWith('-')) {
                b = b.substring(1);
            } else {
                b = '-' + b;
            }
            outputElement.innerHTML = b;
        }
    }

    document.getElementById("btn_op_percent").onclick = function() { 
        if (!selectedOperation) {
            if (a === '') return;
            const numA = parseFloat(a);
            a = (numA / 100).toString();
            outputElement.innerHTML = a;
        } 
        else {
            if (b === '' || a === '') return;
            const numA = parseFloat(a);
            const numB = parseFloat(b);
            const percentValue = (numA * numB) / 100;
            b = percentValue.toString();
            outputElement.innerHTML = b;
        }
    }

    document.getElementById("btn_op_square").onclick = function() {
    let currentNumber;
    if (!selectedOperation) {
        currentNumber = a;
    } else {
        currentNumber = b;
    }
    
    if (currentNumber === '') return;
    
    let num = parseFloat(currentNumber);
    let result = num * num;
    
    if (!selectedOperation) {
        a = result.toString();
        outputElement.innerHTML = a;
    } else {
        b = result.toString();
        outputElement.innerHTML = b;
    }
}

document.getElementById("btn_op_000").onclick = function() { 
    if (!selectedOperation) {
        if (a === '') {
            a = '0';
        }
        a += '000';
        outputElement.innerHTML = a;
    } 
    else {
        if (b === '') {
            b = '0';
        }
        b += '000';
        outputElement.innerHTML = b;
    }
}

document.getElementById("btn_op_sqrt").onclick = function() {
    let number = outputElement.innerHTML;
    
    if (number === '0') return;
    
    let value = parseFloat(number);
    
    if (value < 0) {
        outputElement.innerHTML = 'Error';
        return;
    }
    
    let result = Math.sqrt(value);
    
    outputElement.innerHTML = result;
    
    if (!selectedOperation) {
        a = result.toString();
    } else {
        b = result.toString();
    }
}

    document.getElementById("btn_op_clear").onclick = function() { 
        a = '';
        b = '';
        selectedOperation = '';
        expressionResult = '';
        outputElement.innerHTML = 0;
    }

    document.getElementById("btn_op_equal").onclick = function() { 
        if (a === '' || b === '' || !selectedOperation)
            return;

        switch(selectedOperation) { 
            case 'x':
                expressionResult = (+a) * (+b);
                break;
            case '+':
                expressionResult = (+a) + (+b);
                break;
            case '-':
                expressionResult = (+a) - (+b);
                break;
            case '/':
                expressionResult = (+a) / (+b);
                break;
            default:
                break;
        }

        a = expressionResult.toString();
        b = '';
        selectedOperation = null;

        outputElement.innerHTML = a;
    }


document.getElementById("btn_op_backspace").onclick = function() {
    if (!selectedOperation) {
        if (a === '') return;
        
        a = a.slice(0, -1);
        
        if (a === '') {
            outputElement.innerHTML = '0';
        } else {
            outputElement.innerHTML = a;
        }
    } 
    else {
        if (b === '') return;
        
        b = b.slice(0, -1);
        
        if (b === '') {
            outputElement.innerHTML = '0';
        } else {
            outputElement.innerHTML = b;
        }
    }
}



    // показать калькулятор
    const calculatorContainer = document.getElementById('calculator-container');
    const calculatorLink = document.getElementById('calculator-link');
    
    let isCalculatorVisible = false;
    
    calculatorLink.onclick = function(event) {
        event.preventDefault();
        
        if (isCalculatorVisible) {
            calculatorContainer.style.display = 'none';
            isCalculatorVisible = false;
        } else {
            calculatorContainer.style.display = 'flex';
            isCalculatorVisible = true;
        }
    };

    // тема
    const themeIndicator = document.getElementById('theme-indicator');
    let isDarkTheme = true;
    
    themeIndicator.onclick = function() {
        const body = document.body;
        
        if (isDarkTheme) {
            body.classList.add('light-theme');
            themeIndicator.innerHTML = '☀️';
            themeIndicator.style.backgroundColor = '#4a6fa5';
            isDarkTheme = false;
        } else {
            body.classList.remove('light-theme');
            themeIndicator.innerHTML = '🌙';
            themeIndicator.style.backgroundColor = '#ff9801';
            isDarkTheme = true;
        }
    };
    
    // об авторе
    const authorLink = document.getElementById('author-link');
    const tooltip = document.querySelector('.author-tooltip');
    
    authorLink.onmouseenter = function() {
        tooltip.style.display = 'block';
    };
    
    authorLink.onmouseleave = function() {
        tooltip.style.display = 'none';
    };
    
    authorLink.onclick = function(event) {
        event.preventDefault();
    };
};