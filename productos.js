/* =========================================================
   CATÁLOGO PAOSS · Colección Verano 2026 – 2027
   Para agregar, quitar o cambiar un zapato, edita solo esta lista.
   - id:        código único del producto
   - nombre:    nombre que se muestra en la tienda
   - categoria: "mules" | "sandalias" | "tacos"
   - precio:    en soles (número, sin "S/")
   - tallas:    tallas disponibles, ej. [38] o [37, 38]
   - img:       ruta de la foto dentro de la carpeta img/
   - nuevo:     true para mostrar la etiqueta "Nuevo" (opcional)
   ========================================================= */

const WHATSAPP_NUMERO = "51969446096";   // con código de país (Perú = 51)
const WHATSAPP_TEXTO  = "969 446 096";   // cómo se muestra en la página

const CATEGORIAS = {
  mules:     { nombre: "Mules elegantes",     corto: "Mules" },
  sandalias: { nombre: "Sandalias de verano", corto: "Sandalias" },
  tacos:     { nombre: "Tacos elegantes",     corto: "Tacos" }
};

const PRODUCTOS = [
  // ---------- MULES ELEGANTES ----------
  { id: "M01", nombre: "Mule Lazo Lila",              categoria: "mules", precio: 69, tallas: [38], img: "img/productos/p03.jpg" },
  { id: "M02", nombre: "Mule Flor Rosa",              categoria: "mules", precio: 69, tallas: [37], img: "img/productos/p04.jpg" },
  { id: "M03", nombre: "Mule Lazo Rojo",              categoria: "mules", precio: 69, tallas: [37], img: "img/productos/p05.jpg" },
  { id: "M04", nombre: "Mule Flor Vainilla",          categoria: "mules", precio: 69, tallas: [37], img: "img/productos/p06.jpg" },
  { id: "M05", nombre: "Mule Hebilla Negro",          categoria: "mules", precio: 69, tallas: [38], img: "img/productos/p07.jpg" },
  { id: "M06", nombre: "Mule Lazo Vino",              categoria: "mules", precio: 69, tallas: [38], img: "img/productos/p08.jpg" },
  { id: "M07", nombre: "Mule Lazo Blanco",            categoria: "mules", precio: 69, tallas: [37], img: "img/productos/p09.jpg" },
  { id: "M08", nombre: "Mule Lazo Lino",              categoria: "mules", precio: 69, tallas: [37], img: "img/productos/p10.jpg" },
  { id: "M09", nombre: "Mule Lazo Denim",             categoria: "mules", precio: 69, tallas: [38], img: "img/productos/p11.jpg" },
  { id: "M10", nombre: "Mule Hebilla Rojo",           categoria: "mules", precio: 69, tallas: [38], img: "img/productos/p12.jpg" },
  { id: "M11", nombre: "Slingback Joya Verde",        categoria: "mules", precio: 69, tallas: [38], img: "img/productos/p13.jpg" },
  { id: "M12", nombre: "Slingback Joya Champagne",    categoria: "mules", precio: 69, tallas: [38], img: "img/productos/p14.jpg" },
  { id: "M13", nombre: "Slingback Flor Celeste",      categoria: "mules", precio: 69, tallas: [37], img: "img/productos/p15.jpg" },
  { id: "M14", nombre: "Mule Hebilla Nude",           categoria: "mules", precio: 69, tallas: [38], img: "img/productos/p16.jpg" },
  { id: "M15", nombre: "Mule Tejido Celeste",         categoria: "mules", precio: 69, tallas: [37], img: "img/productos/p17.jpg" },
  { id: "M16", nombre: "Mule Tejido Rosa",            categoria: "mules", precio: 69, tallas: [37], img: "img/productos/p18.jpg" },
  { id: "M17", nombre: "Mule Tejido Lazo Azul",       categoria: "mules", precio: 69, tallas: [38], img: "img/productos/p19.jpg" },
  { id: "M18", nombre: "Slingback Tiras Limón",       categoria: "mules", precio: 69, tallas: [38], img: "img/productos/p20.jpg" },
  { id: "M19", nombre: "Slingback Flor Fucsia",       categoria: "mules", precio: 69, tallas: [37], img: "img/productos/p21.jpg" },
  { id: "M20", nombre: "Slingback Lazo Nude Glitter", categoria: "mules", precio: 69, tallas: [37], img: "img/productos/p22.jpg" },
  { id: "M21", nombre: "Slingback Tiras Rosa",        categoria: "mules", precio: 69, tallas: [38], img: "img/productos/p23.jpg" },
  { id: "M22", nombre: "Slingback Flor Crema",        categoria: "mules", precio: 69, tallas: [37], img: "img/productos/p24.jpg" },
  { id: "M23", nombre: "Mule Lazo Chocolate",         categoria: "mules", precio: 69, tallas: [38], img: "img/productos/p25.jpg" },
  { id: "M24", nombre: "Mule Hebilla Mostaza",        categoria: "mules", precio: 69, tallas: [38], img: "img/productos/p26.jpg" },
  { id: "M25", nombre: "Slingback Encaje Lila",       categoria: "mules", precio: 75, tallas: [37], img: "img/productos/p27.jpg" },
  { id: "M26", nombre: "Slingback Joya Plata",        categoria: "mules", precio: 75, tallas: [38], img: "img/productos/p28.jpg" },
  { id: "M27", nombre: "Slingback Flor Naranja",      categoria: "mules", precio: 75, tallas: [38], img: "img/productos/p29.jpg" },
  { id: "M28", nombre: "Slingback Malla Negro",       categoria: "mules", precio: 75, tallas: [38], img: "img/productos/p30.jpg" },
  { id: "M29", nombre: "Mule Croco Negro",            categoria: "mules", precio: 75, tallas: [37], img: "img/productos/p31.jpg" },
  { id: "M30", nombre: "Slingback Encaje Negro",      categoria: "mules", precio: 75, tallas: [37], img: "img/productos/p32.jpg" },
  { id: "M31", nombre: "Slingback Estampado Oro",     categoria: "mules", precio: 75, tallas: [38], img: "img/productos/p33.jpg" },
  { id: "M32", nombre: "Slingback Dorado Brillo",     categoria: "mules", precio: 75, tallas: [38], img: "img/productos/p34.jpg" },
  { id: "M33", nombre: "Slingback Floral Rosa",       categoria: "mules", precio: 75, tallas: [37], img: "img/productos/p35.jpg" },
  { id: "M34", nombre: "Mule Encaje Champagne",       categoria: "mules", precio: 75, tallas: [37], img: "img/productos/p36.jpg" },
  { id: "M35", nombre: "Mule Encaje Moka",            categoria: "mules", precio: 75, tallas: [38], img: "img/productos/p37.jpg" },
  { id: "M36", nombre: "Slingback Trenzado Caramelo", categoria: "mules", precio: 75, tallas: [38], img: "img/productos/p38.jpg" },
  { id: "M37", nombre: "Mule Perlas Rosé",            categoria: "mules", precio: 89, tallas: [37], img: "img/productos/p39.jpg", nuevo: true },
  { id: "M38", nombre: "Slingback Lazo Perlas",       categoria: "mules", precio: 89, tallas: [37, 38], img: "img/productos/p40.jpg", nuevo: true },

  // ---------- SANDALIAS DE VERANO ----------
  { id: "S01", nombre: "Sandalia Lazo Rosa",          categoria: "sandalias", precio: 69, tallas: [37], img: "img/productos/p42.jpg", nuevo: true },
  { id: "S02", nombre: "Sandalia Rafia Aros",         categoria: "sandalias", precio: 69, tallas: [38], img: "img/productos/p43.jpg" },
  { id: "S03", nombre: "Sandalia Rafia Sol",          categoria: "sandalias", precio: 69, tallas: [38], img: "img/productos/p44.jpg" },
  { id: "S04", nombre: "Sandalia Rafia Corazón",      categoria: "sandalias", precio: 69, tallas: [37], img: "img/productos/p45.jpg" },
  { id: "S05", nombre: "Sandalia Nudo Celeste",       categoria: "sandalias", precio: 69, tallas: [38], img: "img/productos/p46.jpg" },

  // ---------- TACOS ELEGANTES ----------
  { id: "T01", nombre: "Taco Lazo Cristal Negro",     categoria: "tacos", precio: 139, tallas: [39], img: "img/productos/p48.jpg", nuevo: true },
  { id: "T02", nombre: "Taco Lazo Cristal Moka",      categoria: "tacos", precio: 139, tallas: [38], img: "img/productos/p49.jpg" },
  { id: "T03", nombre: "Taco Flor Dorada",            categoria: "tacos", precio: 139, tallas: [38], img: "img/productos/p50.jpg" },
  { id: "T04", nombre: "Taco Brillo Rosé",            categoria: "tacos", precio: 145, tallas: [38], img: "img/productos/p51.jpg", nuevo: true },
  { id: "T05", nombre: "Sandalia Taco Tejido Camel",  categoria: "tacos", precio: 145, tallas: [39], img: "img/productos/p52.jpg" },
  { id: "T06", nombre: "Taco Bordado Floral",         categoria: "tacos", precio: 145, tallas: [38, 39], img: "img/productos/p53.jpg" },
  { id: "T07", nombre: "Taco Corazón Perla",          categoria: "tacos", precio: 145, tallas: [38], img: "img/productos/p54.jpg" }
];
