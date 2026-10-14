/* =========================================================
   CONFIGURACIÓN DE TU PÁGINA — EDITA SOLO ESTE ARCHIVO
   Cambia los valores entre comillas y los precios.
   ========================================================= */
const CONFIG = {

  // WhatsApp: código de país + número, SIN espacios, guiones ni "+"
  // Ejemplo RD: 18095551234
  whatsapp: "18293951985",

  correo: "Ventasliranpos@gmail.com.com",
  horario: "Lunes a sábado, 8:00 a.m. – 6:00 p.m.",

  // Correo de tu cuenta PayPal (la que recibe el dinero).
  // Debe ser una cuenta PayPal real (no la de Sandbox/Developer).
  paypalEmail: "ramonliranzo19@gmail.com",

  // PayPal no cobra en pesos dominicanos, por eso se usa USD.
  moneda: "USD",

  // Precios de referencia en pesos para mostrar junto al precio en dólares
  // (pon 0 para no mostrarlos).
  productos: [
    {
      id: "liranpos",
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
    {
      id: "food",
      nombre: "LiranPos Food",
      subtitulo: "Sistema en la nube · Pago único",
      precio: 200,
      precioRD: 12000,
      porEquipo: false,
      destacado: true,
      incluye: [
        "Acceso desde cualquier dispositivo",
        "Módulo de delivery con pago PayPal",
        "App instalable con notificaciones",
        "Base de datos propia para tu negocio",
        "Hospedaje del sistema incluido",
        "Configuración, capacitación y soporte"
      ]
    }
  ],

  // Datos para transferencia bancaria
  banco: [
    { label: "Banco",            valor: "Banreservas" },
    { label: "Tipo de cuenta",   valor: "Ahorros" },
    { label: "Número de cuenta", valor: "960" },
    { label: "A nombre de",      valor: "Ramon Arturo Liranzo" },
    { label: "Cédula / RNC",     valor: "000-0000000-0" }
  ],

  // Capturas de pantalla: guarda tus imágenes en la carpeta "img"
  // con estos nombres (o cambia los nombres aquí). Formato .png o .jpg.
  // producto: "liranpos" o "food"
  capturas: [
    { producto: "liranpos", img: "img/liranpos-ventas.jpg",     titulo: "Pantalla de ventas" },
    { producto: "liranpos", img: "img/liranpos-inventario.jpg", titulo: "Inventario y productos" },
    { producto: "liranpos", img: "img/liranpos-cierre.jpg",     titulo: "Cierre de caja" },
    { producto: "liranpos", img: "img/liranpos-bar.jpg",        titulo: "Modo Drink / Bar" },
    { producto: "food",     img: "img/food-ventas.jpg",         titulo: "Punto de venta web" },
    { producto: "food",     img: "img/food-delivery.jpg",       titulo: "Pedidos de delivery" },
    { producto: "food",     img: "img/food-celular.jpg",        titulo: "App en el celular" }
  ]
  // El formulario de contacto envía los mensajes al "correo" de arriba
  // (servicio gratuito FormSubmit). La primera vez te llegará un correo
  // para confirmar: ábrelo y haz clic en "Activate Form".
};
