/* Lógica de la página. No necesitas editar este archivo. */
(function () {
  const C = CONFIG;
  const fmtUSD = n => "US$" + Number(n).toLocaleString("en-US");
  const fmtRD = n => "RD$" + Number(n).toLocaleString("en-US");
  const waLink = msg => "https://wa.me/" + C.whatsapp + "?text=" + encodeURIComponent(msg);
  const base = location.href.split("#")[0].replace(/[^\/]*$/, "");

  // Enlaces de WhatsApp, correo y horario
  document.querySelectorAll(".js-wa").forEach(a => a.href = waLink(a.dataset.msg || "Hola"));
  document.querySelectorAll(".js-wa-num").forEach(s => s.textContent = "+" + C.whatsapp);
  document.querySelectorAll(".js-mail").forEach(a => a.href = "mailto:" + C.correo);
  document.querySelectorAll(".js-mail-txt").forEach(s => s.textContent = C.correo);
  document.querySelectorAll(".js-horario").forEach(s => s.textContent = C.horario);
  const y = document.getElementById("year"); if (y) y.textContent = new Date().getFullYear();

  // Tarjetas de precios
  const box = document.getElementById("prices");
  if (box) {
    C.productos.forEach(p => {
      const card = document.createElement("div");
      card.className = "price" + (p.destacado ? " featured" : "");
      card.innerHTML = `
        ${p.destacado ? '<span class="ribbon">Nuevo</span>' : ""}
        <h3>${p.nombre}</h3>
        <p class="muted">${p.subtitulo}</p>
        <div class="amount">${fmtUSD(p.precio)}${p.porEquipo ? '<small> / equipo</small>' : ""}</div>
        ${p.precioRD ? `<p class="rd">o ${fmtRD(p.precioRD)} por transferencia</p>` : ""}
        <ul>${p.incluye.map(i => `<li>${i}</li>`).join("")}</ul>
        <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
          <input type="hidden" name="cmd" value="_xclick">
          <input type="hidden" name="business" value="${C.paypalEmail}">
          <input type="hidden" name="item_name" value="${p.nombre} - ${p.subtitulo}">
          <input type="hidden" name="item_number" value="${p.id}">
          <input type="hidden" name="amount" value="${p.precio}">
          <input type="hidden" name="currency_code" value="${C.moneda}">
          ${p.porEquipo ? '<input type="hidden" name="undefined_quantity" value="1">' : ""}
          <input type="hidden" name="no_shipping" value="1">
          <input type="hidden" name="lc" value="es_XC">
          <input type="hidden" name="return" value="${base}gracias.html?p=${p.id}">
          <input type="hidden" name="cancel_return" value="${base}index.html#precios">
          <button type="submit" class="btn btn-paypal full">Pagar con PayPal</button>
        </form>
        <button class="btn btn-ghost full" data-transfer="${p.id}">Pagar por transferencia</button>
        <a class="btn btn-wa-outline full" target="_blank" rel="noopener"
           href="${waLink("Hola, quiero comprar " + p.nombre + ". ¿Cómo coordinamos el pago?")}">Coordinar por WhatsApp</a>
        <p class="secure">Pago seguro procesado por PayPal. Acepta tarjetas sin necesidad de cuenta.</p>`;
      box.appendChild(card);
    });
  }

  // Ventana de transferencia
  document.addEventListener("click", e => {
    const b = e.target.closest("[data-transfer]");
    if (!b) return;
    const p = C.productos.find(x => x.id === b.dataset.transfer);
    document.getElementById("m-prod").textContent = p.nombre;
    document.getElementById("m-monto").textContent =
      (p.precioRD ? fmtRD(p.precioRD) : fmtUSD(p.precio)) + (p.porEquipo ? " por equipo" : "");
    document.getElementById("m-bank").innerHTML =
      C.banco.map(r => `<div><span>${r.label}</span><b>${r.valor}</b></div>`).join("");
    document.getElementById("m-wa").href =
      waLink("Hola, realicé una transferencia por " + p.nombre + ". Aquí envío el comprobante.");
    document.getElementById("modal").classList.add("show");
  });
  window.cerrarModal = () => document.getElementById("modal").classList.remove("show");
  document.addEventListener("keydown", e => { if (e.key === "Escape") cerrarModal(); });

  // Cerrar menú móvil al tocar un enlace
  document.querySelectorAll("#menu a").forEach(a =>
    a.addEventListener("click", () => document.getElementById("menu").classList.remove("open")));
})();
