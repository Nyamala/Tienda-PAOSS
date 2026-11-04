/* =========================================================
   PAOSS Tu Tienda · Lógica de la tienda
   - Muestra el catálogo (datos en js/productos.js)
   - Filtros por colección, talla, búsqueda y orden
   - Ventana de detalle del producto
   - Bolsa de compras que arma el pedido por WhatsApp
   ========================================================= */
(function () {
  "use strict";

  // ---------- Utilidades ----------
  const $  = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
  const soles = n => "S/ " + n.toFixed(2);
  const linkWsp = texto => `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(texto)}`;
  const quitarTildes = s => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

  // Guardado local (si el navegador lo bloquea, la tienda sigue funcionando)
  const almacen = {
    leer(clave, defecto) {
      try { return JSON.parse(localStorage.getItem(clave)) ?? defecto; } catch { return defecto; }
    },
    guardar(clave, valor) {
      try { localStorage.setItem(clave, JSON.stringify(valor)); } catch { /* sin almacenamiento */ }
    }
  };

  // ---------- Estado ----------
  const estado = {
    categoria: "todas",
    talla: "",
    busqueda: "",
    orden: "destacados",
    carrito: almacen.leer("paoss-carrito", [])   // [{ id, talla, cant }]
  };
  // Descarta productos que ya no existan en el catálogo
  estado.carrito = estado.carrito.filter(i => PRODUCTOS.some(p => p.id === i.id));

  const porId = id => PRODUCTOS.find(p => p.id === id);

  // ---------- Enlaces generales de WhatsApp ----------
  $$(".js-whatsapp").forEach(a => {
    a.href = linkWsp("Hola PAOSS, quisiera información sobre sus zapatos 👠");
  });
  $$(".js-whatsapp-texto").forEach(el => (el.textContent = WHATSAPP_TEXTO));
  $("#anio").textContent = new Date().getFullYear();
  $("#totalModelos").textContent = PRODUCTOS.length;

  // ---------- Colecciones ----------
  const imagenesColeccion = {
    mules: "img/colecciones/mules.jpg",
    sandalias: "img/colecciones/sandalias.jpg",
    tacos: "img/colecciones/tacos.jpg"
  };

  function pintarColecciones() {
    $("#colecciones-lista").innerHTML = Object.entries(CATEGORIAS).map(([clave, cat]) => {
      const items = PRODUCTOS.filter(p => p.categoria === clave);
      const desde = Math.min(...items.map(p => p.precio));
      return `
        <button class="coleccion" data-ir-categoria="${clave}">
          <img src="${imagenesColeccion[clave]}" alt="Colección ${cat.nombre}" loading="lazy">
          <div class="coleccion__info">
            <div>
              <h3>${cat.nombre}</h3>
              <span>${items.length} modelos · desde ${soles(desde)}</span>
            </div>
            <span class="coleccion__flecha" aria-hidden="true">→</span>
          </div>
        </button>`;
    }).join("");
  }

  // Botones/enlaces que llevan a una colección del catálogo
  document.addEventListener("click", e => {
    const ir = e.target.closest("[data-ir-categoria]");
    if (!ir) return;
    e.preventDefault();
    estado.categoria = ir.dataset.irCategoria;
    pintarChips();
    pintarCatalogo();
    $("#catalogo").scrollIntoView({ behavior: "smooth" });
  });

  // ---------- Filtros ----------
  function pintarChips() {
    const opciones = [["todas", "Todo", PRODUCTOS.length]]
      .concat(Object.entries(CATEGORIAS).map(([k, c]) => [k, c.corto, PRODUCTOS.filter(p => p.categoria === k).length]));
    $("#chips").innerHTML = opciones.map(([k, nombre, n]) =>
      `<button class="chip" role="tab" data-cat="${k}" aria-selected="${estado.categoria === k}">${nombre}<small>${n}</small></button>`
    ).join("");
  }

  $("#chips").addEventListener("click", e => {
    const chip = e.target.closest(".chip");
    if (!chip) return;
    estado.categoria = chip.dataset.cat;
    pintarChips();
    pintarCatalogo();
  });
  $("#buscar").addEventListener("input", e => { estado.busqueda = e.target.value; pintarCatalogo(); });
  $("#filtroTalla").addEventListener("change", e => { estado.talla = e.target.value; pintarCatalogo(); });
  $("#ordenar").addEventListener("change", e => { estado.orden = e.target.value; pintarCatalogo(); });
  $("#limpiar").addEventListener("click", () => {
    Object.assign(estado, { categoria: "todas", talla: "", busqueda: "", orden: "destacados" });
    $("#buscar").value = ""; $("#filtroTalla").value = ""; $("#ordenar").value = "destacados";
    pintarChips(); pintarCatalogo();
  });

  function productosFiltrados() {
    const q = quitarTildes(estado.busqueda.trim());
    let lista = PRODUCTOS.filter(p =>
      (estado.categoria === "todas" || p.categoria === estado.categoria) &&
      (!estado.talla || p.tallas.includes(Number(estado.talla))) &&
      (!q || quitarTildes(`${p.nombre} ${CATEGORIAS[p.categoria].nombre} ${p.id}`).includes(q))
    );
    if (estado.orden === "precio-asc")  lista.sort((a, b) => a.precio - b.precio);
    if (estado.orden === "precio-desc") lista.sort((a, b) => b.precio - a.precio);
    if (estado.orden === "nombre")      lista.sort((a, b) => a.nombre.localeCompare(b.nombre, "es"));
    if (estado.orden === "destacados")  lista.sort((a, b) => (b.nuevo === true) - (a.nuevo === true));
    return lista;
  }

  // ---------- Catálogo ----------
  function textoTallas(p) { return "Talla " + p.tallas.join(" / "); }
  function enBolsa(id) { return estado.carrito.some(i => i.id === id); }

  function tarjeta(p) {
    return `
      <article class="producto">
        <button class="producto__foto" data-ver="${p.id}" aria-label="Ver ${p.nombre}">
          <img src="${p.img}" alt="${p.nombre}" loading="lazy" width="800" height="800">
          ${p.nuevo ? '<span class="insignia">Nuevo</span>' : ""}
        </button>
        <div class="producto__cuerpo">
          <span class="producto__cat">${CATEGORIAS[p.categoria].corto}</span>
          <h3 class="producto__nombre">${p.nombre}</h3>
          <span class="producto__talla">${textoTallas(p)}</span>
          <div class="producto__pie">
            <span class="precio">${soles(p.precio)}</span>
            <button class="btn-agregar ${enBolsa(p.id) ? "en-bolsa" : ""}" data-agregar="${p.id}">
              ${enBolsa(p.id) ? "En tu bolsa ✓" : "Agregar"}
            </button>
          </div>
        </div>
      </article>`;
  }

  function pintarCatalogo() {
    const lista = productosFiltrados();
    $("#grilla").innerHTML = lista.map(tarjeta).join("");
    $("#vacio").hidden = lista.length > 0;
    $("#resultado").textContent = `${lista.length} ${lista.length === 1 ? "modelo" : "modelos"}`;
  }

  $("#grilla").addEventListener("click", e => {
    const ver = e.target.closest("[data-ver]");
    const agregar = e.target.closest("[data-agregar]");
    if (ver) abrirProducto(ver.dataset.ver);
    if (agregar) {
      const p = porId(agregar.dataset.agregar);
      if (p.tallas.length > 1) abrirProducto(p.id);   // que elija la talla
      else agregarAlCarrito(p.id, p.tallas[0]);
    }
  });

  // ---------- Ventana de producto ----------
  let productoActual = null;
  let tallaElegida = null;
  let ultimoFoco = null;

  function abrirProducto(id) {
    const p = porId(id);
    productoActual = p;
    tallaElegida = p.tallas[0];
    $("#modalImg").src = p.img;
    $("#modalImg").alt = p.nombre;
    $("#modalCategoria").textContent = CATEGORIAS[p.categoria].nombre;
    $("#modalNombre").textContent = p.nombre;
    $("#modalPrecio").textContent = soles(p.precio);
    $("#modalCodigo").textContent = "Código: " + p.id;
    pintarTallasModal();
    abrirCapa("#capaProducto");
  }

  function pintarTallasModal() {
    const p = productoActual;
    $("#modalTallas").innerHTML = p.tallas.map(t =>
      `<button class="talla" data-talla="${t}" aria-pressed="${t === tallaElegida}">${t}</button>`
    ).join("");
    $("#modalWsp").href = linkWsp(
      `Hola PAOSS, me interesa el modelo *${p.nombre}* (código ${p.id}), talla ${tallaElegida}, a ${soles(p.precio)}. ¿Está disponible?`
    );
  }

  $("#modalTallas").addEventListener("click", e => {
    const b = e.target.closest("[data-talla]");
    if (!b) return;
    tallaElegida = Number(b.dataset.talla);
    pintarTallasModal();
  });
  $("#modalAgregar").addEventListener("click", () => {
    agregarAlCarrito(productoActual.id, tallaElegida);
    cerrarCapas();
  });

  // ---------- Capas (abrir / cerrar) ----------
  function abrirCapa(sel) {
    ultimoFoco = document.activeElement;
    $(sel).hidden = false;
    document.body.style.overflow = "hidden";
    const foco = $(sel).querySelector("[data-cerrar]");
    if (foco) foco.focus();
  }
  function cerrarCapas() {
    $$(".capa").forEach(c => (c.hidden = true));
    document.body.style.overflow = "";
    if (ultimoFoco) ultimoFoco.focus();
  }
  $$(".capa").forEach(capa => {
    capa.addEventListener("click", e => {
      if (e.target === capa || e.target.closest("[data-cerrar]")) cerrarCapas();
    });
  });
  document.addEventListener("keydown", e => { if (e.key === "Escape") cerrarCapas(); });

  // ---------- Carrito / bolsa ----------
  function agregarAlCarrito(id, talla) {
    const existente = estado.carrito.find(i => i.id === id && i.talla === talla);
    if (existente) existente.cant++;
    else estado.carrito.push({ id, talla, cant: 1 });
    guardarCarrito();
    const c = $("#contadorCarrito");
    c.classList.remove("pulso"); void c.offsetWidth; c.classList.add("pulso");
    avisar(`${porId(id).nombre} (T.${talla}) agregado a tu bolsa`);
  }

  function guardarCarrito() {
    almacen.guardar("paoss-carrito", estado.carrito);
    pintarCarrito();
    pintarCatalogo();
  }

  function pintarCarrito() {
    const items = estado.carrito;
    const unidades = items.reduce((s, i) => s + i.cant, 0);
    const total = items.reduce((s, i) => s + porId(i.id).precio * i.cant, 0);
    $("#contadorCarrito").textContent = unidades;
    $("#totalCarrito").textContent = soles(total);
    $("#pieCarrito").hidden = items.length === 0;

    $("#listaCarrito").innerHTML = items.length === 0
      ? `<div class="carrito__vacio"><p>Tu bolsa está vacía.</p><button class="btn btn--secundario" data-cerrar>Ver catálogo</button></div>`
      : items.map((i, idx) => {
          const p = porId(i.id);
          return `
            <div class="item">
              <img src="${p.img}" alt="${p.nombre}">
              <div>
                <p class="item__nombre">${p.nombre}</p>
                <p class="item__meta">Talla ${i.talla} · ${soles(p.precio)}</p>
                <div class="cantidad">
                  <button data-menos="${idx}" aria-label="Quitar uno">−</button>
                  <span>${i.cant}</span>
                  <button data-mas="${idx}" aria-label="Agregar uno">+</button>
                </div>
              </div>
              <div class="item__derecha">
                <p class="item__precio">${soles(p.precio * i.cant)}</p>
                <button class="quitar" data-quitar="${idx}">Quitar</button>
              </div>
            </div>`;
        }).join("");

    actualizarPedido();
  }

  $("#listaCarrito").addEventListener("click", e => {
    const t = e.target.closest("button");
    if (!t) return;
    if (t.dataset.mas)    estado.carrito[t.dataset.mas].cant++;
    if (t.dataset.menos)  { const it = estado.carrito[t.dataset.menos]; it.cant--; if (it.cant < 1) estado.carrito.splice(t.dataset.menos, 1); }
    if (t.dataset.quitar) estado.carrito.splice(t.dataset.quitar, 1);
    if (t.dataset.mas || t.dataset.menos || t.dataset.quitar) guardarCarrito();
  });

  // Arma el mensaje del pedido para WhatsApp
  function actualizarPedido() {
    const nombre = $("#clienteNombre").value.trim();
    const lugar = $("#clienteLugar").value.trim();
    const lineas = estado.carrito.map(i => {
      const p = porId(i.id);
      return `• ${i.cant} x ${p.nombre} (${p.id}) – Talla ${i.talla} – ${soles(p.precio * i.cant)}`;
    });
    const total = estado.carrito.reduce((s, i) => s + porId(i.id).precio * i.cant, 0);
    const texto = [
      "Hola PAOSS 👋, quiero hacer este pedido:",
      "",
      ...lineas,
      "",
      `*Total: ${soles(total)}*`,
      nombre ? `Nombre: ${nombre}` : "",
      lugar ? `Entrega en: ${lugar}` : "",
      "",
      "¿Me confirman disponibilidad y forma de pago? Gracias."
    ].filter((l, i, arr) => !(l === "" && arr[i - 1] === "")).join("\n");

    const btn = $("#btnPedido");
    btn.href = linkWsp(texto);
    btn.setAttribute("aria-disabled", estado.carrito.length === 0 ? "true" : "false");
  }
  $("#clienteNombre").addEventListener("input", actualizarPedido);
  $("#clienteLugar").addEventListener("input", actualizarPedido);

  $("#btnCarrito").addEventListener("click", () => abrirCapa("#capaCarrito"));

  // ---------- Menú móvil ----------
  $("#btnMenu").addEventListener("click", () => {
    const abierto = $("#menu").classList.toggle("abierto");
    $("#btnMenu").setAttribute("aria-expanded", abierto);
  });
  $$("#menu a").forEach(a => a.addEventListener("click", () => {
    $("#menu").classList.remove("abierto");
    $("#btnMenu").setAttribute("aria-expanded", "false");
  }));

  // ---------- Aviso breve ----------
  let tiempoAviso;
  function avisar(msg) {
    const t = $("#toast");
    t.textContent = msg;
    t.classList.add("visible");
    clearTimeout(tiempoAviso);
    tiempoAviso = setTimeout(() => t.classList.remove("visible"), 2200);
  }

  // ---------- Inicio ----------
  pintarColecciones();
  pintarChips();
  pintarCatalogo();
  pintarCarrito();
})();
