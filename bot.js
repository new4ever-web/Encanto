const botButton = document.getElementById("botCharacterButton");

const botWindow = document.getElementById("botWindow");

const botClose = document.getElementById("botClose");

const botForm = document.getElementById("botForm");

const botInput = document.getElementById("botInput");

const botMessages = document.getElementById("botMessages");

/* ========================================= */
/* ABRIR BOT */
/* ========================================= */

botButton.addEventListener("click", function () {
  botWindow.classList.toggle("active");

  if (botWindow.classList.contains("active")) {
    botInput.focus();
  }
});

/* ========================================= */
/* CERRAR BOT */
/* ========================================= */

botClose.addEventListener("click", function () {
  botWindow.classList.remove("active");
});

/* ========================================= */
/* LIMPIAR TEXTO */
/* ========================================= */

function limpiarTexto(texto) {
  return texto
    .toLowerCase()

    .normalize("NFD")

    .replace(/[\u0300-\u036f]/g, "")

    .replace(/[^a-z0-9\s]/g, " ")

    .replace(/\s+/g, " ")

    .trim();
}

/* ========================================= */
/* DISTANCIA ENTRE PALABRAS */
/* ========================================= */

/*
  Esto permite entender errores pequeños.

  Ejemplos:

  komo = como
  presio = precio
  taya = talla
  chaqeta = chaqueta
*/

function distanciaPalabras(a, b) {
  const matriz = [];

  for (let i = 0; i <= b.length; i++) {
    matriz[i] = [i];
  }

  for (let j = 0; j <= a.length; j++) {
    matriz[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matriz[i][j] = matriz[i - 1][j - 1];
      } else {
        matriz[i][j] = Math.min(
          matriz[i - 1][j - 1] + 1,

          matriz[i][j - 1] + 1,

          matriz[i - 1][j] + 1
        );
      }
    }
  }

  return matriz[b.length][a.length];
}

/* ========================================= */
/* SABER SI UNA PALABRA SE PARECE */
/* ========================================= */

function palabraParecida(palabra, objetivo) {
  if (palabra === objetivo) {
    return true;
  }

  if (palabra.length < 3 || objetivo.length < 3) {
    return false;
  }

  const distancia = distanciaPalabras(palabra, objetivo);

  /*
    Palabras cortas:
    máximo 1 error.

    Palabras largas:
    máximo 2 errores.
  */

  if (objetivo.length <= 5) {
    return distancia <= 1;
  }

  return distancia <= 2;
}

/* ========================================= */
/* BUSCAR PALABRAS AUNQUE ESTÉN MAL ESCRITAS */
/* ========================================= */

function contieneAlgo(texto, opciones) {
  const palabras = texto.split(" ");

  for (const opcion of opciones) {
    const opcionLimpia = limpiarTexto(opcion);

    /*
      Primero intenta encontrar
      la frase directamente.
    */

    if (texto.includes(opcionLimpia)) {
      return true;
    }

    /*
      Después compara palabras
      permitiendo errores.
    */

    const palabrasObjetivo = opcionLimpia.split(" ");

    for (const objetivo of palabrasObjetivo) {
      for (const palabra of palabras) {
        if (palabraParecida(palabra, objetivo)) {
          return true;
        }
      }
    }
  }

  return false;
}

/* ========================================= */
/* RESPUESTAS GUARDADAS */
/* ========================================= */

function responderBot(pregunta) {
  const texto = limpiarTexto(pregunta);

  /* ===================================== */
  /* 1. SALUDO */
  /* ===================================== */

  if (
    contieneAlgo(texto, [
      "hola",
      "holaa",
      "buenas",
      "buenos dias",
      "buenas tardes",
      "buenas noches",
      "hey",
      "ola",
    ])
  ) {
    return `
      ¡Hola! 💕
      <br><br>

      Bienvenido a Encanto.

      Puedes preguntarme por productos,
      precios, tallas o cómo realizar tu compra.
    `;
  }

  /* ===================================== */
  /* 2. VESTIDO */
  /* ===================================== */

  if (
    contieneAlgo(texto, [
      "vestido",
      "vestio",
      "vestdo",
      "unicornio",
      "unicorno",
      "vestido rosa",
    ])
  ) {
    return `
      👗 El <strong>Vestido unicornio rosa</strong>
      cuesta <strong>$85.000</strong>
      y está disponible en talla
      <strong>4</strong>.
    `;
  }

  /* ===================================== */
  /* 3. CONJUNTO AZUL */
  /* ===================================== */

  if (
    contieneAlgo(texto, [
      "conjunto",
      "conjuto",
      "conjnto",
      "conjunto azul",
      "camiseta pantaloneta",
    ])
  ) {
    return `
      🩵 El <strong>Conjunto azul</strong>
      cuesta <strong>$55.000</strong>
      y está disponible en talla
      <strong>8</strong>.
    `;
  }

  /* ===================================== */
  /* 4. CHAQUETA VARSITY */
  /* ===================================== */

  if (
    contieneAlgo(texto, [
      "varsity",
      "varcity",
      "chaqueta varsity",
      "chaqueta azul",
      "chaqeta azul",
      "chaqueta azul crema",
    ])
  ) {
    return `
      🧥 La <strong>Chaqueta varsity azul</strong>
      cuesta <strong>$95.000</strong>
      y está disponible en talla
      <strong>6</strong>.
    `;
  }

  /* ===================================== */
  /* 5. CHAQUETA LILA */
  /* ===================================== */

  if (
    contieneAlgo(texto, [
      "chaqueta lila",
      "chaqeta lila",
      "lila",
      "lilla",
      "morada",
      "chaqueta morada",
    ])
  ) {
    return `
      💜 La <strong>Chaqueta lila acolchada</strong>
      cuesta <strong>$85.000</strong>
      y está disponible en talla
      <strong>6</strong>.
    `;
  }

  /* ===================================== */
  /* 6. CHAQUETA JEAN */
  /* ===================================== */

  if (
    contieneAlgo(texto, [
      "chaqueta jean",
      "chaqeta jean",
      "chaqueta de jean",
      "chaqueta denim",
      "chaqueta jeans",
    ])
  ) {
    return `
      💙 La <strong>Chaqueta jean azul</strong>
      cuesta <strong>$85.000</strong>
      y está disponible en talla
      <strong>4</strong>.
    `;
  }

  /* ===================================== */
  /* 7. JEAN */
  /* ===================================== */

  if (
    contieneAlgo(texto, [
      "jean",
      "jeans",
      "jeams",
      "pantalon",
      "pantalon azul",
      "jean ancho",
    ])
  ) {
    return `
      👖 El <strong>Jean ancho azul</strong>
      cuesta <strong>$90.000</strong>
      y está disponible en talla
      <strong>6</strong>.
    `;
  }

  /* ===================================== */
  /* 8. TALLAS */
  /* ===================================== */

  if (
    contieneAlgo(texto, [
      "talla",
      "tallas",
      "taya",
      "taias",
      "tamaño",
      "tamano",
      "que talla",
      "cual talla",
    ])
  ) {
    return `
      Estas son las tallas disponibles:
      <br><br>

      👗 Vestido:
      <strong>4</strong>
      <br>

      🩵 Conjunto azul:
      <strong>8</strong>
      <br>

      🧥 Chaqueta varsity:
      <strong>6</strong>
      <br>

      👖 Jean ancho:
      <strong>6</strong>
      <br>

      💜 Chaqueta lila:
      <strong>6</strong>
      <br>

      💙 Chaqueta jean:
      <strong>4</strong>
    `;
  }

  /* ===================================== */
  /* 9. PRECIOS / CATÁLOGO */
  /* ===================================== */

  if (
    contieneAlgo(texto, [
      "precio",
      "precios",
      "presio",
      "presios",
      "cuanto vale",
      "cuanto cuesta",
      "cuanto cuestan",
      "valor",
      "productos",
      "producto",
      "catalogo",
      "catalogo",
      "que tienen",
      "que venden",
      "ropa",
    ])
  ) {
    return `
      Estos son nuestros productos:
      <br><br>

      👗 Vestido unicornio:
      <strong>$85.000</strong>
      <br>

      🩵 Conjunto azul:
      <strong>$55.000</strong>
      <br>

      🧥 Chaqueta varsity:
      <strong>$95.000</strong>
      <br>

      👖 Jean ancho:
      <strong>$90.000</strong>
      <br>

      💜 Chaqueta lila:
      <strong>$85.000</strong>
      <br>

      💙 Chaqueta jean:
      <strong>$85.000</strong>
    `;
  }

  /* ===================================== */
  /* 10. CÓMO COMPRAR / PEDIDO / PAGO */
  /* ===================================== */

  if (
    contieneAlgo(texto, [
      "como compro",
      "komo compro",
      "como comprar",
      "como ago para comprar",
      "como hago para comprar",
      "quiero comprar",
      "quiero pedir",
      "como pido",
      "como hago pedido",
      "hacer pedido",
      "pedido",
      "comprar",
      "compra",
      "pagar",
      "pago",
      "como pago",
      "komo pago",
    ])
  ) {
    return `
      Para realizar tu compra es muy fácil 💕
      <br><br>

      1. Elige el producto que deseas.
      <br>

      2. Revisa la talla y el precio.
      <br>

      3. Selecciona la cantidad.
      <br>

      4. Pulsa
      <strong>Comprar ahora</strong>.
      <br>

      5. Completa tus datos de entrega.
      <br>

      6. Continúa con el proceso de pago.
    `;
  }

  /* ===================================== */
  /* RESPUESTA PARA ALGO NO REGISTRADO */
  /* ===================================== */

  return `
    😊 No entendí completamente tu pregunta.
    <br><br>

    Puedes escribir cosas como:
    <br><br>

    • como compro<br>
    • cuanto vale el vestido<br>
    • que tallas hay<br>
    • precio del jean<br>
    • chaqueta lila<br>
    • que productos tienen
    <br><br>

    Si necesitas otra información también puedes
    escribirnos por WhatsApp.
  `;
}

/* ========================================= */
/* AGREGAR MENSAJES */
/* ========================================= */

function agregarMensaje(mensaje, tipo) {
  const elemento = document.createElement("div");

  if (tipo === "usuario") {
    elemento.className = "bot-user-message";
  } else {
    elemento.className = "bot-message";
  }

  elemento.innerHTML = mensaje;

  botMessages.appendChild(elemento);

  botMessages.scrollTop = botMessages.scrollHeight;
}

/* ========================================= */
/* ENVIAR PREGUNTA */
/* ========================================= */

botForm.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const pregunta = botInput.value.trim();

  if (!pregunta) {
    return;
  }

  agregarMensaje(pregunta, "usuario");

  botInput.value = "";

  const respuesta = responderBot(pregunta);

  setTimeout(function () {
    agregarMensaje(respuesta, "bot");
  }, 300);
});
