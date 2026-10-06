# Daniela Tirado Studio — sitio web

Sitio estático (HTML + CSS + JS, sin dependencias ni build) listo para GitHub y Netlify.

```
index.html      Home (una sola página)
portafolio.html Página de portafolio con filtros
portfolio-data.js  Lista de proyectos (aquí se agregan webs nuevas)
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

## 3. Formulario → correo

El formulario envía los mensajes con **FormSubmit** directamente desde el código (`main.js`), sin configurar nada en Netlify.

1. Publica el sitio y envía un mensaje de prueba desde el formulario.
2. Llega un correo de **FormSubmit** a `hola@danielatiradostudio.com` pidiendo activar el formulario: haz clic en **Activate Form** (solo la primera vez).
3. Desde ahí, cada envío llega a ese correo con asunto "Nuevo contacto web: …". Al darle *Responder* le contestas directo al cliente.

Si quieres recibirlo en otro correo, cambia `CORREO_DESTINO` al inicio de `main.js`. Revisa la carpeta de spam la primera vez.

## 4. Conectar tu dominio

**Domain management → Add a domain** → `danielatiradostudio.com`, y sigue las instrucciones de DNS (Netlify activa HTTPS automáticamente).

## Editar contenido

- Textos: `index.html`.
- Colores: variables al inicio de `styles.css` (`--morado-profundo`, `--morado`, `--rosa`…).
- Nuevo proyecto: agrega un bloque en `portfolio-data.js` y su captura en `assets/portafolio/` (webp, 1200 px). Con `destacado: true` también aparece en el home.
- Redes: busca `Instagram` y `LinkedIn` en el footer de `index.html` y `portafolio.html` y reemplaza el `href="#"`.

## Probar en local

```bash
python3 -m http.server 8080
```
Abre http://localhost:8080 (el formulario también funciona en local).
