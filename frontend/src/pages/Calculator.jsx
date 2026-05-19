import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f1f5f9',
    padding: '16px',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '40px',
    width: '100%',
    maxWidth: '450px',
    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)',
    border: '1px solid #e2e8f0',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
  },
  title: {
    fontSize: '22px',
    fontWeight: '700',
    color: '#1e293b',
  },
  backButton: {
    padding: '8px 16px',
    backgroundColor: 'transparent',
    color: '#64748b',
    border: '1px solid #e2e8f0',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s',
    fontFamily: 'inherit',
  },
  display: {
    width: '100%',
    padding: '20px',
    fontSize: '28px',
    textAlign: 'right',
    backgroundColor: '#f8fafc',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    marginBottom: '16px',
    color: '#1e293b',
    fontWeight: '600',
    minHeight: '64px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  expression: {
    fontSize: '14px',
    color: '#64748b',
    marginBottom: '4px',
  },
  inputGroup: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '12px',
    marginBottom: '16px',
  },
  input: {
    padding: '12px',
    fontSize: '16px',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    fontFamily: 'inherit',
    width: '100%',
    boxSizing: 'border-box',
  },
  operationButtons: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '12px',
    marginBottom: '16px',
  },
  operationButton: {
    padding: '16px',
    fontSize: '20px',
    fontWeight: '600',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    cursor: 'pointer',
    backgroundColor: '#ffffff',
    color: '#2563eb',
    transition: 'all 0.2s',
    fontFamily: 'inherit',
  },
  calculateButton: {
    width: '100%',
    padding: '14px',
    backgroundColor: '#2563eb',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    fontFamily: 'inherit',
  },
  error: {
    color: '#dc2626',
    fontSize: '14px',
    marginTop: '12px',
    textAlign: 'center',
  },
  loading: {
    color: '#64748b',
    fontSize: '14px',
    marginTop: '12px',
    textAlign: 'center',
  },
};

export default function Calculator() {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [operation, setOperation] = useState('+');
  const [result, setResult] = useState(null);
  const [expression, setExpression] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const operations = [
    { symbol: '+', name: 'add', label: '+' },
    { symbol: '-', name: 'subtract', label: '−' },
    { symbol: '*', name: 'multiply', label: '×' },
    { symbol: '/', name: 'divide', label: '÷' },
  ];

  async function handleCalculate() {
    setError('');
    setLoading(true);

    // Validate inputs
    if (num1 === '' || num2 === '') {
      setError('Por favor ingresa ambos números');
      setLoading(false);
      return;
    }

    const number1 = parseFloat(num1);
    const number2 = parseFloat(num2);

    if (isNaN(number1) || isNaN(number2)) {
      setError('Por favor ingresa números válidos');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/calculator/calculate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          num1: number1,
          num2: number2,
          operation: operation,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.detail || 'Error al realizar la operación');
        setResult(null);
        setExpression('');
      } else {
        setResult(data.result);
        setExpression(data.expression);
        setError('');
      }
    } catch (err) {
      setError('Error de conexión con el servidor');
      setResult(null);
      setExpression('');
    } finally {
      setLoading(false);
    }
  }

  function handleOperationSelect(selectedOperation) {
    setOperation(selectedOperation.name);
  }

  function handleKeyPress(e) {
    if (e.key === 'Enter') {
      handleCalculate();
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.title}>Calculadora</h1>
          <button
            style={styles.backButton}
            onClick={() => navigate('/welcome')}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#f8fafc';
              e.target.style.borderColor = '#cbd5e1';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.borderColor = '#e2e8f0';
            }}
          >
            Volver
          </button>
        </div>

        <div style={styles.display}>
          {expression && <div style={styles.expression}>{expression}</div>}
          <div>{result !== null ? result : '0'}</div>
        </div>

        <div style={styles.inputGroup}>
          <input
            type="number"
            placeholder="Primer número"
            value={num1}
            onChange={(e) => setNum1(e.target.value)}
            onKeyPress={handleKeyPress}
            style={styles.input}
          />
          <input
            type="number"
            placeholder="Segundo número"
            value={num2}
            onChange={(e) => setNum2(e.target.value)}
            onKeyPress={handleKeyPress}
            style={styles.input}
          />
        </div>

        <div style={styles.operationButtons}>
          {operations.map((op) => (
            <button
              key={op.symbol}
              style={{
                ...styles.operationButton,
                backgroundColor: operation === op.name ? '#2563eb' : '#ffffff',
                color: operation === op.name ? '#ffffff' : '#2563eb',
              }}
              onClick={() => handleOperationSelect(op)}
              onMouseEnter={(e) => {
                if (operation !== op.name) {
                  e.target.style.backgroundColor = '#f1f5f9';
                }
              }}
              onMouseLeave={(e) => {
                if (operation !== op.name) {
                  e.target.style.backgroundColor = '#ffffff';
                }
              }}
            >
              {op.label}
            </button>
          ))}
        </div>

        <button
          style={styles.calculateButton}
          onClick={handleCalculate}
          disabled={loading}
          onMouseEnter={(e) => {
            if (!loading) e.target.style.backgroundColor = '#1d4ed8';
          }}
          onMouseLeave={(e) => {
            if (!loading) e.target.style.backgroundColor = '#2563eb';
          }}
        >
          {loading ? 'Calculando...' : 'Calcular'}
        </button>

        {error && <div style={styles.error}>{error}</div>}
      </div>
    </div>
  );
}
