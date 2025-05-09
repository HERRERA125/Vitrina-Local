const toggleBtn = document.getElementById("darkToggle");
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

const form = document.getElementById("postulacionForm");
const productList = document.getElementById("productList");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const precio = document.getElementById("precio").value.trim();
  const categoria = document.getElementById("categoria").value;
  const imagen = document.getElementById("imagen").value.trim();

  if (!nombre || !precio || !categoria || !imagen) {
    alert("Por favor completa todos los campos correctamente.");
    return;
  }

  const producto = document.createElement("article");
  producto.classList.add("producto");

  producto.innerHTML = `
    <img src="${imagen}" alt="${nombre}" />
    <h3>${nombre}</h3>
    <p>Categoría: ${categoria}</p>
    <p>Precio: $${parseInt(precio).toLocaleString()}</p>
  `;

  productList.appendChild(producto);
  form.reset();
});
