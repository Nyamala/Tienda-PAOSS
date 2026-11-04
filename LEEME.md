# PAOSS Tu Tienda · Tienda online

Página de tienda para zapatos de dama hecha con HTML, CSS y JavaScript, sin programas extra ni base de datos.

## Archivos

```
paoss-tienda/
├── index.html          → estructura de la página
├── css/styles.css      → diseño (colores en :root, al inicio)
├── js/productos.js     → CATÁLOGO: nombres, precios, tallas, fotos y número de WhatsApp
├── js/app.js           → funciones: filtros, ventana de producto, bolsa y pedido por WhatsApp
└── img/
    ├── productos/      → una foto por modelo (p03.jpg … p54.jpg)
    └── colecciones/    → portadas de Mules, Sandalias y Tacos
```

## Cambiar productos

Todo se edita en `js/productos.js`:

- **Cambiar un precio:** modifica `precio: 69`.
- **Cambiar la talla:** modifica `tallas: [38]` (o `[37, 38]` si hay varias).
- **Quitar un modelo vendido:** borra su línea completa.
- **Agregar un modelo:** copia una línea, cambia `id`, `nombre`, `precio`, `tallas` y pon la foto nueva en `img/productos/`.
- **Cambiar el WhatsApp:** edita `WHATSAPP_NUMERO` (con 51 delante) y `WHATSAPP_TEXTO`.

## Cómo funciona la compra

La clienta agrega zapatos a su bolsa y pulsa **“Pedir por WhatsApp”**. Se abre WhatsApp con un mensaje ya escrito con los modelos, las tallas, los códigos y el total. El pago y la entrega se coordinan por el chat.

## Publicarla gratis en internet

**Opción 1: Netlify Drop (la más fácil)**
1. Entra a https://app.netlify.com/drop
2. Arrastra la carpeta `paoss-tienda` completa.
3. Te da un enlace público (puedes cambiarle el nombre en *Site settings*).

**Opción 2: GitHub Pages**
1. Crea un repositorio en GitHub y sube todos los archivos de la carpeta.
2. Ve a *Settings → Pages*, elige la rama `main` y la carpeta `/ (root)`.
3. Tu tienda quedará en `https://TU-USUARIO.github.io/NOMBRE-DEL-REPO/`.

Para probarla en tu computadora, abre `index.html` con doble clic.
