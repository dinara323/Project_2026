window.onload = function() {
    // --- Переменные для хранения состояния калькулятора ---
    let a = '';                     // Первое число (хранится как строка)
    let b = '';                     // Второе число (хранится как строка)
    let selectedOperation = null;    // Выбранная операция ('+', '-', 'x', '/')
    let expressionResult = '';       // Результат вычисления

    // --- Получаем ссылки на элементы интерфейса ---
    // Элемент для вывода результата (экран калькулятора)
    const outputElement = document.getElementById('result');
    
    // Находим все кнопки с цифрами (включая точку)
    // Селектор [id ^= "btn_digit_"] ищет все элементы, чей id НАЧИНАЕТСЯ с "btn_digit_"
    const digitButtons = document.querySelectorAll('[id ^= "btn_digit_"]');

    // --- Функция обработки нажатия на цифровые кнопки ---
    // Принимает цифру (как строку), которую нажал пользователь
    function onDigitButtonClicked(digit) {
        // Если операция еще не выбрана - работаем с первым числом (a)
        if (!selectedOperation) {
            // Запрещаем добавление второй точки в число
            if ((digit !== '.') || (digit === '.' && !a.includes('.'))) {
                a += digit;  // Добавляем цифру в конец строки a
            }
            outputElement.innerHTML = a;  // Обновляем экран
        } 
        // Если операция уже выбрана - работаем со вторым числом (b)
        else {
            // Запрещаем добавление второй точки в число
            if ((digit !== '.') || (digit === '.' && !b.includes('.'))) {
                b += digit;  // Добавляем цифру в конец строки b
            }
            outputElement.innerHTML = b;  // Обновляем экран
        }
    }

    // --- Назначаем обработчики для всех цифровых кнопок ---
    digitButtons.forEach(button => {
        button.onclick = function() {
            // this.innerHTML содержит текст на кнопке (цифру или точку)
            const digitValue = this.innerHTML;
            onDigitButtonClicked(digitValue);  // Вызываем функцию с цифрой
        };
    });

    // --- Обработчик для кнопки сложения ---
    document.getElementById('btn_op_plus').onclick = function() {
        // Не даем выбрать операцию, если первое число пустое
        if (a === '') return;
        
        selectedOperation = '+';  // Запоминаем выбранную операцию
        console.log('Выбрано сложение');  // Для отладки (можно удалить)
    };

    // --- Обработчик для кнопки очистки (C) ---
    document.getElementById('btn_op_clear').onclick = function() {
        // Сбрасываем все переменные в исходное состояние
        a = '';
        b = '';
        selectedOperation = null;
        expressionResult = '';
        outputElement.innerHTML = '0';  // Показываем 0 на экране
    };

    // --- Обработчик для кнопки "равно" ---
    document.getElementById('btn_op_equal').onclick = function() {
        // Проверяем, есть ли все необходимые данные для вычисления
        if (a === '' || b === '' || !selectedOperation) {
            return;  // Если чего-то не хватает - ничего не делаем
        }

        // Преобразуем строки в числа с помощью унарного плюса
        const numA = +a;
        const numB = +b;

        // Выполняем операцию в зависимости от selectedOperation
        switch (selectedOperation) {
            case '+':  // Если выбрано сложение
                expressionResult = numA + numB;
                break;
            // Здесь можно будет добавить другие операции
            // case '-':
            //     expressionResult = numA - numB;
            //     break;
            // case 'x':
            //     expressionResult = numA * numB;
            //     break;
            // case '/':
            //     expressionResult = numA / numB;
            //     break;
            default:
                // Если операция не распознана (на всякий случай)
                break;
        }

        // Обновляем состояние калькулятора после вычисления
        a = expressionResult.toString();  // Результат становится первым числом
        b = '';                            // Очищаем второе число
        selectedOperation = null;          // Сбрасываем операцию

        // Показываем результат на экране
        outputElement.innerHTML = a;
    };

    // ========== КОД ДЛЯ МОДАЛЬНОГО ОКНА "ОБ АВТОРЕ" ==========
    
    // Получаем ссылки на элементы модального окна
    const modal = document.getElementById('author-modal');      // Само модальное окно
    const authorLink = document.getElementById('author-link');  // Ссылка "Об авторе"
    const closeBtn = document.querySelector('.close-btn');      // Кнопка закрытия (крестик)

    // Открываем модальное окно при клике на ссылку "Об авторе"
    authorLink.onclick = function(event) {
        event.preventDefault();  // Отменяем стандартное поведение ссылки (чтобы не перезагружалась страница)
        modal.style.display = 'block';  // Показываем модальное окно
    };

    // Закрываем модальное окно при клике на крестик
    closeBtn.onclick = function() {
        modal.style.display = 'none';  // Скрываем модальное окно
    };

    // Закрываем модальное окно при клике вне его области (на затемненный фон)
    window.onclick = function(event) {
        if (event.target == modal) {  // Если кликнули именно на затемненный фон (сам modal)
            modal.style.display = 'none';  // Скрываем модальное окно
        }
    };

}; // Конец window.onload