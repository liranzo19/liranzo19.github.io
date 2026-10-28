/* =========================================================
   CONFIGURACIÓN DE TU PÁGINA — EDITA SOLO ESTE ARCHIVO
   Cambia los valores entre comillas y los precios.
   ========================================================= */
const CONFIG = {

  // WhatsApp: código de país + número, SIN espacios, guiones ni "+"
  // Ejemplo RD: 18095551234
  whatsapp: "18293951985",

  correo: "ventasliranpos@gmail.com",
  horario: "Lunes a sábado, 8:00 a.m. – 6:00 p.m.",

  // Correo de tu cuenta PayPal (la que recibe el dinero).
  // Debe ser una cuenta PayPal real (no la de Sandbox/Developer).
  paypalEmail: "ventasliranpos@gmail.com",

  // Client ID de PRODUCCIÓN (Live) de tu app en developer.paypal.com.
  // Con él aparecen los botones "PayPal" y "Tarjeta de débito o crédito".
  // Si lo dejas así, se usa el botón clásico de PayPal (con paypalEmail).
  paypalClientId: "BAAL3G1oNhw5XBu3X-N2sRUKsVAtdgpKXiuIP_Vj6yjy3DdcADBaI0WZRhNtTeeyt190S35DaDL8Ph2QUg",

  // PayPal no cobra en pesos dominicanos, por eso se usa USD.
  moneda: "USD",

  // Precios de referencia en pesos para mostrar junto al precio en dólares
  // (pon 0 para no mostrarlos).
  productos: [
    {
      id: "liranpos",
      grupo: "LiranPos",
      nombre: "LiranPos",
      subtitulo: "Licencia por equipo · Pago único",
      precio: 150,        // en USD
      precioRD: 9000,     // en RD$ (para transferencia)
      porEquipo: true,    // permite al cliente elegir cantidad de equipos en PayPal
      destacado: false,
      incluye: [
        "Programa completo para Windows",
        "Adaptable a tu tipo de negocio",
        "NCF, tickets y código de barras",
        "Cierre de caja y control de inventario",
        "Instalación y capacitación",
        "Soporte técnico por WhatsApp"
      ]
    },
    
   // ---- LiranPos Food: dos planes mensuales ----
    // planId: ID del plan en PayPal (empieza con "P-"). Con él aparecen los
    // botones de PayPal y tarjeta. Si lo dejas así, se usa el botón clásico.
    {
      id: "food-basico",
      grupo: "LiranPos Food",
      nombre: "LiranPos Food Básico",
      subtitulo: "En la nube · Suscripción mensual",
      precio: 20,         // en USD, cada mes
      precioRD: 1200,     // en RD$ por mes (para transferencia)
      mensual: true,
      planId: "P-98W36091S24274153NLIPOZQ",
      destacado: false,
      incluye: [
        "Punto de venta web en cualquier dispositivo",
        "Ventas, caja y reportes",
        "Hasta 2 usuarios",
        "Base de datos propia para tu negocio",
        "Hospedaje y actualizaciones incluidos",
        "Configuración, capacitación y soporte",
        "Sin contrato: cancela cuando quieras"
      ]
    },
    {
      id: "food-avanzado",
      grupo: "LiranPos Food",
      nombre: "LiranPos Food Avanzado",
      subtitulo: "En la nube · Suscripción mensual",
      precio: 35,
      precioRD: 2100,
      mensual: true,
      planId: "P-2KD26869UL5260435NLIPQIY",   // pega aquí el ID del plan Avanzado (empieza con "P-")
      destacado: true,
      etiqueta: "Recomendado",
      incluye: [
        "Todo lo del plan Básico",
        "Usuarios y cajas ilimitados",
        "Módulo de delivery con pago PayPal",
        "App instalable con notificaciones",
        "Comanda y pantalla de turnos",
        "Módulo de mesero y de repartidor",
        "Sin contrato: cancela cuando quieras"
      ]
    },

    // ---- LirAuto Pro: sistema para talleres (mensual o anual) ----
    // periodo: "mes" o "anual". planId: ID del plan en PayPal ("P-...").
    {
      id: "lirauto-mensual",
      grupo: "LirAuto Pro",
      nombre: "LirAuto Pro Mensual",
      subtitulo: "Para talleres · Suscripción mensual",
      precio: 30,         // en USD, cada mes
      precioRD: 1800,     // en RD$ por mes (para transferencia)
      mensual: true,
      periodo: "mes",
      planId: "P-0N046104W9297191JNLRCQ5A",
      destacado: false,
      incluye: [
        "Órdenes de trabajo y estado de la reparación",
        "Inventario de piezas y compras",
        "Cotizaciones y facturación con NCF",
        "Historial de clientes y vehículos",
        "App para tablet en el taller",
        "Actualizaciones y soporte incluidos",
        "Sin contrato: cancela cuando quieras"
      ]
    },
    {
      id: "lirauto-anual",
      grupo: "LirAuto Pro",
      nombre: "LirAuto Pro Anual",
      subtitulo: "Para talleres · Suscripción anual",
      precio: 250,        // en USD, cada año
      precioRD: 15000,    // en RD$ por año (para transferencia)
      mensual: true,
      periodo: "anual",
      planId: "P-8F177220P94150032NLRCTII",
      destacado: true,
      etiqueta: "Ahorra US$110",
      incluye: [
        "Todo lo del plan mensual",
        "Equivale a menos de US$21 al mes",
        "Un solo pago al año",
        "Actualizaciones y soporte incluidos",
        "Cancela la renovación cuando quieras"
      ]
    }
  ],


  // Datos para transferencia bancaria
  banco: [
    { label: "Banco",            valor: "Banreservas" },
    { label: "Tipo de cuenta",   valor: "Ahorros" },
    { label: "Número de cuenta", valor: "9607230367" },
    { label: "A nombre de",      valor: "Ramon Arturo Liranzo" },
    { label: "Cédula / RNC",     valor: "preguntar por WhatsApp" }
  ],

  // Descargas
  descargas: {
    // Enlace del instalador en GitHub Releases. Con "latest" siempre
    // descarga la última versión que publiques. Cambia TU_USUARIO,
    // TU_REPOSITORIO y el nombre del .exe por los tuyos.
    liranposUrl: "https://github.com/liranzo19/liranzo19.github.io/releases/latest/download/LiranPos-Instalador-3.6.0.exe",
    liranposVersion: "3.6.0",
    liranposTamano: "20.8 MB",

    // Dirección donde tus clientes entran a LiranPos Food
    foodUrl: "https://liranzo.pythonanywhere.com",

    // LirAuto Pro: instalador de Windows y app de tablet (APK de Android).
    // Súbelos a GitHub Releases con un nombre fijo y pon aquí el enlace.
    lirautoUrl: "https://github.com/TU_USUARIO/TU_REPOSITORIO/releases/latest/download/LirAutoPro-Instalador.exe",
    lirautoVersion: "1.0",
    lirautoTamano: "",
    lirautoApkUrl: "https://github.com/TU_USUARIO/TU_REPOSITORIO/releases/latest/download/LirAutoPro-Tablet.apk",
    lirautoApkVersion: "1.0"
  },

  // Capturas de pantalla: guarda tus imágenes en la carpeta "img"
  // con estos nombres (o cambia los nombres aquí). Formato .png o .jpg.
  // producto: "liranpos", "food" o "lirauto"
  capturas: [
    { producto: "liranpos", img: "img/liranpos-ventas.jpg",     titulo: "Pantalla de ventas" },
    { producto: "liranpos", img: "img/liranpos-inventario.jpg", titulo: "Inventario y productos" },
    { producto: "liranpos", img: "img/liranpos-cierre.jpg",     titulo: "Cierre de caja" },
    { producto: "liranpos", img: "img/liranpos-bar.jpg",        titulo: "Modo Drink / Bar" },
    { producto: "food",     img: "img/food-ventas.jpg",         titulo: "Punto de venta web" },
    { producto: "food",     img: "img/food-delivery.jpg",       titulo: "Pedidos de delivery" },
    { producto: "food",     img: "img/food-celular.jpg",        titulo: "App en el celular" },
    { producto: "lirauto",  img: "img/lirauto-dashboard.jpg",   titulo: "Dashboard" },
    { producto: "lirauto",  img: "img/lirauto-inventario.jpg",  titulo: "Inventario de piezas" },
    { producto: "lirauto",  img: "img/lirauto-factura.jpg",     titulo: "Cotizaciones y facturas" },
    { producto: "lirauto",  img: "img/lirauto-tablet.jpg",      titulo: "App para tablet" }
  ]
  // El formulario de contacto envía los mensajes al "correo" de arriba
  // (servicio gratuito FormSubmit). La primera vez te llegará un correo
  // para confirmar: ábrelo y haz clic en "Activate Form".
};
