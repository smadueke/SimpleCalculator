import './styles.css';

function App() {
  return (
    /*This div container contains the whole calculator*/
    <div className="calculator-grid">
      {/* This div contains the output portion of the calculator */}
      <div className="output">
        <div className="previous-operand">69696969</div>
        <div className="current-operand">69</div>
      </div>
      {/*Creates a button that will span two grid/columns spots */}
      <button className="span-two">AC</button>
      <button>DEL</button>
      <button>÷</button>
      <button>1</button>
      <button>2</button>
      <button>3</button>
      <button>*</button>
      <button>4</button>
      <button>5</button>
      <button>6</button>
      <button>+</button>
      <button>7</button>
      <button>8</button>
      <button>9</button>
      <button>-</button>
      <button>.</button>
      <button>0</button>
      <button className="span-two">=</button>
    </div>
  );
}

export default App;
