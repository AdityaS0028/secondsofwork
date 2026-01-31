import React, { useState } from 'react';

export const Calculator: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const performOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue: number, secondValue: number, operation: string): number => {
    switch (operation) {
      case '+': return firstValue + secondValue;
      case '-': return firstValue - secondValue;
      case '*': return firstValue * secondValue;
      case '/': return firstValue / secondValue;
      case '=': return secondValue;
      default: return secondValue;
    }
  };

  const performCalculation = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  return (
    <div className="p-4 flex flex-col items-center">
      {/* Display */}
      <div className="w-full max-w-[200px] mb-4">
        <div className="bg-white border-2 border-gray-400 p-2 text-right text-xl font-mono shadow-inner h-10 flex items-center justify-end">
          {display}
        </div>
      </div>

      {/* Keypad - Using flexbox instead of grid to avoid overlap issues */}
      <div className="w-full max-w-[200px]">
        {/* Row 1: Clear, Divide, Multiply, Subtract */}
        <div className="flex gap-1 mb-1">
          <button 
            onClick={clear}
            className="flex-1 h-10 bg-red-400 text-white text-sm font-bold rounded shadow active:shadow-inner active:translate-y-px"
          >
            C
          </button>
          <button 
            onClick={() => performOperation('/')}
            className="flex-1 h-10 bg-gray-200 text-sm font-bold rounded shadow active:shadow-inner active:translate-y-px"
          >
            ÷
          </button>
          <button 
            onClick={() => performOperation('*')}
            className="flex-1 h-10 bg-gray-200 text-sm font-bold rounded shadow active:shadow-inner active:translate-y-px"
          >
            ×
          </button>
          <button 
            onClick={() => performOperation('-')}
            className="flex-1 h-10 bg-gray-200 text-sm font-bold rounded shadow active:shadow-inner active:translate-y-px"
          >
            -
          </button>
        </div>

        {/* Row 2: 7, 8, 9, + */}
        <div className="flex gap-1 mb-1">
          <button 
            onClick={() => inputNumber('7')}
            className="flex-1 h-10 bg-gray-100 text-sm font-bold rounded shadow active:shadow-inner active:translate-y-px"
          >
            7
          </button>
          <button 
            onClick={() => inputNumber('8')}
            className="flex-1 h-10 bg-gray-100 text-sm font-bold rounded shadow active:shadow-inner active:translate-y-px"
          >
            8
          </button>
          <button 
            onClick={() => inputNumber('9')}
            className="flex-1 h-10 bg-gray-100 text-sm font-bold rounded shadow active:shadow-inner active:translate-y-px"
          >
            9
          </button>
          <button 
            onClick={() => performOperation('+')}
            className="flex-1 h-10 bg-gray-200 text-sm font-bold rounded shadow active:shadow-inner active:translate-y-px"
          >
            +
          </button>
        </div>

        {/* Row 3: 4, 5, 6 */}
        <div className="flex gap-1 mb-1">
          <button 
            onClick={() => inputNumber('4')}
            className="flex-1 h-10 bg-gray-100 text-sm font-bold rounded shadow active:shadow-inner active:translate-y-px"
          >
            4
          </button>
          <button 
            onClick={() => inputNumber('5')}
            className="flex-1 h-10 bg-gray-100 text-sm font-bold rounded shadow active:shadow-inner active:translate-y-px"
          >
            5
          </button>
          <button 
            onClick={() => inputNumber('6')}
            className="flex-1 h-10 bg-gray-100 text-sm font-bold rounded shadow active:shadow-inner active:translate-y-px"
          >
            6
          </button>
          <div className="flex-1" /> {/* Empty spacer */}
        </div>

        {/* Row 4: 1, 2, 3, = */}
        <div className="flex gap-1 mb-1">
          <button 
            onClick={() => inputNumber('1')}
            className="flex-1 h-10 bg-gray-100 text-sm font-bold rounded shadow active:shadow-inner active:translate-y-px"
          >
            1
          </button>
          <button 
            onClick={() => inputNumber('2')}
            className="flex-1 h-10 bg-gray-100 text-sm font-bold rounded shadow active:shadow-inner active:translate-y-px"
          >
            2
          </button>
          <button 
            onClick={() => inputNumber('3')}
            className="flex-1 h-10 bg-gray-100 text-sm font-bold rounded shadow active:shadow-inner active:translate-y-px"
          >
            3
          </button>
          <button 
            onClick={performCalculation}
            className="flex-1 h-10 bg-teal-400 text-white text-sm font-bold rounded shadow active:shadow-inner active:translate-y-px"
          >
            =
          </button>
        </div>

        {/* Row 5: 0, . */}
        <div className="flex gap-1">
          <button 
            onClick={() => inputNumber('0')}
            className="flex-[2] h-10 bg-gray-100 text-sm font-bold rounded shadow active:shadow-inner active:translate-y-px"
          >
            0
          </button>
          <button 
            onClick={inputDecimal}
            className="flex-1 h-10 bg-gray-100 text-sm font-bold rounded shadow active:shadow-inner active:translate-y-px"
          >
            .
          </button>
          <div className="flex-1" /> {/* Empty spacer */}
        </div>
      </div>

      {/* Paper Tape Button */}
      <div className="mt-4 text-center">
        <button 
          onClick={() => alert('Paper tape feature coming soon!')}
          className="px-3 py-1 text-xs bg-gray-200 rounded shadow active:shadow-inner active:translate-y-px"
        >
          Show Paper Tape
        </button>
      </div>
    </div>
  );
};
