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
  const anual = p => p.periodo === "anual";
  const sufijo = p => !p.mensual ? "" : (anual(p) ? " / año" : " / mes");
  const enPeriodo = p => !p.mensual ? "" : (anual(p) ? " al año" : " al mes");
  if (box) {
    // Agrupar los planes por producto (campo "grupo")
    const grupos = [];
    C.productos.forEach(p => {
      const g = p.grupo || p.nombre;
      let gr = grupos.find(x => x.nombre === g);
      if (!gr) { gr = { nombre: g, items: [] }; grupos.push(gr); }
      gr.items.push(p);
    });
    const destinos = {};
    grupos.forEach(gr => {
      const wrap = document.createElement("div");
      wrap.className = "price-group";
      wrap.innerHTML = `<h3 class="price-group-title">${gr.nombre}</h3><div class="price-row"></div>`;
      box.appendChild(wrap);
      gr.items.forEach(p => destinos[p.id] = wrap.querySelector(".price-row"));
    });
    C.productos.forEach(p => {
      const card = document.createElement("div");
      card.className = "price" + (p.destacado ? " featured" : "") + (p.id.startsWith("lirauto") ? " auto" : "");
      card.innerHTML = `
        ${p.destacado ? `<span class="ribbon">${p.etiqueta || "Nuevo"}</span>` : ""}
        <h3>${p.nombre}</h3>
        <p class="muted">${p.subtitulo}</p>
        <div class="amount">${fmtUSD(p.precio)}${p.porEquipo ? '<small> / equipo</small>' : ""}${p.mensual ? `<small>${sufijo(p)}</small>` : ""}</div>
        ${p.precioRD ? `<p class="rd">o ${fmtRD(p.precioRD)}${enPeriodo(p)} por transferencia</p>` : ""}
        <ul>${p.incluye.map(i => `<li>${i}</li>`).join("")}</ul>
        ${p.porEquipo ? `<label class="qty">Cantidad de equipos
          <span><button type="button" data-q="-1" data-for="${p.id}">−</button><input type="number" min="1" max="50" value="1" id="qty-${p.id}" inputmode="numeric"><button type="button" data-q="1" data-for="${p.id}">+</button></span></label>
          <p class="total" id="total-${p.id}">Total: ${fmtUSD(p.precio)}</p>` : ""}
        <div class="pp-box" id="pp-${p.id}" hidden></div>
        <form class="pp-form" action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
          <input type="hidden" name="business" value="${C.paypalEmail}">
          <input type="hidden" name="item_name" value="${p.nombre} - ${p.subtitulo}">
          <input type="hidden" name="item_number" value="${p.id}">
          ${p.mensual ? `<input type="hidden" name="cmd" value="_xclick-subscriptions">
          <input type="hidden" name="a3" value="${p.precio}">
          <input type="hidden" name="p3" value="1">
          <input type="hidden" name="t3" value="${anual(p) ? "Y" : "M"}">
          <input type="hidden" name="src" value="1">
          <input type="hidden" name="sra" value="1">` : `<input type="hidden" name="cmd" value="_xclick">
          <input type="hidden" name="amount" value="${p.precio}">`}
          <input type="hidden" name="currency_code" value="${C.moneda}">
          ${p.porEquipo ? '<input type="hidden" name="quantity" value="1">' : ""}
          <input type="hidden" name="no_shipping" value="1">
          <input type="hidden" name="lc" value="es_XC">
          <input type="hidden" name="return" value="${base}gracias.html?p=${p.id}">
          <input type="hidden" name="cancel_return" value="${base}index.html#precios">
          <button type="submit" class="btn btn-paypal full">${p.mensual ? "Suscribirme con PayPal" : "Pagar con PayPal"}</button>
        </form>
        <button class="btn btn-ghost full" data-transfer="${p.id}">Pagar por transferencia</button>
        <a class="btn btn-wa-outline full" target="_blank" rel="noopener"
           href="${waLink("Hola, quiero " + (p.mensual ? "suscribirme a " : "comprar ") + p.nombre + ". ¿Cómo coordinamos el pago?")}">Coordinar por WhatsApp</a>
        <p class="secure">${p.mensual
          ? `Se cobra automáticamente cada ${anual(p) ? "año" : "mes"}. Cancela cuando quieras desde tu cuenta PayPal.`
          : "Pago seguro con PayPal o con tu tarjeta de débito o crédito, sin necesidad de cuenta."}</p>`;
      destinos[p.id].appendChild(card);
    });
  }

  // Cantidad de equipos
  const cantidad = id => {
    const el = document.getElementById("qty-" + id);
    return el ? Math.min(50, Math.max(1, parseInt(el.value) || 1)) : 1;
  };
  const actualizarTotal = id => {
    const p = C.productos.find(x => x.id === id), t = document.getElementById("total-" + id);
    if (t) t.textContent = "Total: " + fmtUSD(p.precio * cantidad(id));
  };
  document.addEventListener("click", e => {
    const b = e.target.closest("[data-q]");
    if (!b) return;
    const el = document.getElementById("qty-" + b.dataset.for);
    el.value = Math.min(50, Math.max(1, (parseInt(el.value) || 1) + parseInt(b.dataset.q)));
    actualizarTotal(b.dataset.for);
  });
  document.addEventListener("input", e => {
    if (e.target.id && e.target.id.startsWith("qty-")) actualizarTotal(e.target.id.slice(4));
  });

  // Botones inteligentes de PayPal (PayPal + tarjeta de débito/crédito)
  const clientId = (C.paypalClientId || "").trim();
  const cargarSDK = (extra, ns, alCargar) => {
    const s = document.createElement("script");
    s.src = "https://www.paypal.com/sdk/js?client-id=" + encodeURIComponent(clientId) +
            "&currency=" + C.moneda + "&locale=es_XC" + extra;
    s.setAttribute("data-namespace", ns);
    s.onload = alCargar;
    document.head.appendChild(s);
  };
  const okId = clientId && !/TU_CLIENT_ID/.test(clientId);

  // Suscripciones mensuales (necesitan un plan creado en PayPal)
  const subs = C.productos.filter(p => p.mensual && p.planId && !/TU_PLAN_ID/.test(p.planId));
  if (okId && subs.length) {
    cargarSDK("&vault=true&intent=subscription", "paypalSub", () => {
      subs.forEach(p => {
        const cont = document.getElementById("pp-" + p.id);
        const form = cont.nextElementSibling;
        window.paypalSub.Buttons({
          style: { layout: "vertical", shape: "rect", label: "subscribe", height: 45 },
          createSubscription: (data, actions) => actions.subscription.create({
            plan_id: p.planId,
            application_context: { shipping_preference: "NO_SHIPPING", brand_name: "LiranPos" }
          }),
          onApprove: data => {
            location.href = base + "gracias.html?p=" + p.id + "&suscripcion=" + encodeURIComponent(data.subscriptionID || "");
          },
          onError: err => {
            console.error(err);
            alert("No se pudo completar la suscripción. Intenta de nuevo o escríbenos por WhatsApp.");
          }
        }).render(cont).then(() => { cont.hidden = false; form.hidden = true; })
          .catch(() => { /* si falla, queda el botón clásico */ });
      });
    });
  }

  // Pagos únicos
  const unicos = C.productos.filter(p => !p.mensual);
  if (okId && unicos.length) {
    cargarSDK("&enable-funding=card&disable-funding=paylater", "paypal", () => {
      unicos.forEach(p => {
        const cont = document.getElementById("pp-" + p.id);
        const form = cont.nextElementSibling;
        paypal.Buttons({
          style: { layout: "vertical", shape: "rect", label: "pay", height: 45 },
          createOrder: (data, actions) => {
            const q = cantidad(p.id);
            return actions.order.create({
              purchase_units: [{
                description: p.nombre + " - " + p.subtitulo,
                amount: {
                  currency_code: C.moneda, value: (p.precio * q).toFixed(2),
                  breakdown: { item_total: { currency_code: C.moneda, value: (p.precio * q).toFixed(2) } }
                },
                items: [{ name: p.nombre, sku: p.id, quantity: String(q),
                          unit_amount: { currency_code: C.moneda, value: Number(p.precio).toFixed(2) } }]
              }],
              application_context: { shipping_preference: "NO_SHIPPING", brand_name: "LiranPos" }
            });
          },
          onApprove: (data, actions) => actions.order.capture().then(det => {
            location.href = base + "gracias.html?p=" + p.id + "&orden=" + encodeURIComponent(det.id || "");
          }),
          onError: err => {
            console.error(err);
            alert("No se pudo completar el pago. Intenta de nuevo o escríbenos por WhatsApp.");
          }
        }).render(cont).then(() => { cont.hidden = false; form.hidden = true; })
          .catch(() => { /* si falla, queda el botón clásico */ });
      });
    });
  }

  // Ventana de transferencia
  document.addEventListener("click", e => {
    const b = e.target.closest("[data-transfer]");
    if (!b) return;
    const p = C.productos.find(x => x.id === b.dataset.transfer);
    document.getElementById("m-prod").textContent = p.nombre;
    document.getElementById("m-monto").textContent =
      (p.precioRD ? fmtRD(p.precioRD) : fmtUSD(p.precio)) + (p.porEquipo ? " por equipo" : "") + enPeriodo(p);
    document.getElementById("m-bank").innerHTML =
      C.banco.map(r => `<div><span>${r.label}</span><b>${r.valor}</b></div>`).join("");
    document.getElementById("m-wa").href =
      waLink("Hola, realicé una transferencia por " + p.nombre + ". Aquí envío el comprobante.");
    document.getElementById("modal").classList.add("show");
  });
  window.cerrarModal = () => document.getElementById("modal").classList.remove("show");
  document.addEventListener("keydown", e => { if (e.key === "Escape") cerrarModal(); });

  // Protección: no enviar a PayPal si el correo no está configurado
  const ppMalo = !C.paypalEmail || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(C.paypalEmail) ||
                 /ejemplo|TU_CORREO/i.test(C.paypalEmail);
  document.addEventListener("submit", e => {
    const it = e.target.querySelector && e.target.querySelector("[name=item_number]");
    if (it && e.target.quantity) e.target.quantity.value = cantidad(it.value);
    if (e.target.action && e.target.action.includes("paypal.com") && ppMalo) {
      e.preventDefault();
      alert("El pago con PayPal aún no está configurado. Escríbenos por WhatsApp para completar tu compra.");
      if (ppMalo) console.warn("Pon el correo de tu cuenta PayPal en config.js (paypalEmail).");
    }
  });

  // Galería de capturas
  const caps = C.capturas || [];
  const gal = document.getElementById("gallery"), tabs = document.getElementById("cap-tabs");
  if (gal && caps.length) {
    const nombres = { liranpos: "LiranPos", food: "LiranPos Food", lirauto: "LirAuto Pro" };
    const grupos = [...new Set(caps.map(c => c.producto))];
    const mostrar = prod => {
      tabs.querySelectorAll("button").forEach(b => b.classList.toggle("on", b.dataset.p === prod));
      gal.innerHTML = "";
      caps.filter(c => c.producto === prod).forEach(c => {
        const fig = document.createElement("figure");
        fig.innerHTML = `<div class="shot"><img src="${c.img}" alt="${c.titulo}" loading="lazy"></div><figcaption>${c.titulo}</figcaption>`;
        const img = fig.querySelector("img");
        img.onerror = () => { fig.querySelector(".shot").innerHTML =
          `<div class="shot-empty"><b>Captura pendiente</b><span>Sube la imagen a<br>${c.img}</span></div>`; };
        img.onclick = () => {
          document.getElementById("lb-img").src = c.img;
          document.getElementById("lb-cap").textContent = c.titulo;
          document.getElementById("lightbox").classList.add("show");
        };
        gal.appendChild(fig);
      });
    };
    grupos.forEach(g => {
      const b = document.createElement("button");
      b.textContent = nombres[g] || g; b.dataset.p = g;
      b.onclick = () => mostrar(g);
      tabs.appendChild(b);
    });
    mostrar(grupos[0]);
  } else if (gal) {
    document.getElementById("capturas").style.display = "none";
  }

  // Formulario de contacto (FormSubmit, gratis)
  const f = document.getElementById("cform");
  if (f) {
    f.action = "https://formsubmit.io/" + C.correo;
    document.getElementById("f-next").value = base + "index.html?enviado=1#contacto";
    if (new URLSearchParams(location.search).get("enviado")) {
      document.getElementById("ok-msg").classList.add("show");
    }
  }

  // Descargas
  const D = C.descargas || {};
  const sinConfigurar = u => !u || /TU_USUARIO|TU_REPOSITORIO/.test(u);
  const dlBtn = document.getElementById("dl-btn");
  if (dlBtn) {
    const meta = [D.liranposVersion && "Versión " + D.liranposVersion, D.liranposTamano].filter(Boolean).join(" · ");
    document.getElementById("dl-meta").textContent = meta || "Instalador para Windows";
    if (sinConfigurar(D.liranposUrl)) {
      dlBtn.textContent = "Pedir instalador por WhatsApp";
      dlBtn.href = waLink("Hola, quiero el instalador de LiranPos.");
      dlBtn.target = "_blank";
    } else {
      dlBtn.href = D.liranposUrl;
    }
  }
  const foodBtn = document.getElementById("food-btn");
  if (foodBtn) {
    if (sinConfigurar(D.foodUrl)) {
      foodBtn.textContent = "Pedir acceso por WhatsApp";
      foodBtn.href = waLink("Hola, quiero acceso a LiranPos Food.");
    } else {
      foodBtn.href = D.foodUrl;
    }
  }

  // Descargas de LirAuto Pro (Windows y tablet)
  const enlaceDescarga = (id, url, metaId, meta, msg, txt) => {
    const btn = document.getElementById(id);
    if (!btn) return;
    const m = document.getElementById(metaId);
    if (m) m.textContent = meta;
    if (sinConfigurar(url)) {
      btn.textContent = txt;
      btn.href = waLink(msg);
      btn.target = "_blank";
    } else {
      btn.href = url;
    }
  };
  enlaceDescarga("la-btn", D.lirautoUrl, "la-meta",
    [D.lirautoVersion && "Versión " + D.lirautoVersion, D.lirautoTamano].filter(Boolean).join(" · ") || "Instalador para Windows",
    "Hola, quiero el instalador de LirAuto Pro.", "Pedir instalador por WhatsApp");
  enlaceDescarga("la-apk", D.lirautoApkUrl, "la-apk-meta",
    D.lirautoApkVersion ? "App Android · Versión " + D.lirautoApkVersion : "App Android",
    "Hola, quiero la app de tablet de LirAuto Pro.", "Pedir app de tablet por WhatsApp");

  // Cerrar menú móvil al tocar un enlace
  document.querySelectorAll("#menu a").forEach(a =>
    a.addEventListener("click", () => document.getElementById("menu").classList.remove("open")));
})();
