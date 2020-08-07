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
    issStarted: false,
    // 解决当按 "=" 获得结果时，再按数字清空答案
    isEntering: false
  },
  methods: {
    //判断计算器（character）是否加/减/乘/除
    isOperator(character) {
      return ['+', '-', '×', '÷'].indexOf(character) > -1
    },

    //判断计算器是否按下数字键或加/减/乘/除
    append(character) {
      // 输入第一位数字
      if (this.equation === '0' && !this.isOperator(character)) {
        if (character === '.') {
          this.equation += '' + character
          this.isDecimalAdded = true
        } else {
          this.equation = '' + character

          this.isEntering = true
        }
        this.issStarted = true
        return
      }

      // if Number
      if (!this.isOperator(character)) {
        if (character === '.' && this.isDecimalAdded) {
          return
        }
        //解决重复输入小数点
        if (character === '.') {
          this.isDecimalAdded = true
          this.isOperatorAdded = true
        } else {
          this.isOperatorAdded = false
        }

        if (!this.isEntering) {
          this.isEntering = true
          this.equation = "" + character
          return
        }

        this.equation += '' + character
      }

      //Added Operator
      if (this.isOperator(character) && !this.isOperatorAdded) {
        this.equation += '' + character
        this.isDecimalAdded = false
        this.isOperatorAdded = true

        this.isEntering = true
      }
    },
    // 按下"=" 
    calculate() {
      let result = this.equation.replace(new RegExp('×', 'g'), '*').replace('÷','g', '/')			
      this.equation = parseFloat(eval(result).toFixed(9)).toString()

      let ans = eval(result)
			this.equation = (ans < 1.0e9 ? parseFloat(ans.toFixed(9)):ans.toExponential(3)).toString()

      this.isDecimalAdded = false
      this.isOperatorAdded = false

      this.isEntering = false
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

      this.isEntering = false
    }
  }
})
