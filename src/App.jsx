import Input from './components/Input';
import Button from './components/Button';

import { Container, Content, Row, History } from './styled';
import { useState, useEffect, useCallback } from 'react';
import { evaluate, format, parse } from 'mathjs';

// Função utilitária para formatar o número exibido
const formatDisplay = (value) => {
  if (value === 'Infinity') return '∞';
  if (value === '-Infinity') return '-∞';
  if (isNaN(value)) return 'Erro';
  return format(value, { notation: 'fixed', precision: 10 });
};

const App = () => {
  const [currentNumber, setCurrentNumber] = useState('0');
  const [history, setHistory] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const handleKeyPress = (event) => {
      const key = event.key;

      if (key === 'Escape') {
        handleOnClear();
      } else if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '(', ')'].includes(key)) {
        handleAddNumber(key);
      } else if (['+', '-', '*', '/'].includes(key)) {
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
    setError('');
  };

  const handleAddNumber = (num) => {
    setCurrentNumber(prev => {
      if (prev === '0' && num !== '.' && num !== '(') return num;
      if (num === '.' && prev.includes('.')) return prev;
      return prev + num;
    });
    setError('');
  };

  const handleAddOperation = (op) => {
    setCurrentNumber(prev => {
      const lastChar = prev[prev.length - 1];
      if (['+', '-', '*', '/'].includes(lastChar)) {
        return prev.slice(0, -1) + op;
      }
      return prev + op;
    });
    setError('');
  };

  const handleBackspace = () => {
    setCurrentNumber(prev => (prev.length > 1 ? prev.slice(0, -1) : '0'));
    setError('');
  };

  const handleEquals = useCallback(() => {
    try {
      // Verifica e corrige parênteses desequilibrados
      const parsed = parse(currentNumber);
      const result = evaluate(parsed);
      const formattedResult = formatDisplay(result);
      setHistory(prev => [...prev, `${currentNumber} = ${formattedResult}`]);
      setCurrentNumber(formattedResult);
    } catch (e) {
      setError('Erro: Expressão inválida');
    }
  }, [currentNumber]);

  return (
    <Container>
      <Content>
        <History aria-live="polite">
          {history.length ? history.join(' | ') : (error || formatDisplay(currentNumber))}
        </History>
          <Input value={currentNumber} />
        <Row>
          <Button aria-label="Clear" label="C" onClick={handleOnClear} />
          <Button aria-label="Backspace" label="←" onClick={handleBackspace} />
        </Row>
        <Row>
          <Button aria-label="(" label="(" onClick={() => handleAddNumber('(')} />
          <Button aria-label=")" label=")" onClick={() => handleAddNumber(')')} />
          <Button aria-label="^" label="^" onClick={() => handleAddOperation('^')} />
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
