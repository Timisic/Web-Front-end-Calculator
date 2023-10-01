## **Blog Requirements**

1.Give the PSP form for this work.

2.Description of problem-solving ideas. This is the process of how to think and how to find information after getting the title at the beginning.

3.Design and implementation process. The design includes how the code is organized and the flow chart of the key functions.

4.Code description. Show the key code of the project and explain the idea.

**5.Displaying result functions with screenshots ((or gifs) and text descriptions.??**

6.Summarize this assignment.



# 1. PSP form

| **Personal Software Process Stages**    | Estimated Time（minutes） | Actual Time（minutes） |
| :-------------------------------------- | :------------------------ | :--------------------- |
| **Planning (Total)**                    | **500**                   | **700**                |
| • Estimate (preparation)                | 500                       | 700                    |
| **Development (Total)**                 | **340**                   | **450**                |
| • Analysis                              | 30                        | 50                     |
| • Design Spec                           | 10                        | 20                     |
| • Design Review                         | 10                        | 30                     |
| • Coding Standard                       | 10                        | 10                     |
| • Design                                | 70                        | 40                     |
| • Coding                                | 120                       | 200                    |
| • Code Review                           | 60                        | 70                     |
| • Test                                  | 30                        | 30                     |
| **Reporting (Total)**                   | **120**                   | **100**                |
| • Test Report                           | 0                         | 0                      |
| • Size Measurement                      | 0                         | 0                      |
| • Postmortem & Process Improvement Plan | 120                       | 100                    |
| **Sum**                                 | **960**                   | **1250**               |

# 2. Description of problem-solving ideas

### Think

This is a calculator project that requires a frontend webpage. Firstly, I need to learn the frontend trio of HTML/CSS/JavaScript, and this project can serve as a practical endeavor.

### Find information

To gain insights into a project, I explore various channels such as CSDN, Bilibili, and platforms like Zhihu. Initially, I search for frontend projects related to the title and gradually delve into what I envision for the project. Then, I start with the preliminary learning of the frontend trio, gaining a better understanding of the entire project after further exploration. In fact, after completing the frontend trio, I discovered that I could implement all the functions of a simple calculator using just these three tools.



# 3. Design and implementation process

### How the code is organized？

In terms of file organization, the code is divided into three files: .html, .css, and .js. These files are used to implement the character part, aesthetic styles, and logical operations of the calculator, respectively. Distinguishing the code into these three parts allows me to write the corresponding functionalities effectively, making the code modular.

### Flow chart of my key function

![image-20230930220530429](C:\Users\10170\AppData\Roaming\Typora\typora-user-images\image-20230930220530429.png)

# 4. Code Description

This is my Javascript code about the logic part.

```js
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
        var valPrint = document.querySelector(".origin-value");
        // Print data
        valPrint && (valPrint.innerHTML = data.next || data.total || '0');
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
```



# 5. Result function

This is my calculator.

![image-20230930221356533](C:\Users\10170\AppData\Roaming\Typora\typora-user-images\image-20230930221356533.png)

```js
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
        var valPrint = document.querySelector(".origin-value");
        // Print data
        valPrint && (valPrint.innerHTML = data.next || data.total || '0');
    }
```

# 6. Summary

Regarding this Assignment, my main takeaway is focused on learning frontend knowledge and the process of practical application. Since a calculator is a tool we are familiar with, we can easily design this project, although there are still some rough spots. Of course, this entire Assignment not only familiarized me with development knowledge and tools but also made me familiar with the simple development process, including conceptualization, design, coding, testing, and summarizing.

Concerning this calculator, it can be simplified into appearance (i.e., frontend) and operations. The main challenge in the entire project lies in passing information collected from the frontend to the operations for processing and then returning it to the frontend. Due to my limited knowledge of HTML, CSS, and JavaScript, I spent more time testing and coding simultaneously. This may differ significantly from the formal development process and was quite time-consuming.

Regarding future development plans, I believe it would be beneficial to add more features to this calculator. With such requirements, JavaScript alone might not be up to the task. Therefore, learning backend development might need to be prioritized to make the calculator's functionality more robust and comprehensive.