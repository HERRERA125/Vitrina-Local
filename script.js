let cart = [];

function addToCart(productName) {
  cart.push(productName);
  document.getElementById("cart-count").innerText = cart.length;
  console.log(`Producto agregado: ${productName}`);
}

function addToCart(nombreProducto) {
  const productos = JSON.parse(localStorage.getItem("productos")) || [];

  const productoSeleccionado = productos.find(
    (p) => p.nombre === nombreProducto
  );

  if (!productoSeleccionado) return;

  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  carrito.push(productoSeleccionado);

  localStorage.setItem("carrito", JSON.stringify(carrito));

  document.getElementById("cart-count").innerText = carrito.length;

  console.log(`Producto agregado al carrito: ${nombreProducto}`);
}

window.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("product-form");
  const misProductos = document.getElementById("mis-productos");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const nombre = document.getElementById("nombre-producto").value;
      const categoria = document.getElementById("categoria-producto").value;
      const descripcion = document.getElementById("descripcion-producto").value;
      const valor = document.getElementById("valor-producto").value;
      const imagen = document.getElementById("imagen-producto").files[0];

      const reader = new FileReader();

      reader.onload = function (event) {
        const producto = {
          nombre,
          categoria,
          descripcion,
          valor,
          imagen: event.target.result,
        };

        const productos = JSON.parse(localStorage.getItem("productos")) || [];
        productos.push(producto);

        localStorage.setItem("productos", JSON.stringify(productos));

        alert("Producto publicado exitosamente ✅");
        form.reset();

        window.location.href = "index.html";
      };

      if (imagen) {
        reader.readAsDataURL(imagen);
      }
    });
  }
});

window.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.querySelector("#mis-productos .productos");

  if (contenedor) {
    const productos = JSON.parse(localStorage.getItem("productos")) || [];

    productos.forEach((producto) => {
      const productoHTML = `
        <div class="producto">
          <img src="${producto.imagen}" alt="${producto.nombre}" />
          <h3>${producto.nombre}</h3>
          <p>${producto.descripcion}</p>
          <p>$${producto.valor}</p>
          <button onclick="addToCart('${producto.nombre}')">Agregar</button>
        </div>
      `;
      contenedor.innerHTML += productoHTML;
    });
  }
});

window.addEventListener("DOMContentLoaded", () => {
  const carritoContenedor = document.getElementById("carrito-contenido");

  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const contador = document.getElementById("cart-count");
  if (contador) contador.innerText = carrito.length;

  if (carritoContenedor) {
    if (carrito.length === 0) {
      carritoContenedor.innerHTML = "<p>Tu carrito está vacío 🛒</p>";
    } else {
      carrito.forEach((producto) => {
        const productoHTML = `
          <div class="producto">
            <img src="${producto.imagen}" alt="${producto.nombre}" />
            <h3>${producto.nombre}</h3>
            <p>${producto.descripcion}</p>
            <p><strong>$${producto.valor}</strong></p>
          </div>
        `;
        carritoContenedor.innerHTML += productoHTML;
      });
    }
  }
});

function renderizarCarrito() {
  const carritoContenedor = document.getElementById("carrito-contenido");
  const totalContenedor = document.getElementById("total-carrito");

  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  carritoContenedor.innerHTML = "";
  let total = 0;

  if (carrito.length === 0) {
    carritoContenedor.innerHTML = "<p>Tu carrito está vacío 🛒</p>";
    totalContenedor.innerText = "Total: $0";
    return;
  }

  carrito.forEach((producto, index) => {
    total += parseFloat(producto.valor);

    const productoHTML = `
      <div class="producto" style="position: relative;">
        <button onclick="eliminarProducto(${index})" style="position: absolute; top: 8px; right: 8px; background: #c0392b; color: white; border: none; border-radius: 50%; width: 25px; height: 25px; font-weight: bold; cursor: pointer;">×</button>
        <img src="${producto.imagen}" alt="${producto.nombre}" />
        <h3>${producto.nombre}</h3>
        <p>${producto.descripcion}</p>
        <p><strong>$${producto.valor}</strong></p>
      </div>
    `;
    carritoContenedor.innerHTML += productoHTML;
  });

  totalContenedor.innerText = `Total: $${total.toFixed(2)}`;
}

function eliminarProducto(indice) {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  carrito.splice(indice, 1);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  renderizarCarrito();
  actualizarContador();
}

document.addEventListener("DOMContentLoaded", () => {
  const vaciarBtn = document.getElementById("vaciar-carrito");
  if (vaciarBtn) {
    vaciarBtn.addEventListener("click", () => {
      localStorage.removeItem("carrito");
      renderizarCarrito();
      actualizarContador();
    });
  }

  if (document.getElementById("carrito-contenido")) {
    renderizarCarrito();
  }
});

function actualizarContador() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const contador = document.getElementById("cart-count");
  if (contador) contador.innerText = carrito.length;
}

document.addEventListener("DOMContentLoaded", () => {
  const botonModoOscuro = document.getElementById("modo-oscuro-toggle");

  if (localStorage.getItem("modo-oscuro") === "true") {
    document.body.classList.add("modo-oscuro");
  }

  botonModoOscuro?.addEventListener("click", () => {
    document.body.classList.toggle("modo-oscuro");

    const estaActivo = document.body.classList.contains("modo-oscuro");
    localStorage.setItem("modo-oscuro", estaActivo);
  });
});
