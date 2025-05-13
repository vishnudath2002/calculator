import React, { useState } from 'react';
import './App.css';

function App() {
  const [calc, setCalc] = useState('');
  const [result, setResult] = useState('');

  const operators = ['/', '*', '+', '-', '.'];

  const updateCalc = (value) => {
    // Don't allow operators at the start except minus
    if (
      (operators.includes(value) && calc === '' && value !== '-') ||
      // Don't allow consecutive operators
      (operators.includes(value) && operators.includes(calc.slice(-1)))
    ) {
      return;
    }

    setCalc(calc + value);

    // Calculate result in real-time
    if (!operators.includes(value)) {
      try {
        setResult(eval(calc + value).toString());
      } catch (error) {
        // Handle potential eval errors
      }
    }
  };

  // Create digits 1-9
  const createDigits = () => {
    const digits = [];
    
    for (let i = 1; i < 10; i++) {
      digits.push(
        <button 
          key={i} 
          onClick={() => updateCalc(i.toString())}
          className="button"
        >
          {i}
        </button>
      );
    }
    
    return digits;
  };

  const calculate = () => {
    try {
      // Prevent calculation if the expression ends with an operator
      if (operators.includes(calc.slice(-1))) return;
      
      setCalc(eval(calc).toString());
      setResult('');
    } catch (error) {
      setCalc('Error');
      setTimeout(() => setCalc(''), 1000);
    }
  };

  const deleteLast = () => {
    if (calc === '') {
      return;
    }

    const value = calc.slice(0, -1);
    setCalc(value);
    
    // Update result after deletion
    try {
      if (value === '') {
        setResult('');
      } else if (!operators.includes(value.slice(-1))) {
        setResult(eval(value).toString());
      }
    } catch {
      setResult('');
    }
  };

  const clearAll = () => {
    setCalc('');
    setResult('');
  };

  return (
    <div className="App">
      <div className="calculator">
        <div className="display">
          <div className="result">{result ? `(${result})` : ''}</div>
          <div className="current-calc">{calc || '0'}</div>
        </div>

        <div className="buttons-grid">
          <button className="button clear" onClick={clearAll}>
            AC
          </button>
          <button className="button operator" onClick={deleteLast}>
            DEL
          </button>
          <button className="button operator" onClick={() => updateCalc('/')}>
            ÷
          </button>
          <button className="button operator" onClick={() => updateCalc('*')}>
            ×
          </button>
          {createDigits()}
          <button className="button operator" onClick={() => updateCalc('-')}>
            −
          </button>
          <button className="button digit-0" onClick={() => updateCalc('0')}>
            0
          </button>
          <button className="button" onClick={() => updateCalc('.')}>
            .
          </button>
          <button className="button operator" onClick={() => updateCalc('+')}>
            +
          </button>
          <button className="button equals" onClick={calculate}>
            =
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;