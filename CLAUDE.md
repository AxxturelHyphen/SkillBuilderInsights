# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**SkillBuilder DB Manager** is a MongoDB database administration interface for managing collections (mentors, projects, tasks, users, resources) with a **brutalist design aesthetic**: JetBrains Mono font, black/white palette (#000/#fff/#f0f0f0), hard shadows (4px 4px 0px), zero border-radius, glitch animations, and stagger animations on table rows.

## Architecture

**Backend**: Express.js server with MongoDB native driver
**Frontend**: Static HTML/JS/CSS files using fetch() to call backend REST API
**Connection**: Backend connects to MongoDB Atlas via connection string (secured in `backend/.env`)

## Running the Application

### Backend (Express.js + MongoDB)

**Start backend:**
```bash
cd backend
npm install          # First time only
npm run dev          # Development (auto-restart with nodemon)
npm start            # Production
```

Backend runs on `http://localhost:3000` by default.

**Configure MongoDB connection:**
```bash
cd backend
cp .env.example .env
# Edit .env with your MongoDB Atlas connection string
```

Required `.env` variables:
```env
MONGODB_URI=mongodb+srv://user:pass@cluster0.mongodb.net/
MONGODB_DATABASE=skillbuilder
PORT=3000
```

### Frontend (Static Files)

**Serve frontend files:**
```bash
# From project root
python3 -m http.server 8080      # Python
npx serve -p 8080                # Node.js
php -S localhost:8080            # PHP
```

**Access application:**
- DB Manager: `http://localhost:8080/`

### Full Stack Development

```bash
# Terminal 1: Backend
cd backend && npm run dev

# Terminal 2: Frontend
python3 -m http.server 8080

# Browser: http://localhost:8080/
```

## API Endpoints

### Collections
- `GET /api/:collection` - List documents (supports `?limit=N&skip=N&sort=field&order=asc`)
- `GET /api/:collection/count` - Count documents
- `GET /api/:collection/:id` - Get single document
- `POST /api/:collection` - Create document
- `PUT /api/:collection/:id` - Update document
- `DELETE /api/:collection/:id` - Delete document

**Allowed collections**: `mentors`, `projects`, `tasks`, `users`, `resources`

## Database Structure

### Collections

**mentors**: `{ _id, name, email, skills[], t_level, createdAt }`
**projects**: `{ _id, name, description, owner, workspaceId, taskCounts{}, startDate, createdAt }`
**tasks**: `{ _id, title, status, projectId, mentorId, dueDate, createdAt }`
**users**: `{ _id, name, email, workspaceId, createdAt }`
**resources**: `{ _id, name, type, url, projectId, workspaceId, createdAt }`

## Architecture Patterns

### Mock Mode Fallback
Frontend automatically activates **MOCK_MODE** when backend is unreachable:
- Banner notification visible
- Connection indicator shows "DESCONECTADO"
- Uses hardcoded `MOCK_DATA` arrays defined in `app.js`
- All UI features work with mock data (filters, pagination, modals, charts)

### Auto-Refresh Polling
Dashboard polls backend every 30 seconds (`POLLING_INTERVAL` configurable).

### State Management
Global `state` object in `app.js`:
```javascript
{
  documentos: [],              // Current data
  coleccionActual: string,
  conectado: boolean,
  pollingId: number,
  cargando: boolean
}
```

### Dynamic Table Rendering
`app.js` uses `SCHEMAS` object to define columns per collection:
```javascript
const SCHEMAS = {
  mentors: ['_id', 'name', 'email', 'skills', 't_level', 'createdAt'],
  // ... other collections
}
```
Table headers and cells render dynamically based on active collection.

## File Organization

### Frontend (Root)
- `index.html` - DB Manager UI structure
- `app.js` - DB Manager business logic, state, rendering
- `styles.css` - DB Manager styles

### Backend
- `backend/server.js` - Express app, middleware, routes
- `backend/db/connection.js` - MongoDB client singleton, connection management
- `backend/routes/collections.js` - Generic CRUD for all collections
- `backend/package.json` - Dependencies: express, mongodb, cors, dotenv

### Documentation
- `README.md` - Full project documentation
- `DB_MANAGER_README.md` - DB Manager specific guide

## Design System

**CRITICAL**: Both frontends must maintain **exact visual consistency**:

```css
/* Mandatory design tokens */
--negro: #000000
--blanco: #ffffff
--superficie: #f0f0f0
--sombra: 4px 4px 0px #000
--sombra-hover: 6px 6px 0px #000
--transicion: 120ms ease

/* Typography */
font-family: 'JetBrains Mono', monospace  /* EXCLUSIVE font */
font-size: 13px (base)
text-transform: uppercase (headers, buttons, labels)
letter-spacing: 0.05em - 0.15em

/* Layout rules */
border-radius: 0 !important  /* NO rounded corners anywhere */
box-shadow: Hard shadows only, NO blur
animations: Glitch effect on main title, stagger on table rows (60ms delay each)
```

When creating or modifying UI components:
- Use `<span class="badge">` for status indicators
- Buttons use `.filtros__btn` or `.btn-accion` classes
- Tables use sticky header (`position: sticky; top: 0`)
- Modals use `.detalle-overlay` with 8px hard shadow
- Input fields must have hard shadow on focus

## Development Workflow

### Adding a New Collection to DB Manager

1. Add collection name to `ALLOWED_COLLECTIONS` in `backend/routes/collections.js`
2. Add schema to `SCHEMAS` object in `db-manager.js`
3. Add mock data to `MOCK_DATA` object in `db-manager.js`
4. Add stat counter to HTML and update `state.stats` initialization
5. Add filter button in HTML with `data-coleccion` attribute

### Modifying the Design

**DO NOT** change:
- Font family (must be JetBrains Mono)
- Color palette (must be black/white/gray)
- Border radius (must stay 0)
- Shadow style (must be hard shadows)

**CAN** change:
- Spacing values
- Font sizes (while maintaining hierarchy)
- Animation timings
- Table column widths

### Testing Without Backend

Set `MOCK_MODE = true` in `config.js` or simply don't start the backend. Frontends will auto-detect and use mock data.

## Security Notes

- `backend/.env` is gitignored - NEVER commit MongoDB credentials
- Backend uses CORS middleware - configure allowed origins in production
- Frontend makes unauthenticated calls to backend - add auth middleware if needed

## Common Gotchas

1. **CORS errors**: Frontend must be served via HTTP server, not `file://` protocol
2. **Connection indicator stuck**: Check backend logs for MongoDB connection errors
3. **Polling stops**: Check browser console for JS errors; some browsers throttle intervals in background tabs
4. **Table not rendering**: Ensure collection name matches exactly in `SCHEMAS` object
5. **Charts empty**: Charts require at least 1 document with valid `createdAt` field
6. **Modal won't close**: Click outside modal or use close button; modal has `onclick` to close on overlay click

## Git Workflow

Ignored files (`.gitignore`):
- `backend/.env` (credentials)
- `backend/node_modules/`
- `node_modules/`
- `.claude/` (local AI context)
