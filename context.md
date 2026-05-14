1. Visión General & Modelo de Negocio
Proyecto: Marketplace "One-Shot" para Entrenadores Fitness.

Modelo: El usuario busca gratis. Paga una "Sesión Inicial" para desbloquear al entrenador.

Monetización: 25% de comisión (incluyendo fees de Stripe).

Referencia UX: TaskRabbit (Minimalismo, búsqueda potente, tarjetas claras).

2. Stack Tecnológico (MERN Moderno)
Backend: Node.js + Express (ES Modules). Enfoque API-First (preparado para Web y App móvil).

Frontend: Next.js 14+ (App Router), Tailwind CSS.

DB: MongoDB Atlas (Mongoose).

Auth: JWT (JSON Web Tokens) para stateless authentication (indispensable para Apps móviles).

3. Arquitectura de Directorios (Orden y Escalabilidad)
📂 /fitness-backend (Estructura de Capas)
Se sigue el principio de Separación de Responsabilidades:

/src/models: Definición de datos (Mongoose).

/src/controllers: Lógica de orquestación de las peticiones.

/src/services: Lógica de Negocio Pura (ej: cálculos de Stripe, validaciones complejas). Aquí es donde vive la "inteligencia" que no cambia aunque cambies de base de datos.

/src/routes: Definición de endpoints de la API.

/src/middlewares: Seguridad, validación de roles (RBAC) y manejo de errores.

/src/utils: Funciones de ayuda (formateo de precios, generador de tokens).

📂 /fitness-frontend (Estructura Next.js)
/src/app: Rutas y páginas (App Router).

/src/components: Componentes reutilizables (Botones, Cards, Inputs).

/src/hooks: Lógica de estado y llamadas a la API (reutilizable).

/src/services: Capa de comunicación con el Backend (Axios/Fetch).

/src/store: Gestión de estado global (Zustand o Context API).

4. Roles y Permisos (RBAC - Role Based Access Control)
Super Admin / Admin: Panel de control, moderación, métricas financieras.

Entrenador: Gestión de disponibilidad, perfil profesional y cobros.

Usuario: Búsqueda, pagos y acceso a contenido comprado.

5. Directrices de Senior UX/UI (TaskRabbit Style)
Diseño Mobile-First: Todo lo que se haga en web debe ser usable en un smartphone, facilitando la futura transición a App nativa (React Native).

Componentes atómicos y diseño basado en tokens (colores y tipografías consistentes).

6. Seguridad y Robustez (Pentester & Senior Backend)
API-First Security: Protección contra CORS, Rate Limiting y sanitización de entradas.

JWT Stateless: Los tokens se enviarán en el Header Authorization: Bearer <token> para garantizar compatibilidad total con la App Móvil.

Validación de Esquemas: Uso de Zod tanto en front como en back para asegurar la integridad de los datos.

7. Instrucciones para la IA
"Crea código modular. No mezcles lógica de base de datos con rutas. La lógica de cobro del 25% debe estar en un 'Service' independiente. Usa siempre nombres de variables descriptivos y en inglés. Mantén los archivos pequeños y enfocados en una sola tarea (Single Responsibility Principle)."