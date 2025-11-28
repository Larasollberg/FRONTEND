
Slack Clone 

Descripción del Proyecto

Esta es una aplicación React que simula una interfaz de chat similar a Slack. Incluye autenticación basada en JWT (JSON Web Tokens) para usuarios, navegación con React Router para diferentes vistas (como workspaces, canales, mensajes directos y perfiles), y iconos proporcionados por Lucide React. La app permite crear y gestionar workspaces, canales, enviar mensajes, y más. Es una copia funcional de Slack enfocada en el frontend, con posibilidad de integrar un backend API para persistencia de datos y autenticación JWT.


Librerías Usadas
React: Biblioteca principal para construir la interfaz de usuario.
React Router: Para manejar el enrutamiento y navegación entre vistas (ej. /home, /workspace/:id).
JWT (jsonwebtoken): Para generar y verificar tokens de autenticación (usado en el frontend para simular login/logout; en producción, el backend maneja esto).
Lucide React: Librería de iconos SVG para elementos UI como botones de envío, avatares, etc.
React Hooks: Incluidos en React para manejar estado (useState, useEffect).
Vercel

Instalación y Configuración

Prerrequisitos
Node.js (versión 16 o superior) instalado.
npm para gestionar dependencias.

Pasos de Instalación
Clona este repositorio o descarga los archivos del proyecto:


git clone https://frontend1-tau-three.vercel.app/
cd slack-clone-react

Instala las dependencias:
npm install

(Opcional) Si integras un backend, configura variables de entorno. Crea un archivo .env en la raíz:

FRONTEND/          
├── src/
│   ├── assets/            
│   ├── components/        
│   │   ├── ChannelChat   
│   │   ├── ChannelList      
│   │   └── ChanelMessage
│   │   ├── CreateWorkspace
│   │   ├── InviteUserForm
│   │   ├── MessageList
│   │   ├── Modal
│   │   ├── UserForm
│   │   ├── Workspace
│   ├── config
│   ├── constants
│   ├── hooks            
│   │   ├── useChannelMessaje.jsx          
│   │   ├── useChannel.jsx          
│   │   ├── useFetch.jsx       
│   │   ├── useFetchMessage.jsx
│   │   ├── useForm.jsx
│   │   ├── useWorkspace.jsx
│   │   ├── useWorkspaceMenu.jsx                    
│   ├── Middlewares
│   ├── Screens     
│   │   ├── CreateNewWorkspace
│   │   ├── HomeScreen
│   │   ├── LoginScreen
│   │   └── NewWorkspaceScreen
│   │   └── RegisterScreen
│   │   └── WorkspaceDetailScreen
│   ├── services        
│   │   ├── authService.js
│   │   ├── channelMessage.js
│   │   └── messageService.js
│   │   ├── workspaceService.js
│   ├── utils/            
│   ├── App.jsx
│   ├── index.css          
│   └── main.jsx                         
├── .env                  
├── gitignore
├── index.html
├── package-lock.json
├── package.json
├── README.md
├── vercel.json
└── vite.config.js



La verdad que este fue un proyecto muy dificil para mi, muchos desafios y mucha frustracion de por medio.
Espero cumplir con las consignas, y seguire intentando mejorar.