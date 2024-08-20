import Input from './components/Input';
import Button from './components/Button';

import { Container, Content, Row, History } from './styled';
import { useState, useEffect } from 'react';
import { evaluate, parse, format } from 'mathjs';

const App = () => {
  const [currentNumber, setCurrentNumber] = useState('0');
  const [history, setHistory] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const handleKeyPress = (event) => {
      const key = event.key;

      if (key === 'Escape') {
        handleOnClear();
      } else if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '(', ')'].includes(key)) {
        handleAddNumber(key);
      } else if (['+', '-', '*', '/', '^'].includes(key)) {
        handleAddOperation(key);
      } else if (key === 'Enter' || key === '=') {
        handleEquals();
      } else if (key === 'Backspace') {
        handleBackspace();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [currentNumber]);

  const handleOnClear = () => {
    setCurrentNumber('0');
    setHistory('');
    setError('');
  };

  const handleAddNumber = (num) => {
    setCurrentNumber(prev => {
      if (prev === '0' && num !== '.' && num !== '(') return num;
      if (prev === '0' && (num === '.' || num === '(')) return num;
      if (['+', '-', '*', '/'].includes(prev[prev.length - 1]) && num === '0') return prev;
      if (num === '.' && prev.includes('.')) return prev;
      return prev + num;
    });
    setError('');
  };

  const handleAddOperation = (op) => {
    setCurrentNumber(prev => {
      const lastChar = prev[prev.length - 1];
      if (['+', '-', '*', '/'].includes(lastChar)) {
        return prev.slice(0, -1) + (op === '^' ? '**' : op);
      }
      return prev + (op === '^' ? '**' : op);
    });
    setError('');
  };

  const handleAddFunction = (fn) => {
    setCurrentNumber(prev => {
      if (prev === '0') return `${fn}(`;
      return prev + `${fn}(`;
    });
    setError('');
  };

  const handleBackspace = () => {
    setCurrentNumber(prev => (prev.length > 1 ? prev.slice(0, -1) : '0'));
    setError('');
  };

  const handleEquals = () => {
    try {
      let expression = currentNumber;
      expression = expression.replace(/sqrt\(/g, 'sqrt(');
      
      // Adiciona o fechamento de parênteses se necessário
      const openParentheses = (expression.match(/\(/g) || []).length;
      const closeParentheses = (expression.match(/\)/g) || []).length;
      if (openParentheses > closeParentheses) {
        expression += ')'.repeat(openParentheses - closeParentheses);
      }

      const result = evaluate(expression);
      setCurrentNumber(String(result));
      setHistory(`${format(parse(expression))} = ${result}`);
      setError('');
    } catch (e) {
      setError('Erro: Expressão inválida');
    }
  };

  return (
    <Container>
      <Content>
        <History aria-live="polite">{error || history || currentNumber}</History>
        <Input value={currentNumber} />
        <Row>
          <Button aria-label="Clear" label="C" onClick={handleOnClear} />
          <Button aria-label="Backspace" label="←" onClick={handleBackspace} />
        </Row>
        <Row>
          <Button aria-label="(" label="(" onClick={() => handleAddNumber('(')} />
          <Button aria-label=")" label=")" onClick={() => handleAddNumber(')')} />
          <Button aria-label="sqrt" label="√" onClick={() => handleAddFunction('sqrt')} />
          <Button aria-label="Divide" label="/" onClick={() => handleAddOperation('/')} />
        </Row>
        <Row>
          <Button aria-label="7" label="7" onClick={() => handleAddNumber('7')} />
          <Button aria-label="8" label="8" onClick={() => handleAddNumber('8')} />
          <Button aria-label="9" label="9" onClick={() => handleAddNumber('9')} />
          <Button aria-label="Multiply" label="*" onClick={() => handleAddOperation('*')} />
        </Row>
        <Row>
          <Button aria-label="4" label="4" onClick={() => handleAddNumber('4')} />
          <Button aria-label="5" label="5" onClick={() => handleAddNumber('5')} />
          <Button aria-label="6" label="6" onClick={() => handleAddNumber('6')} />
          <Button aria-label="Subtract" label="-" onClick={() => handleAddOperation('-')} />
        </Row>
        <Row>
          <Button aria-label="1" label="1" onClick={() => handleAddNumber('1')} />
          <Button aria-label="2" label="2" onClick={() => handleAddNumber('2')} />
          <Button aria-label="3" label="3" onClick={() => handleAddNumber('3')} />
          <Button aria-label="Add" label="+" onClick={() => handleAddOperation('+')} />
        </Row>
        <Row>
          <Button aria-label="0" label="0" onClick={() => handleAddNumber('0')} />
          <Button aria-label="Decimal" label="." onClick={() => handleAddNumber('.')} />
          <Button aria-label="Equals" label="=" onClick={handleEquals} />
        </Row>
      </Content>
    </Container>
  );
};

export default App;
