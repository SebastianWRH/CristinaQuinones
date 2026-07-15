# Cristina Quiñones Landing

Frontend profesional para la web de Cristina Quiñones, construido como SPA con React, Vite y React Router. La experiencia principal es una landing editorial con páginas de detalle para libros, selector español/inglés, videoteca, testimonios, WhatsApp y formulario serverless.

## Stack

- React 19
- Vite
- React Router
- React Helmet Async
- Vitest + React Testing Library
- Vercel Functions para `/api/contact`

## Instalación

```bash
npm install
```

## Desarrollo

```bash
npm run dev
```

## Comandos

```bash
npm run lint
npm run test
npm run build
npm run check
npm run preview
```

## Estructura Principal

- `src/pages/Home.jsx`: landing principal.
- `src/pages/BookDetail.jsx`: detalle de libros por `slug`.
- `src/data/books.js`: fuente única de libros, traducciones, portadas y links de compra.
- `src/data/videos.js`: IDs y títulos de videoteca; las URLs se derivan desde el ID.
- `src/data/testimonials.js`: testimonios localizados.
- `src/components/ContactForm/`: formulario accesible con validación.
- `src/components/SEO/`: metadata, canonical, Open Graph, Twitter Card y JSON-LD.
- `api/contact.js`: función serverless compatible con Vercel.

## Idiomas

El idioma activo se guarda como preferencia local y se valida contra `es` y `en`. Si falta una traducción, el sistema hace fallback controlado a español y en desarrollo muestra una advertencia.

## Libros

Para agregar o editar un libro, modifica `src/data/books.js`. Usa un `slug` estable, portada importada, año, editorial, URL de compra y textos dentro de `translations.es` y `translations.en`.

## Videos

Para agregar o editar videos, modifica `src/data/videos.js`. Solo se guarda el `id` de YouTube y los títulos por idioma. Las miniaturas, enlaces externos y embeds se derivan automáticamente.

## Formulario

El formulario envía a `/api/contact`. La validación se ejecuta en frontend y servidor. El servidor usa Resend mediante API HTTP y no expone claves al cliente.

Variables requeridas en Vercel:

```env
RESEND_API_KEY=
CONTACT_TO_EMAIL=
CONTACT_FROM_EMAIL=
VITE_SITE_URL=
```

Usa `.env.example` como referencia. No subas un `.env` real.

## Despliegue en Vercel

`vercel.json` reescribe rutas internas de React hacia `index.html`, sin interceptar `/api/*` ni archivos estáticos. Esto permite abrir directamente:

- `/`
- `/libros/desnudando-la-mente-del-consumidor`
- `/libros/estrategias-con-calle`
- cualquier ruta inexistente, que renderiza la 404 de React.

## Seguridad

- Las claves de Resend solo viven en variables del servidor.
- `.env` y `.env.*` están ignorados, salvo `.env.example`.
- La función valida método, `Content-Type`, tamaño, campos permitidos, honeypot y datos requeridos.
- Vercel agrega headers preventivos básicos.

## SEO

La Home incluye schema `Person`. Cada libro incluye schema `Book`. La 404 usa `noindex, nofollow`. `public/robots.txt` y `public/sitemap.xml` contienen las URLs públicas reales.

## CI

El workflow `.github/workflows/ci.yml` ejecuta:

```bash
npm ci
npm run lint
npm run test
npm run build
```
