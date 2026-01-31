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

  const Button = ({ 
    label, 
    onClick, 
    className = '',
    wide = false 
  }: { 
    label: string | React.ReactNode; 
    onClick: () => void; 
    className?: string;
    wide?: boolean;
  }) => (
    <button
      onClick={onClick}
      className={`
        mac-button h-10 text-sm font-bold
        ${wide ? 'col-span-2' : ''}
        ${className}
      `}
    >
      {label}
    </button>
  );

  return (
    <div className="p-4 w-56 mx-auto">
      {/* Display */}
      <div className="mac-group-box mb-4 p-2">
        <div className="bg-white border border-[#808080] p-2 text-right text-xl font-mono shadow-inner">
          {display}
        </div>
      </div>

      {/* Keypad */}
      <div className="grid grid-cols-4 gap-1">
        <Button label="C" onClick={clear} className="bg-[#FF6B6B] text-white border-red-600" />
        <Button label="÷" onClick={() => performOperation('/')} />
        <Button label="×" onClick={() => performOperation('*')} />
        <Button label="-" onClick={() => performOperation('-')} />

        <Button label="7" onClick={() => inputNumber('7')} />
        <Button label="8" onClick={() => inputNumber('8')} />
        <Button label="9" onClick={() => inputNumber('9')} />
        <Button label="+" onClick={() => performOperation('+')} className="row-span-2 h-auto" />

        <Button label="4" onClick={() => inputNumber('4')} />
        <Button label="5" onClick={() => inputNumber('5')} />
        <Button label="6" onClick={() => inputNumber('6')} />

        <Button label="1" onClick={() => inputNumber('1')} />
        <Button label="2" onClick={() => inputNumber('2')} />
        <Button label="3" onClick={() => inputNumber('3')} />
        <Button label="=" onClick={performCalculation} className="row-span-2 h-auto bg-[#4ECDC4] border-teal-600" />

        <Button label="0" onClick={() => inputNumber('0')} wide />
        <Button label="." onClick={inputDecimal} />
      </div>

      {/* Paper Tape Button */}
      <div className="mt-4 text-center">
        <button className="mac-button text-xs">
          Show Paper Tape
        </button>
      </div>
    </div>
  );
};
