const url = "http://localhost:3000/products";
const productList = document.querySelector(".product-list");

let products = [];

const renderProducts = () => {
  productList.innerHTML = "";
  products.forEach((product) => {
    const productElement = document.createElement("div");
    productElement.classList.add("product");
    productElement.innerHTML = `
      <div class="cont-img">
        <button class="product-heart">
          <img src="/photo/Button.svg" alt="" />
        </button>
        <img src="${product.imageUrl}" alt=""/>
        ${product.discount ? `<p class="p-sale">-${product.discount}%</p>` : ""}
      </div>

      <div class="prices">
        <div class="bycard">
          <p class="weight">${product.price} ₽</p>
          <p class="by-cash-p">С картой</p>
        </div>
        <div class="bycash">
          ${product.oldPrice ? `<p class="cash">${product.oldPrice} ₽</p>` : ""}
          <p class="by-cash-p">Обычная</p>
        </div>
      </div>

      <span>${product.name}</span>

      <div class="stars">
        ${product.rating.map((el) => `<img src="${el}" />`).join(" ")}
      </div>
      <button class="inCartButton" data-id="${product.id}">В корзину</button>
    `;
    productList.appendChild(productElement);
  });

  document.querySelectorAll(".inCartButton").forEach((button) => {
    button.addEventListener("click", (event) => {
      const productId = event.target.getAttribute("data-id");
      addToCart(productId);
    });
  });
};

const addToCart = (id) => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let product = products.find((p) => p.id == id);

  if (!product) return;

  let cartItem = cart.find((item) => item.id == id);
  if (cartItem) {
    cartItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
};

const startApp = () => {
  fetch(url)
    .then((res) => res.json())
    .then((productsData) => {
      products = productsData;
      renderProducts();
    });
};

startApp();
