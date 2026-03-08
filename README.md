# SkillBuilder DB Manager

MongoDB database administration interface with real-time updates, brutalist design aesthetic, and native SVG charts.

## Descripción

SkillBuilder DB Manager es una aplicación web completa (frontend + backend) que proporciona una interfaz de administración para colecciones MongoDB (mentors, projects, tasks, users, resources). El dashboard permite visualizar, buscar y administrar documentos con actualización automática de datos, estadísticas detalladas y representaciones gráficas de la información.

La aplicación incluye un backend Express.js que se conecta directamente a MongoDB Atlas usando el driver nativo, proporcionando una API REST para que el frontend consuma los datos de forma segura. También ofrece un modo de demostración con datos de ejemplo cuando no hay conexión configurada, lo que facilita el desarrollo y las pruebas.
## Diagramas


Diagrama en Sql

![Diagrama de arquitectura general sql](./images/diagramaER.png)

Diagrama en MongoDB


![Diagrama de mongo](./images/skillbuilder_13_02_2026.png)


## Flujo N8N
    
Este es el flujo de N8N se encarga de a traves de un trigger de telegram, obtener el mensaje y dependiendo del comando, se envia a una "IA tonta" que se encarga de traducir el texto a sintaxis de mongoDB, que se conecta a MongoDB Atlas para obtener la información solicitada y luego responde al usuario con los datos obtenidos.
![Flujo N8N](./images/Captura%20de%20pantalla%202026-02-26%20101426.png)


## MongoDB: CRUD, consultas simples (find) y consultas complejas (aggregate)

### PROYECTOS POR MENTOR

Consulta simple para encontrar todos los proyectos asociados a un mentor específico. Útil para ver la carga de trabajo de cada mentor y qué proyectos están bajo su supervisión.


![CRUD y consultas MongoDB](./images/consulta1.png)

### RECURSOS POR PROYECTO

Buscar todos los recursos (documentos, PDFs, enlaces) vinculados a un proyecto específico. Permite organizar materiales de aprendizaje por proyecto.


![CRUD y consultas MongoDB](./images/consulta2.png)


### TAREAS PENDIENTES

Filtrar todas las tareas que aún no han sido iniciadas (estado TODO). Esencial para planificar el trabajo pendiente y priorizar tareas.


![CRUD y consultas MongoDB](./images/consulta3.png)


### TOP 10 PROYECTOS ACTIVOS

Agregación que identifica los 10 proyectos con mayor actividad basándose en el total de tareas completadas. Usa pipeline de agregación con múltiples etapas.

![CRUD y consultas MongoDB](./images/consulta4.png)

### SKILLS AVANZADOS MÁS COMUNES

Agregación compleja que descompone el array de skills de cada mentor, filtra solo habilidades de nivel avanzado (≥ 3), y agrupa para contar cuáles son más frecuentes.


![CRUD y consultas MongoDB](./images/consulta5.png)

![CRUD y consultas MongoDB](./images/consulta55.png)



## Reparto de tareas

- Flujo de n8n: Guija, Pablo y Hugo
- Backend y Frontend: Guija
- Consultas MongoDB: Hugo
- Documentación: Pablo

## Propuestas de mejora

- Implementar autenticación de usuarios para acceso seguro al dashboard
- Agregar funcionalidad de edición y eliminación de documentos desde el frontend
- Integrar notificaciones en tiempo real para cambios en la base de datos

## Conclusión

Gracias a este proyecto, hemos creado una herramienta de administración de bases de datos MongoDB con un diseño único y funcionalidades avanzadas, demostrando habilidades en desarrollo full-stack, diseño de interfaces y manejo de bases de datos. El uso de tecnologías modernas y la implementación de características como polling automático y gráficas SVG nativas hacen que este dashboard sea una solución robusta para la gestión de datos en entornos educativos o empresariales. Asi como integrar la herramienta de automatización N8N para facilitar la interacción con la base de datos a través de comandos de Telegram, lo que añade una capa adicional de accesibilidad y conveniencia para los usuarios.

## Características principales

- ⚡ **Dashboard interactivo** con actualización automática mediante polling (cada 30 segundos)
- 📊 **Gráficas SVG nativas** sin dependencias externas de librerías
- 🔄 **Gestión de múltiples colecciones** (mentors, projects, tasks, users, resources)
- 🔍 **Sistema de búsqueda** global por nombre, email, ID u otros campos
- 📈 **Estadísticas rápidas** con contadores dinámicos por colección
- 🎨 **Diseño brutalist** con tipografía JetBrains Mono exclusiva
- 💾 **Modo mock** para desarrollo y pruebas sin conexión a base de datos
- 📄 **Paginación** automática con navegación entre páginas
- 📱 **Panel de detalle** modal para visualizar información completa de documentos

## Tabla de Contenidos

- [Requisitos previos](#requisitos-previos)
- [Instalación y configuración](#instalación-y-configuración)
- [Uso](#uso)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Configuración avanzada](#configuración-avanzada)
- [Seguridad](#seguridad)
- [Solución de problemas](#solución-de-problemas)
- [Contribución](#contribución)
- [Licencia](#licencia)

## Requisitos previos

- Navegador web moderno con soporte para ES6+ (Chrome, Firefox, Safari, Edge)
- Node.js (v14 o superior) y npm para el backend
- Cuenta de MongoDB Atlas (opcional para desarrollo, requerido para producción)
- Servidor web local para el frontend (Python, Node.js, PHP, etc.)

## Backend Express.js

La aplicación incluye un backend Express.js que se conecta directamente a MongoDB Atlas y expone endpoints REST para el frontend.

### Instalación del backend

1. Navega a la carpeta backend:
   ```bash
   cd backend
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Configura las variables de entorno:
   ```bash
   cp .env.example .env
   ```

4. Edita `.env` y agrega tu connection string de MongoDB:
   ```env
   MONGODB_URI=mongodb+srv://usuario:password@cluster0.nmqaxyr.mongodb.net/
   MONGODB_DATABASE=skillbuilder
   PORT=3000
   ```

### Ejecución del backend

**Modo desarrollo (con auto-restart):**
```bash
npm run dev
```

**Modo producción:**
```bash
npm start
```

El servidor estará disponible en `http://localhost:3000`

### Endpoints disponibles

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/health` | Health check del servidor |
| GET | `/api/:collection` | Obtener todos los documentos de una colección |
| GET | `/api/:collection/count` | Contar documentos de una colección |
| GET | `/api/:collection/:id` | Obtener documento por ID |
| POST | `/api/:collection` | Crear nuevo documento |
| PUT | `/api/:collection/:id` | Actualizar documento |
| DELETE | `/api/:collection/:id` | Eliminar documento |

**Colecciones permitidas**: `mentors`, `projects`, `tasks`, `users`, `resources`

### Uso con el frontend

1. Inicia el backend:
   ```bash
   cd backend
   npm run dev
   ```

2. En otra terminal, inicia el frontend:
   ```bash
   cd ..
   python -m http.server 8000
   ```

3. Abre el navegador en `http://localhost:8000/`

## Instalación y configuración

### 1. Clonar el repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
cd FrontEndSkillBuilder
```

### 2. Configurar MongoDB Atlas

El backend se conecta directamente a MongoDB Atlas usando el connection string. Edita el archivo `backend/.env`:

```env
MONGODB_URI=mongodb+srv://usuario:password@cluster0.nmqaxyr.mongodb.net/
MONGODB_DATABASE=skillbuilder
PORT=3000
```

#### Obtener el connection string de MongoDB Atlas:

1. Inicia sesión en [MongoDB Atlas](https://cloud.mongodb.com)
2. Ve a tu cluster y haz clic en "Connect"
3. Selecciona "Connect your application"
4. Copia el connection string (comienza con `mongodb+srv://`)
5. Reemplaza `<password>` con tu contraseña de base de datos
6. Pega el connection string en `backend/.env`

### 3. Estructura de datos en MongoDB

La aplicación gestiona las siguientes colecciones en la base de datos `skillbuilder`:

**mentors**: `{ _id, name, email, skills[], t_level, createdAt }`
**projects**: `{ _id, name, description, owner, workspaceId, taskCounts{}, startDate, createdAt }`
**tasks**: `{ _id, title, status, projectId, mentorId, dueDate, createdAt }`
**users**: `{ _id, name, email, workspaceId, createdAt }`
**resources**: `{ _id, name, type, url, projectId, workspaceId, createdAt }`

![skillbuilderdiagrama.png](assets/skillbuilderdiagrama.png)
### ⚠️ Advertencia de seguridad

**NUNCA commitees el archivo `backend/.env` con credenciales reales a un repositorio público.** Este archivo ya está incluido en `.gitignore` para proteger tus credenciales de MongoDB.

## Uso

### Modo desarrollo local

1. Abre el archivo `index.html` directamente en tu navegador, o
2. Usa un servidor local:

```bash
# Con Python 3
python -m http.server 8000

# Con Node.js (http-server)
npx http-server

# Con PHP
php -S localhost:8000
```

3. Navega a `http://localhost:8000` en tu navegador

### Navegación básica

- **Estadísticas rápidas**: Visualiza contadores de documentos por colección (mentors, projects, tasks, users, resources)
- **Selector de colección**: Haz clic en los botones para cambiar entre colecciones
- **Búsqueda**: Usa la barra de búsqueda para filtrar documentos por cualquier campo
- **Tabla de documentos**:
  - Haz clic en cualquier fila para ver el detalle completo del documento
  - Navega entre páginas con los botones de paginación
- **Gráficas**:
  - Gráfica de estados muestra distribución de tasks por estado (todo/doing/done)
  - Gráfica de actividad muestra documentos creados en los últimos 7 días
- **Indicador de conexión**: Verifica el estado de conexión a MongoDB en la esquina superior derecha
- **Polling automático**: El dashboard se actualiza automáticamente cada 30 segundos

## Estructura del proyecto

```
FrontEndSkillBuilder/
├── backend/
│   ├── db/
│   │   └── connection.js    # Conexión a MongoDB Atlas
│   ├── routes/
│   │   └── collections.js   # Rutas de la API REST
│   ├── server.js            # Servidor Express principal
│   ├── package.json         # Dependencias del backend
│   ├── .env                 # Variables de entorno (ignorado en git)
│   └── .env.example         # Plantilla de variables de entorno
├── index.html               # Página principal del DB Manager
├── app.js                   # Lógica principal y gestión de estado
├── styles.css               # Estilos brutalist del dashboard
├── README.md                # Documentación principal
├── DB_MANAGER_README.md     # Guía específica del DB Manager
└── CLAUDE.md                # Instrucciones para Claude Code
```

### Descripción de archivos principales

**Frontend:**
- **`index.html`**: Estructura HTML del DB Manager con header, estadísticas, selector de colecciones, búsqueda, tabla, gráficas y modal de detalle
- **`app.js`**: Lógica de la aplicación, renderizado dinámico de tablas por colección, gestión de estado, búsqueda, paginación y polling
- **`styles.css`**: Define el diseño visual brutalist (JetBrains Mono, hard shadows, black/white palette)

**Backend:**
- **`backend/server.js`**: Servidor Express.js principal con middleware, rutas y manejo de errores
- **`backend/db/connection.js`**: Configuración y gestión de conexión a MongoDB Atlas usando el driver nativo
- **`backend/routes/collections.js`**: Endpoints REST genéricos para operaciones CRUD en todas las colecciones
- **`backend/.env`**: Variables de entorno con credenciales de MongoDB (no commiteado)

## Configuración avanzada

### Ajustar intervalo de polling

Modifica la constante `POLLING_INTERVAL` en `app.js` para cambiar la frecuencia de actualización:

```javascript
// Intervalo de polling en milisegundos
const POLLING_INTERVAL = 30000  // 30 segundos (por defecto)
// const POLLING_INTERVAL = 60000  // 60 segundos (menos frecuente)
// const POLLING_INTERVAL = 10000  // 10 segundos (más frecuente)
```

### Ajustar paginación

Cambia el número de documentos mostrados por página:

```javascript
// Documentos por página
const ITEMS_PER_PAGE = 20  // Por defecto
// const ITEMS_PER_PAGE = 50  // Más documentos por página
```

### Activar modo mock manualmente

El modo mock se activa automáticamente cuando el backend no está disponible. Los datos mock están definidos en `MOCK_DATA` dentro de `app.js`.

## Seguridad

### Protección de credenciales

🔒 **IMPORTANTE**: Las credenciales de MongoDB se manejan de forma segura en el backend.

**Mejores prácticas implementadas:**

1. **Backend maneja credenciales**: El frontend nunca tiene acceso directo a las credenciales de MongoDB

2. **Variables de entorno**: El archivo `backend/.env` contiene las credenciales y está excluido de git
   ```bash
   # backend/.env ya está en .gitignore
   backend/.env
   backend/node_modules/
   ```

3. **Archivo de ejemplo**: `backend/.env.example` proporciona una plantilla sin credenciales reales

4. **Configurar reglas de acceso en MongoDB Atlas**:
   - Configura IP whitelisting si es posible
   - Usa roles con permisos mínimos necesarios
   - Mantén tu contraseña segura

5. **CORS configurado**: El backend acepta requests solo desde el frontend (configurable en `server.js`)

6. **HTTPS en producción**: Siempre sirve la aplicación sobre HTTPS para proteger las comunicaciones

### Prevención de XSS

La aplicación incluye escape de HTML para prevenir ataques XSS:

```javascript
function escapeHtml(str) {
  const div = document.createElement('div')
  div.textContent = str
  return div.innerHTML
}
```

## Solución de problemas

### La aplicación no se conecta a MongoDB

**Síntomas**: Banner "MODO DEMO" visible, indicador muestra "DESCONECTADO"

**Soluciones**:

1. **Verifica que el backend esté corriendo**:
   ```bash
   cd backend
   npm run dev
   ```
   Deberías ver: `✅ Conectado a MongoDB Atlas` y `🚀 Servidor corriendo en http://localhost:3000`

2. **Verifica la configuración de `backend/.env`**:
   - El connection string debe tener la contraseña correcta
   - El formato debe ser: `mongodb+srv://usuario:password@cluster...`

3. **Prueba el endpoint de health check**:
   ```bash
   curl http://localhost:3000/health
   ```
   Debería retornar: `{"status":"OK","timestamp":"..."}`

4. **Comprueba la consola del backend** para mensajes de error específicos

5. **Verifica la IP whitelist en MongoDB Atlas**: Asegúrate de que tu IP esté permitida o usa `0.0.0.0/0` para desarrollo

### Cómo activar modo mock intencionalmente

Para desarrollo y pruebas sin MongoDB, simplemente no inicies el backend o configura credenciales inválidas en `backend/.env`.

El modo mock se activará automáticamente y utilizará los datos de ejemplo definidos en `app.js` (objeto `MOCK_DATA`).

### Errores de CORS

**Síntoma**: Error en consola: "Access to fetch at 'http://localhost:3000' from origin 'null' has been blocked by CORS policy"

**Soluciones**:

1. **Usar un servidor local** para el frontend en lugar de abrir el archivo HTML directamente:
   ```bash
   python -m http.server 8000
   ```
   Luego abre `http://localhost:8000` en el navegador

2. **Verificar que el backend tenga CORS habilitado**: El backend ya incluye `cors()` middleware en `server.js`

3. **Si personalizaste CORS**: Asegúrate de permitir el origen del frontend en la configuración de CORS del backend

### Las gráficas no se muestran correctamente

**Soluciones**:

1. Verifica que haya datos en la base de datos o en modo mock
2. Comprueba la consola del navegador para errores de JavaScript
3. Asegúrate de que la fuente JetBrains Mono se cargue correctamente
4. Prueba en otro navegador para descartar problemas de compatibilidad

### Polling no funciona

**Soluciones**:

1. Verifica que `POLLING_INTERVAL` esté definido correctamente en `app.js`
2. Comprueba que no haya errores en la consola que detengan la ejecución de JavaScript
3. Asegúrate de que la pestaña del navegador esté activa (algunos navegadores pausan timers en pestañas inactivas)

### La tabla no muestra datos

**Soluciones**:

1. Verifica que la colección exista en tu base de datos MongoDB
2. Comprueba que el nombre de la colección esté en `ALLOWED_COLLECTIONS` en `backend/routes/collections.js`
3. Asegúrate de que el schema esté definido en `SCHEMAS` en `app.js`
4. Revisa la consola del navegador y del backend para errores

## Contribución

Las contribuciones son bienvenidas. Para contribuir:

1. Haz un fork del repositorio
2. Crea una rama para tu funcionalidad (`git checkout -b feature/nueva-funcionalidad`)
3. Realiza tus cambios y haz commit (`git commit -m 'feat: Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

**Guías de estilo**:
- Usa comentarios descriptivos en español
- Mantén el código consistente con el estilo existente
- Evita dependencias externas innecesarias
- Documenta cambios importantes en el README

## Licencia

Este proyecto está bajo la licencia ISC.

## Autor

Para consultas o soporte, abre un issue en el repositorio del proyecto.

---

**Última actualización**: Febrero 2025
