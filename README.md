# Recepción de denuncias · MPF Entre Ríos

Guía operativa web para el personal del Ministerio Público Fiscal de Entre Ríos que recibe denuncias. Lleva a la pantalla el *Instructivo para la recepción de denuncias* (versión 2026, Procuración General) para usarlo en el momento: chequeo de urgencia, recepción guiada en cinco pasos con listas de tareas, pautas según el tipo de hecho, guía breve de preguntas y respuestas a las dudas de mostrador más frecuentes.

Es un sitio estático (HTML, CSS y JavaScript sin dependencias ni compilación). Lo que el empleado va tildando durante una recepción queda guardado solo en su navegador y se borra con “Nueva recepción”.

## Estructura

- `index.html`: estructura de la página.
- `css/styles.css`: identidad visual y tokens de diseño.
- `js/data.js`: todo el contenido del instructivo. Si el instructivo cambia, se actualiza acá.
- `js/app.js`: navegación, chequeo de urgencia, listas de control y búsqueda.
- `js/icons.js`: íconos de [Lucide](https://lucide.dev) (licencia ISC).
- `assets/mpf_logo.png`: logo institucional tomado de mpf.jusentrerios.gov.ar.

## Datos a completar

El teléfono y el canal de turno se completan en `js/data.js`, en la constante `TURNO`. Mientras esos datos estén vacíos, la app muestra un marcador visible en su lugar.

## Ver en local

```sh
python3 -m http.server 8080
```

Después abrí http://localhost:8080.

## Publicación

Se publica en Netlify sin paso de compilación: el directorio publicado es la raíz del repositorio (ver `netlify.toml`).
