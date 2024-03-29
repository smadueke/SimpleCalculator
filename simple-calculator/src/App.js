import {useReducer} from "react"
import OperationButton from "./OperationButton";
import DigitButton from "./DigitButton";
import './styles.css';


/*The actions to be preformed in our calculator*/
export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CHOOSE_OPERATION: 'choose-operation',
  CLEAR: 'clear',
  DELETE_DIGIT: 'delete-digit',
  EVALUATE: 'evaluate'
}

/*Will handle the calculation part of the project */
function reducer(state, {type, payload}) {
  switch(type) {
    case ACTIONS.ADD_DIGIT:
      if (payload.digit === "0" && state.currentOperand === "0") return state
      if (payload.digit === "." && state.currentOperand.includes(".")) return state
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      }
    case ACTIONS.CLEAR:
      return {}
    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOperand == null && state.previousOperand == null) {
        return state
      }
      //if (state.currentOperand == null && state.previousOperand != null) return state

      if (state.currentOperand == null) {
        return {
          ...state,
          opertation: payload.operation
        }
      }
      if (state.previousOperand == null) {
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null
        }
      }
      return {
        ...state, 
        previousOperand: evaluate(state),
        operation: payload.operation,
        currentOperand: null
      }
    case ACTIONS.DELETE_DIGIT:
      if (state.currentOperand == null) return state
      return {
        ...state,
        //currentOperand: /* Remove last element. Maybe a pop*/
      }
    case ACTIONS.EVALUATE:
      if (state.currentOperand == null || state.previousOperand == null) return state
      return {
        ...state,
        currentOperand: evaluate(state)
      }

  }

}

function evaluate({currentOperand, previousOperand, operation}) {
  const prev = parseFloat(previousOperand)
  const current = parseFloat(currentOperand)
  if (isNaN(prev) || isNaN(current)) return ""
  let computation = ""
  switch(operation) {
    case "+":
      computation = prev + current
      break
    case "-":
      computation = prev - current
      break
    case "*":
      computation = prev * current
      break
    case "÷":
      computation = prev / current
      break
  }

  return computation.toString()

}



function App() {
  const [{currentOperand, previousOperand, operation}, dispatch] = useReducer(reducer, {})
  return (
    /*This div container contains the whole calculator*/
    <div className="calculator-grid">
      {/* This div contains the output portion of the calculator */}
      <div className="output">
        <div className="previous-operand">{previousOperand} {operation}</div>
        <div className="current-operand">{currentOperand}</div>
      </div>
      {/*Creates a button that will span two grid/columns spots */}
      <button className="span-two" onClick={() => dispatch({type: ACTIONS.CLEAR})}>AC</button>
      <button>DEL</button>

      <OperationButton operation = "÷" dispatch={dispatch} />
      <DigitButton digit = "1" dispatch={dispatch} />
      <DigitButton digit = "2" dispatch={dispatch} />
      <DigitButton digit = "3" dispatch={dispatch} />
      <OperationButton operation = "*" dispatch={dispatch} />
      <DigitButton digit = "4" dispatch={dispatch} />
      <DigitButton digit = "5" dispatch={dispatch} />
      <DigitButton digit = "6" dispatch={dispatch} />
      <OperationButton operation = "+" dispatch={dispatch} />
      <DigitButton digit = "7" dispatch={dispatch} />
      <DigitButton digit = "8" dispatch={dispatch} />
      <DigitButton digit = "9" dispatch={dispatch} />
      <OperationButton operation = "-" dispatch={dispatch} />
      <DigitButton digit = "." dispatch={dispatch} />
      <DigitButton digit = "0" dispatch={dispatch} />
      <button className="span-two" onClick={() => dispatch({type: ACTIONS.EVALUATE})}>=</button>
    </div>
  );
}

export default App;
