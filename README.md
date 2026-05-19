# Copilot-sesion01

Aplicación web completa con React.js y FastAPI que incluye autenticación JWT y una calculadora.

## Características

- **Frontend React + Vite**: Aplicación de una sola página con React 19 y Vite
- **Backend FastAPI**: API REST con Python y FastAPI
- **Autenticación JWT**: Sistema de login con tokens de acceso y refresh
- **Calculadora**: Calculadora web con operaciones básicas procesadas en el backend

## Estructura del Proyecto

```
.
├── frontend/          # Aplicación React
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.jsx          # Página de login
│   │   │   ├── Welcome.jsx        # Página de bienvenida
│   │   │   └── Calculator.jsx     # Calculadora
│   │   ├── components/
│   │   └── services/
│   └── vite.config.js
├── backend/           # API FastAPI
│   ├── app/
│   │   ├── main.py                # Aplicación principal
│   │   ├── routers.py             # Rutas de autenticación
│   │   ├── calculator.py          # Rutas de calculadora
│   │   ├── security.py            # Funciones JWT
│   │   └── config.py
│   └── tests/
│       ├── test_auth.py           # Tests de autenticación
│       └── test_calculator.py     # Tests de calculadora
└── docker-compose.yml
```

## Inicio Rápido

### Con Docker

```bash
docker compose up --build
```

La aplicación estará disponible en:
- Frontend: http://localhost:3000
- Backend: http://localhost:8000
- Documentación API: http://localhost:8000/docs

### Desarrollo Local

#### Backend (puerto 8000)

```bash
cd backend
poetry install
poetry run uvicorn app.main:app --reload --port 8000
```

#### Frontend (puerto 3000)

```bash
cd frontend
npm install
npm run dev
```

## Uso

### 1. Iniciar Sesión

Credenciales por defecto:
- Usuario: `admin`
- Contraseña: `admin123`

### 2. Calculadora

Después de iniciar sesión, haz clic en el botón "Calculadora" para acceder a la calculadora.

La calculadora soporta las siguientes operaciones:
- ✅ Suma (+)
- ✅ Resta (−)
- ✅ Multiplicación (×)
- ✅ División (÷)

Todas las operaciones se procesan en el backend mediante la API REST.

### API de la Calculadora

**Endpoint:** `POST /calculator/calculate`

**Ejemplo de solicitud:**

```bash
curl -X POST http://localhost:8000/calculator/calculate \
  -H "Content-Type: application/json" \
  -d '{"num1": 15, "num2": 5, "operation": "add"}'
```

**Respuesta:**

```json
{
  "result": 20.0,
  "operation": "+",
  "expression": "15.0 + 5.0 = 20.0"
}
```

**Operaciones soportadas:**
- `"add"` o `"+"` - Suma
- `"subtract"` o `"-"` - Resta
- `"multiply"` o `"*"` - Multiplicación
- `"divide"` o `"/"` - División

## Tests

### Backend

```bash
cd backend
poetry run pytest tests/ -v
```

### Cobertura de Tests

✅ Tests de autenticación (test_auth.py)
✅ Tests de calculadora (test_calculator.py)

## Tecnologías

### Frontend
- React 19
- Vite 8
- React Router v7
- CSS moderno (inline styles)

### Backend
- Python 3.11+
- FastAPI
- Poetry (gestión de dependencias)
- JWT (autenticación)
- Pytest (testing)

## Licencia

MIT
