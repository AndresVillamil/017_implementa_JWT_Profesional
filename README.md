## 📘 README.md — Implementación JWT (Producción)

npm install express morgan dotenv jsonwebtoken cookie-parser

# 🏗️ 📁 Estructura de carpetas (final)
gg/
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

# 🔐 Implementación JWT Profesional (Bearer + Refresh Tokens + Cookies)

Proyecto base en Node.js + Express que implementa autenticación moderna usando:

- ✅ Access Token (JWT)
- ✅ Refresh Token
- ✅ Cookies seguras (httpOnly)
- ✅ Middleware de protección
- ✅ Flujo real tipo producción

---

# 📦 Estructura del Proyecto

.
├── app.js
├── server.js
├── routes/
│ └── auth.routes.js
├── controllers/
│ └── auth.controller.js
├── services/
│ └── auth.service.js
├── middlewares/
│ └── auth.middleware.js
├── config/
│ └── env.js
├── package.json


---

# 🚀 Instalación

```bash
npm install

Dependencias principales:

npm install express jsonwebtoken dotenv cookie-parser morgan
▶️ Ejecución
node server.js

Servidor:

http://localhost:2000
🔐 Conceptos Clave
🧠 Access Token
Vida corta (ej: 15 min)
Se envía en headers
Se usa para acceder a endpoints protegidos
🔄 Refresh Token
Vida larga (ej: 7 días)
Se guarda en cookie httpOnly
Permite generar nuevos access tokens
🍪 Cookies httpOnly
No accesibles desde JavaScript
Protegen contra XSS
🔁 Flujo de Autenticación
LOGIN
  ↓
Genera accessToken + refreshToken
  ↓
refreshToken → cookie segura
  ↓
AccessToken → cliente
  ↓
AccessToken expira
  ↓
/refresh (usa cookie)
  ↓
Nuevo accessToken
📡 Endpoints
🔐 Login

POST

/api/login

Body:

{
  "username": "edwin",
  "password": "123456"
}

Respuesta:

{
  "accessToken": "..."
}

Cookie generada:

refreshToken=xxxxx
🔄 Refresh Token

POST

/api/refresh

✔️ No requiere body
✔️ Usa cookie automáticamente

Respuesta:

{
  "accessToken": "nuevo_token"
}
🔒 Ruta protegida

GET

/api/profile

Header:

Authorization: Bearer <accessToken>

Respuesta:

{
  "message": "Perfil protegido",
  "user": {
    "id": 1,
    "username": "edwin",
    "role": "admin"
  }
}
🚪 Logout

POST

/api/logout

Resultado:

Elimina cookie
Cierra sesión
🧪 Pruebas con Thunder Client
1. Login
POST http://localhost:2000/api/login
2. Verificar cookie

Tabs → Cookies → refreshToken

3. Refresh
POST http://localhost:2000/api/refresh
4. Ruta protegida
GET http://localhost:2000/api/profile
Authorization: Bearer TOKEN
⚠️ Configuración para Desarrollo

En auth.controller.js:

res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: false,       // localhost
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000
});
🚀 Configuración para Producción
res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: true,        // HTTPS obligatorio
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000
});
🛡️ Seguridad (Nivel Senior)
Riesgos
Riesgo	Mitigación
XSS	Cookies httpOnly
CSRF	sameSite + tokens
Token theft	Expiración corta
Replay attacks	Rotación de refresh tokens
🧠 Buenas Prácticas
❌ No guardar tokens en localStorage
✅ Usar cookies httpOnly para refresh
✅ Access tokens cortos
✅ Separar capas (controller, service, middleware)
✅ Usar variables de entorno
🧱 Arquitectura
Routes → Controllers → Services → JWT
          ↓
      Cookies / Headers
          ↓
      Middlewares
📌 Próximos pasos (nivel profesional)
🔐 Guardar refresh tokens en base de datos
🔄 Rotación de refresh tokens
📱 Manejo multi-dispositivo
🚫 Revocación de sesiones
🛡️ Protección CSRF avanzada
🧑‍💻 Autor

Proyecto educativo orientado a:

Backend moderno
Seguridad JWT
Preparación entrevistas senior