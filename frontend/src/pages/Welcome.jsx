import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { clearSession, getUsernameFromToken } from '../services/auth';

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
    maxWidth: '400px',
    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)',
    border: '1px solid #e2e8f0',
    textAlign: 'center',
  },
  avatar: {
    width: '64px',
    height: '64px',
    borderRadius: '50%',
    backgroundColor: '#2563eb',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 24px',
    fontSize: '28px',
    color: '#ffffff',
    fontWeight: '700',
  },
  title: {
    fontSize: '22px',
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: '8px',
  },
  subtitle: {
    color: '#64748b',
    fontSize: '14px',
    marginBottom: '32px',
  },
  divider: {
    borderTop: '1px solid #e2e8f0',
    marginBottom: '24px',
  },
  button: {
    width: '100%',
    padding: '12px',
    backgroundColor: 'transparent',
    color: '#2563eb',
    border: '1.5px solid #2563eb',
    borderRadius: '8px',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s, color 0.2s',
    fontFamily: 'inherit',
    marginBottom: '12px',
  },
  buttonPrimary: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#2563eb',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    fontFamily: 'inherit',
    marginBottom: '12px',
  },
};

export default function Welcome() {
  const [hoveredLogout, setHoveredLogout] = useState(false);
  const [hoveredCalculator, setHoveredCalculator] = useState(false);
  const navigate = useNavigate();
  const username = getUsernameFromToken();

  function handleLogout() {
    clearSession();
    navigate('/login', { replace: true });
  }

  function handleCalculator() {
    navigate('/calculator');
  }

  const initial = username && username.length > 0 ? username[0].toUpperCase() : '?';

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.avatar}>{initial}</div>

        <h1 style={styles.title}>¡Bienvenido, {username}!</h1>
        <p style={styles.subtitle}>Has iniciado sesión exitosamente.</p>

        <div style={styles.divider} />

        <button
          onClick={handleCalculator}
          style={{
            ...styles.buttonPrimary,
            backgroundColor: hoveredCalculator ? '#1d4ed8' : '#2563eb',
          }}
          onMouseEnter={() => setHoveredCalculator(true)}
          onMouseLeave={() => setHoveredCalculator(false)}
        >
          Calculadora
        </button>

        <button
          onClick={handleLogout}
          style={{
            ...styles.button,
            backgroundColor: hoveredLogout ? '#2563eb' : 'transparent',
            color: hoveredLogout ? '#ffffff' : '#2563eb',
          }}
          onMouseEnter={() => setHoveredLogout(true)}
          onMouseLeave={() => setHoveredLogout(false)}
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}
