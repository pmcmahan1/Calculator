/*
Going to be honest here, I was able to make this calculator work so efficiently
by watching Youtube videos and searching on sites such as Stackoverflow. The 
CSS stylizing was done entirely by myself, but that part is simple compared to
the Javascript. I'm still not entirely sure how some functions work but hey,
it works pretty well!
*/

class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }
    // to clear simply sets the results strings to blank
    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }
    //the C key function, slices the last integer from currentOperand
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }
    //Adds whatever number you clicked, makes a string, does not add another
    // . if one already exists in the currentOperand
    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    // After selecting your operator, calls the compute function to do the math
    chooseOperation(operation) {
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }


    // Uses switch, with each case being whatever operator you select
    compute() {
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case 'x':
                computation = prev * current
                break     
            case '÷':
                computation = prev / current
                break
            default:
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', { 
            maximumFractionDigits: 0})
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = 
        this.getDisplayNumber(this.currentOperand)
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = 
                `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
            this.previousOperandTextElement.innerText = ''
        }
    }
}

// Calling all the variables from the html using their data tags
const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operate]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const clearButton = document.querySelector('[data-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')


const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)


// Event listener for the numbers buttons, calls the appendNumber function.
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})


// Event listener for all the operators, calls the chooseOperation function
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})


// Event listener for the equals button, calls the compute function
equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})


// Event listener for the AC button, calls the clear function
clearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})


// Event listener for the C button, calls the delete function
deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})