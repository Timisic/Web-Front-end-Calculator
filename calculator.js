var Calculator = {
    init: function () {
        // Using "this" to ensure access to the Calculator object in subsequent code
        // "isInited" can be dynamically created and doesn't need explicit definition
        // Ensures that initialization only happens once
        var that = this;
        if (!that.isInited) {
            that.isInited = true;
            // Store operation information
            // total: Number, the overall result
            // next: String, the data for the next operation with total
            // action: String, the operator symbol
            that.data = {total: 0, next: '', action: ''};
            that.bindEvent();
        }
    },
    bindEvent: function () {
        var that = this;
        // Get the .cal-keyboard element
        var keyboardElement = document.querySelector(".cal-keyboard");
        keyboardElement && keyboardElement.addEventListener('click', function (event) {
            // Get the currently clicked DOM element
            var target = event.target;
            // Get the "data-action" value of the target
            var action = target.dataset.action;
            // Get the content of the target
            var value = target.innerText;
            if (action === 'num' || action === 'operator') {
                that.result(value, action === 'num');
            }
        });
    },
    result: function (action, isNum) {
        var that = this;
        var data = that.data;
        if (isNum) {
            // Handle numeric input
            data.next = data.next === '0' ? action : (data.next + action);
            !data.action && (data.total = 0);
        } else if (action === 'AC') {
            // Handle 'AC' (clear) action
            data.total = 0;
            data.next = "";
            data.action = "";
        } else if (action === '=') {
            // Handle '=' action
            if (data.next || data.action) {
                data.total = that.calculate(data.total, data.next, data.action);
                data.next = '';
                data.action = '';
            }
        } else if (!data.next) {
            // Handle operator input when there's no "next" data
            data.action = action;
        } else if (data.action) {
            // Handle operator input when there's an existing action
            data.total = that.calculate(data.total, data.next, data.action);
            data.next = '';
            data.action = action;
        } else {
            // Handle cases where data.next is not empty but data.action is not defined
            data.total = +data.next || 0;
            data.next = '';
            data.action = action;
        }
        // Print data
        var valPrint = document.querySelector(".origin-value");
        if (valPrint) {
            var process = data.total + (data.action ? ' ' + data.action + ' ' : '') + data.next;
            valPrint.innerHTML = process || data.next || data.total || '0';
        }
    },
    
    // Arithmetic operations with rounding
    calculate: function (n1, n2, operator) {
        n1 = +n1 || 0;
        n2 = +n2 || 0;
        if (operator === '÷') {
            return n2 === 0 ? 0 : Math.floor((n1 / n2) * 100) / 100;
        } else if (operator === 'x') {
            return Math.floor((n1 * n2) * 100) / 100;
        } else if (operator === '+') {
            return Math.floor((n1 + n2) * 100) / 100;
        } else if (operator === '-') {
            return Math.floor((n1 - n2) * 100) / 100;
        } else if (operator === 'e^x'){
            return Math.floor(Math.exp(n1) * 100) / 100;
        } else if (operator === 'log(x)'){
            return Math.floor(Math.log(n1) * 100) / 100;
        } else if (operator === 'cos(°)'){
            return Math.floor(Math.cos(n1) * 100) / 100;
        } else if (operator === 'sin(°)'){
            return Math.floor(Math.sin(n1) * 100) / 100;
        }
    }
};
// Initialize the Calculator object
Calculator.init();