/* ================================================= */
/* PRODUCTOS ENCANTO + LINKS DE BOLD */
/* ================================================= */

const productos = {

    "Vestido unicornio rosa": {
      precio: 85000,
      talla: "4",
      imagen: "assets/productos/vestido-unicornio-rosa.png",
      bold: "https://checkout.bold.co/payment/LNK_68PQM52CZL"
    },
  
    "Conjunto azul": {
      precio: 55000,
      talla: "8",
      imagen: "assets/productos/conjunto-azul.png",
      bold: "https://checkout.bold.co/payment/LNK_M03W844G04"
    },
  
    "Chaqueta varsity azul": {
      precio: 95000,
      talla: "6",
      imagen: "assets/productos/chaqueta-varsity-azul.png",
      bold: "https://checkout.bold.co/payment/LNK_YEQ79NM503"
    },
  
    "Jean ancho azul": {
      precio: 90000,
      talla: "6",
      imagen: "assets/productos/jean-ancho.png",
      bold: "https://checkout.bold.co/payment/LNK_YIDQG1ANVI"
    },
  
    "Chaqueta lila acolchada": {
      precio: 85000,
      talla: "6",
      imagen: "assets/productos/chaqueta-lila.png",
      bold: "https://checkout.bold.co/payment/LNK_GJZO64ABLE"
    },
  
    "Chaqueta jean azul": {
      precio: 85000,
      talla: "4",
      imagen: "assets/productos/chaqueta-jean.png",
      bold: "https://checkout.bold.co/payment/LNK_HF575RU2ZD"
    }
  
  };
  
  
  /* ================================================= */
  /* LEER PRODUCTO DESDE LA URL */
  /* ================================================= */
  
  const parametros =
    new URLSearchParams(
      window.location.search
    );
  
  
  const nombreProducto =
    parametros.get("producto");
  
  
  /*
    POR AHORA SOLO PERMITIREMOS
    UNA UNIDAD POR PAGO EN BOLD.
  */
  
  const cantidad = 1;
  
  
  const producto =
    productos[nombreProducto];
  
  
  /* ================================================= */
  /* ELEMENTOS DEL CHECKOUT */
  /* ================================================= */
  
  const nombreResumen =
    document.querySelector(
      ".summary-item strong"
    );
  
  
  const descripcionResumen =
    document.querySelector(
      ".summary-item p"
    );
  
  
  const imagenResumen =
    document.querySelector(
      ".summary-icon"
    );
  
  
  const lineasResumen =
    document.querySelectorAll(
      ".summary-line strong"
    );
  
  
  const totalResumen =
    document.querySelector(
      ".summary-total strong"
    );
  
  
  const formulario =
    document.getElementById(
      "checkoutForm"
    );
  
  
  const opcionesBold =
    document.querySelectorAll(
      ".payment-bold-option"
    );
  
  
  const contraEntregaButton =
    document.getElementById(
      "contraEntregaButton"
    );
  
  
  const contraEntregaPago =
    document.getElementById(
      "contraEntregaPago"
    );
  
  
  /* ================================================= */
  /* FORMATEAR PRECIOS */
  /* ================================================= */
  
  function formatoPesos(valor) {
  
    return new Intl.NumberFormat(
      "es-CO",
      {
        style: "currency",
        currency: "COP",
        minimumFractionDigits: 0
      }
    ).format(valor);
  
  }
  
  
  /* ================================================= */
  /* MOSTRAR PRODUCTO SELECCIONADO */
  /* ================================================= */
  
  if (producto) {
  
    const subtotal =
      producto.precio * cantidad;
  
  
    /* NOMBRE */
  
    if (nombreResumen) {
  
      nombreResumen.textContent =
        nombreProducto;
  
    }
  
  
    /* TALLA Y CANTIDAD */
  
    if (descripcionResumen) {
  
      descripcionResumen.textContent =
        "Talla " +
        producto.talla +
        " · Cantidad 1";
  
    }
  
  
    /* FOTO */
  
    if (imagenResumen) {
  
      imagenResumen.innerHTML = "";
  
  
      const imagen =
        document.createElement("img");
  
  
      imagen.src =
        producto.imagen;
  
  
      imagen.alt =
        nombreProducto;
  
  
      imagenResumen.appendChild(
        imagen
      );
  
    }
  
  
    /*
      RESUMEN
  
      0 = Producto
      1 = Talla
      2 = Cantidad
      3 = Subtotal
      4 = Envío
    */
  
    if (
      lineasResumen.length >= 5
    ) {
  
      lineasResumen[0].textContent =
        nombreProducto;
  
  
      lineasResumen[1].textContent =
        producto.talla;
  
  
      lineasResumen[2].textContent =
        "1";
  
  
      lineasResumen[3].textContent =
        formatoPesos(subtotal);
  
  
      lineasResumen[4].textContent =
        "Por confirmar";
  
    }
  
  
    /* TOTAL */
  
    if (totalResumen) {
  
      totalResumen.textContent =
        formatoPesos(subtotal) +
        " + envío";
  
    }
  
  }
  
  
  /* ================================================= */
  /* SI NO HAY PRODUCTO */
  /* ================================================= */
  
  else {
  
    if (nombreResumen) {
  
      nombreResumen.textContent =
        "Producto no seleccionado";
  
    }
  
  
    if (descripcionResumen) {
  
      descripcionResumen.textContent =
        "Regresa a la tienda y selecciona una prenda.";
  
    }
  
  }
  
  
  /* ================================================= */
  /* PAGOS ELECTRÓNICOS CON BOLD */
  /* ================================================= */
  
  /*
    PSE
    TARJETAS
    PAGO DIGITAL
  
    Las tres opciones abren el checkout
    seguro de Bold correspondiente
    al producto seleccionado.
  */
  
  opcionesBold.forEach(
    function (opcion) {
  
      opcion.addEventListener(
        "click",
        function () {
  
          if (!producto) {
  
            alert(
              "Primero selecciona un producto."
            );
  
  
            window.location.href =
              "index.html#productos";
  
  
            return;
  
          }
  
  
          /*
            ABRIR BOLD EN OTRA PESTAÑA
          */
  
          window.open(
            producto.bold,
            "_blank",
            "noopener,noreferrer"
          );
  
        }
      );
  
    }
  );
  
  
  /* ================================================= */
  /* CONTRA ENTREGA POR WHATSAPP */
  /* ================================================= */
  
  function abrirContraEntrega() {
  
    if (!producto) {
  
      alert(
        "Primero selecciona un producto."
      );
  
  
      window.location.href =
        "index.html#productos";
  
  
      return;
  
    }
  
  
    const mensaje =
      "Hola Encanto, quiero realizar un pedido contra entrega." +
      "\n\nProducto: " +
      nombreProducto +
      "\nTalla: " +
      producto.talla +
      "\nCantidad: 1" +
      "\nValor del producto: " +
      formatoPesos(producto.precio) +
      "\n\nQuiero coordinar el envío y el pago contra entrega.";
  
  
    const urlWhatsApp =
      "https://wa.me/573045543048?text=" +
      encodeURIComponent(
        mensaje
      );
  
  
    /*
      ABRIR WHATSAPP EN OTRA PESTAÑA
    */
  
    window.open(
      urlWhatsApp,
      "_blank",
      "noopener,noreferrer"
    );
  
  }
  
  
  /* BOTÓN GRANDE CONTRA ENTREGA */
  
  if (contraEntregaButton) {
  
    contraEntregaButton.addEventListener(
      "click",
      abrirContraEntrega
    );
  
  }
  
  
  /* OPCIÓN CONTRA ENTREGA EN FORMAS DE PAGO */
  
  if (contraEntregaPago) {
  
    contraEntregaPago.addEventListener(
      "click",
      abrirContraEntrega
    );
  
  }
  
  
  /* ================================================= */
  /* FORMULARIO DATOS DE ENTREGA */
  /* ================================================= */
  
  if (formulario) {
  
    formulario.addEventListener(
      "submit",
      function (evento) {
  
        evento.preventDefault();
  
  
        const pago =
          document.getElementById(
            "pago"
          );
  
  
        if (pago) {
  
          pago.scrollIntoView(
            {
              behavior: "smooth",
              block: "start"
            }
          );
  
        }
  
      }
    );
  
  }
  
  
  /* ================================================= */
  /* ABRIR BOT DESDE "¿QUIERES AYUDA?" */
  /* ================================================= */
  
  const botonAyudaCheckout =
    document.getElementById(
      "checkoutHelpBotButton"
    );
  
  
  const ventanaBot =
    document.getElementById(
      "botWindow"
    );
  
  
  const inputBot =
    document.getElementById(
      "botInput"
    );
  
  
  if (
    botonAyudaCheckout &&
    ventanaBot
  ) {
  
    botonAyudaCheckout.addEventListener(
      "click",
      function () {
  
        ventanaBot.classList.add(
          "active"
        );
  
  
        if (inputBot) {
  
          inputBot.focus();
  
        }
  
      }
    );
  
  }