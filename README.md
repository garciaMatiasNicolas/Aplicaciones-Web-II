# Proyecto Aplicaciones Web II

Este proyecto es una tienda online desarrollada como parte de la materia Aplicaciones Web 2. Incluye un backend en Node.js/Express y un frontend en React.

---

## Stack Tecnológico

- **Frontend:**  
  - [React](https://react.dev/)  
  - [Bootstrap 5](https://getbootstrap.com/)  
  - [SweetAlert2](https://sweetalert2.github.io/)  
  - [React Router DOM](https://reactrouter.com/)  

- **Backend:**  
  - [Node.js](https://nodejs.org/)  
  - [Express](https://expressjs.com/)  
  - [Mongoose](https://mongoosejs.com/) (ODM para MongoDB)  
  - [MongoDB Atlas](https://www.mongodb.com/atlas)  
  - [JWT](https://jwt.io/) (autenticación)  
  - [bcryptjs](https://www.npmjs.com/package/bcryptjs) (hash de contraseñas)  
  - [dotenv](https://www.npmjs.com/package/dotenv) (variables de entorno)  
  - [CORS](https://www.npmjs.com/package/cors)  

---

## Estructura de Carpetas

```
api/           # Backend (Node.js + Express)
  controllers/ # Lógica de negocio de usuarios y productos
  data/        # Modelos Mongoose y archivos JSON de datos
  middleware/  # Middlewares (ej: autenticación JWT)
  routes/      # Definición de rutas de la API
  utils/       # Utilidades (ej: manejo de archivos)
  main.js      # Punto de entrada del servidor
  package.json # Dependencias y scripts del backend

client/        # Frontend (React)
  public/      # Archivos estáticos y HTML principal
  src/         # Código fuente React
    components/ # Componentes reutilizables (Carrito, Productos, etc)
    context/    # Contextos de React (Auth, Cart)
    mock/       # Datos de ejemplo para desarrollo
    pages/      # Páginas principales (opcional)
    services/   # Servicios para llamadas a la API
    App.js      # Componente principal
    index.js    # Punto de entrada de React
  package.json  # Dependencias y scripts del frontend
```

---

## Cómo levantar el proyecto localmente

### 1. Clonar el repositorio

```sh
git clone https://github.com/garciaMatiasNicolas/Aplicaciones-Web-II.git
cd Aplicaciones-Web-II
```

### 2. Configurar el backend

```sh
cd api
npm install
```

- Crea un archivo `.env` en la carpeta `api/` con la variable `JWT_SECRET` (puedes usar cualquier valor para desarrollo):

```
JWT_SECRET=miclaveultrasecreta
```

- (Opcional) Si necesitas cargar los datos de ejemplo en MongoDB, descomenta la línea `importData();` en [`data/db.js`](api/data/db.js), ejecuta `npm run dev` una vez y vuelve a comentarla.

### 3. Levantar el backend

```sh
npm run dev
```

El backend corre por defecto en [http://localhost:8000](http://localhost:8000).

### 4. Configurar y levantar el frontend

En otra terminal:

```sh
cd ../client
npm install
npm start
```

El frontend estará disponible en [http://localhost:3000](http://localhost:3000).

---

## Notas

- El frontend espera que el backend esté corriendo en `localhost:8000`.
- El backend utiliza MongoDB Atlas, pero puedes cambiar la URI en [`data/db.js`](api/data/db.js) si usas una base local.
- Para autenticación se utiliza JWT y bcryptjs para el hash de contraseñas.
- El proyecto incluye ejemplos de productos y usuarios en [`api/data/products.json`](api/data/products.json) y [`api/data/users.json`](api/data/users.json).

---