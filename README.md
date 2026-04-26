## 📘 README.md — Implementación JWT (Producción)

npm install express morgan dotenv jsonwebtoken cookie-parser

# 🏗️ 📁 Estructura de carpetas (final)
/
 ├── config/
 │    └── env.js
 │
 ├── controllers/
 │    └── auth.controller.js
 │
 ├── services/
 │    └── auth.service.js
 │
 ├── middlewares/
 │    └── auth.middleware.js
 │
 ├── routes/
 │    └── auth.routes.js
 │
 ├── lib/
 │    └── token.js
 │
 ├── utils/
 │    └── constants.js
 │
 ├── app.js
 └── server.js

# 🧠 🧩 Arquitectura

Controller → Service → Lib
        ↓
   Middleware (Auth)

🔐 🔑 Estrategia de autenticación
Tipo	Ubicación	Duración
Access Token	Header (Bearer)	15 min
Refresh Token	Cookie HttpOnly	7 días

📦 1. Configuración
📄 config/env.js
import dotenv from 'dotenv';

dotenv.config();

export const ENV = {
    PORT: process.env.PORT || 2000,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET
};