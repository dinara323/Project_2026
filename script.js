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
    const themeIndicator = document.getElementById('theme-toggle');
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