# SKILLBUILDER DATABASE MANAGER

Un gestor de base de datos minimalista con estilo brutalist para administrar las colecciones de SkillBuilder.

## 🎨 CARACTERÍSTICAS DE DISEÑO

- **Fuente**: JetBrains Mono (exclusiva)
- **Paleta**: Negro (#000000), Blanco (#ffffff), Gris (#f0f0f0)
- **Estilo**: Sin border-radius, sombras duras (4px 4px), animaciones glitch
- **Interacciones**: Hover states con inversión negro/blanco
- **Animaciones**: Stagger para tablas, glitch en títulos, pulse en indicadores

## 📊 COLECCIONES GESTIONADAS

1. **MENTORS** - Mentores del sistema
   - Campos: name, email, skills, t_level, createdAt

2. **PROJECTS** - Proyectos activos
   - Campos: name, description, owner, workspaceId, taskCounts, startDate

3. **TASKS** - Tareas del gestor
   - Campos: title, status, projectId, mentorId, dueDate, createdAt

4. **USERS** - Usuarios del sistema
   - Campos: name, email, workspaceId, createdAt

5. **RESOURCES** - Recursos compartidos
   - Campos: name, type, url, projectId, workspaceId

## 🚀 CÓMO USAR

### 1. Iniciar el backend

```bash
cd backend
node server.js
```

El backend correrá en `http://localhost:3000`

### 2. Servir el frontend

En otra terminal:

```bash
# Opción 1: Python
python3 -m http.server 8080

# Opción 2: Node.js (npx)
npx serve -p 8080

# Opción 3: PHP
php -S localhost:8080
```

### 3. Abrir en navegador

```
http://localhost:8080/db-manager.html
```

## 🎯 FUNCIONALIDADES

### ESTADÍSTICAS
Panel superior con conteo de documentos por colección

### SELECTOR DE COLECCIÓN
Cambia entre MENTORS, PROJECTS, TASKS, USERS, RESOURCES

### BÚSQUEDA
- Busca en todos los campos
- Case-insensitive
- Filtrado en tiempo real

### TABLA DINÁMICA
- Columnas adaptadas a cada colección
- 20 documentos por página
- Click en fila para ver detalle completo
- Animación stagger en carga

### PAGINACIÓN
Navegación entre páginas con botones ANTERIOR/SIGUIENTE

### MODAL DE DETALLE
- Todos los campos del documento
- JSON formateado para objetos anidados
- Click fuera para cerrar

### ANALYTICS
- Distribución de estados (solo TASKS)
- Actividad de últimos 7 días
- Gráficas de barras minimalistas

### AUTO-REFRESH
Actualización automática cada 30 segundos

## 🔌 ENDPOINTS DEL BACKEND

```
GET  /api/:collection           - Lista todos los documentos
GET  /api/:collection/count     - Cuenta documentos
GET  /api/:collection/:id       - Obtiene un documento
POST /api/:collection           - Crea documento
PUT  /api/:collection/:id       - Actualiza documento
DELETE /api/:collection/:id     - Elimina documento
```

Colecciones permitidas: `mentors`, `projects`, `tasks`, `users`, `resources`

## 🎭 MODO DEMO

Si el backend no responde, activa automáticamente modo DEMO con datos mock:

**Datos de ejemplo**:
- 3 mentores históricos (Ada Lovelace, Alan Turing, Grace Hopper)
- 2 proyectos (Analytical Engine, Enigma Decryption)
- 4 tareas con diferentes estados
- 2 usuarios
- 2 recursos

Banner visible: `[MODO DEMO] MONGODB NO CONFIGURADO`

## 📁 ESTRUCTURA

```
/
├── db-manager.html          # Interface HTML
├── db-manager.css           # Estilos brutalist
├── db-manager.js            # Lógica vanilla JS
├── DB_MANAGER_README.md     # Este archivo
└── backend/
    ├── server.js            # Express server
    └── routes/
        └── collections.js   # API de colecciones
```

## ⚙️ CONFIGURACIÓN

Editar `db-manager.js`:

```javascript
const BACKEND_URL = 'http://localhost:3000/api';
const POLLING_INTERVAL = 30000;  // ms
const ITEMS_PER_PAGE = 20;
```

## 🎨 ESTILO EXACTO

**Mismo estilo que el dashboard de solicitudes**:
- JetBrains Mono font
- Sin border-radius
- Sombras: `4px 4px 0px #000` (normal), `6px 6px 0px #000` (hover)
- Animación glitch en título principal
- Transiciones: `120ms ease`
- Tablas con sticky header
- Modal con sombra `8px 8px 0 #000`

**CSS Variables**:
```css
--negro: #000000
--blanco: #ffffff
--superficie: #f0f0f0
--sombra: 4px 4px 0px #000
--sombra-hover: 6px 6px 0px #000
--transicion: 120ms ease
```

## 🔧 RESPONSIVE

- Desktop: 1400px max-width
- Tablet: Grid de gráficas a 1 columna
- Mobile: Búsqueda y paginación en columna

## ⚡ PERFORMANCE

- Límite: 100 docs por query
- Animaciones: CSS-only
- Sin dependencias externas
- Vanilla JavaScript puro
- Auto-scroll en modal

## 🎯 USO RECOMENDADO

1. **Exploración**: Ver estructura de datos
2. **Debugging**: Inspeccionar valores
3. **Monitoreo**: Estadísticas en tiempo real
4. **Admin**: Identificar docs para modificar

---

**STACK**: HTML5 · CSS3 · Vanilla JavaScript · Express.js · MongoDB
**DISEÑO**: Brutalist · Monospace · High Contrast · No Fluff
