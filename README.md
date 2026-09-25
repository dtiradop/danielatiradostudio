# Daniela Tirado Studio — sitio web

Sitio estático (HTML + CSS + JS, sin dependencias ni build) listo para GitHub y Netlify.

```
index.html      Home (una sola página)
gracias.html    Página de confirmación del formulario
styles.css      Estilos, animaciones y responsive
main.js         Menú móvil, animaciones al hacer scroll, contadores, parallax
netlify.toml    Configuración de Netlify (headers y caché)
assets/         Logo, ilustraciones y capturas de proyectos (webp)
```

## 1. Subir a GitHub

1. Crea un repositorio vacío en github.com (por ejemplo `danielatirado-studio`), sin README.
2. En la terminal, dentro de esta carpeta:

```bash
git init
git add .
git commit -m "Sitio Daniela Tirado Studio"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/danielatirado-studio.git
git push -u origin main
```

## 2. Publicar en Netlify

1. Entra a app.netlify.com → **Add new site → Import an existing project → GitHub**.
2. Elige el repositorio.
3. Build command: *(vacío)* · Publish directory: `.`
4. **Deploy**. Cada `git push` a `main` vuelve a publicar solo.

## 3. Recibir el formulario en tu correo

El formulario usa **Netlify Forms** (gratis hasta 100 envíos/mes).

1. Después del primer deploy, en Netlify ve a **Site configuration → Forms** y haz clic en **Enable form detection**. Luego vuelve a hacer deploy (Deploys → Trigger deploy).
2. En **Forms → Form notifications → Add notification → Email notification**, elige el formulario `contacto` y pon `hola@danielatiradostudio.com`.
3. Haz un envío de prueba desde el sitio publicado. Los mensajes también quedan guardados en la pestaña **Forms**. Los envíos marcados como spam van a **Forms → Spam**.

## 4. Conectar tu dominio

**Domain management → Add a domain** → `danielatiradostudio.com`, y sigue las instrucciones de DNS (Netlify activa HTTPS automáticamente).

## Editar contenido

- Textos: `index.html`.
- Colores: variables al inicio de `styles.css` (`--dark`, `--purple`, `--pink`…).
- Nuevo proyecto: copia un bloque `<a class="project">` en `index.html` y agrega su imagen en `assets/`.
- Redes: busca `Instagram` y `LinkedIn` en el footer de `index.html` y reemplaza el `href="#"`.

## Probar en local

```bash
python3 -m http.server 8080
```
Abre http://localhost:8080 (el formulario solo funciona ya publicado en Netlify).
