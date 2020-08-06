import Vue from 'vue'

new Vue({
  el: '#app',
  data: {
    equation: '0',
    //检查输入小数点是否超过一位
    isDecimalAdded: false,
    //判断是否已输入+/-/×/÷
    isOperatorAdded: false,
    //判断是否已输入数字
    issStarted: false
  },
  methods: {
    //判断计算器（character）是否加/减/乘/除
    isOperator(character) {
      return ['+', '-', '×', '÷'].indexOf(character) > -1
    },

    //判断计算器是否按下数字键或加/减/乘/除
    append(character) {
      // Start
      if (this, this.equation === '0' && !this.isOperator(character)) {
        if (character === '.') {
          this.equation += '' + character
          this.isDecimalAdded = true
        } else {
          this.equation = '' + character
        }

        this.issStarted = true
        return
      }

      // if Number
      if (!this.isOperator(character)) {
        if (character === '.' && this.isDecimalAdded) {
          return
        }

        if (character === '.') {
          this.isDecimalAdded = true
          this.isOperatorAdded = true
        } else {
          this.isOperatorAdded = false
        }

        this.equation += '' + character
      }

      //Added Operator
      if (this.isOperator(character) && !this.isOperatorAdded) {
        this.equation += '' + character
        this.isDecimalAdded = false
        this.isOperatorAdded = true
      }
    },
    // 按下"=" 
    calculate() {
      let result = this.equation.replace(new RegExp('×', 'g'), '*').replace('÷','g', '/')

      this.equation = parseFloat(eval(result).toFixed(9)).toString()
      this.isDecimalAdded = false
      this.isOperatorAdded = false
    },
    // 按下 "+/-"
    calculateToggle() {
      if (this.isOperatorAdded || !this.issStarted) {
        return
      }

      this.equation = this.equation + '* -1'
      this.calculate()
    },
    // 按下 "%"
    calculatePercentage() {
      if (this.isOperatorAdded || !this.issStarted) {
        return
      }

      this.equation = this.equation + '* 0.01'
      this.calculate()
    },
    // 按下 "AC"
    clear() {
      this.equation = '0'
      this.isDecimalAdded = false
      this.isOperatorAdded = false
      this.issStarted = false
    }
  }
})
