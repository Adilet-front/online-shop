const url = "http://localhost:3000/products";
const productList = document.querySelector(".product-list");
const searchInput = document.querySelector("[data-search]");

let products = [];

const renderProducts = () => {
  productList.innerHTML = "";
  products.forEach((product) => {
    const productElement = document.createElement("div");
    productElement.classList.add("product");
    productElement.innerHTML = `
    <div class="productsSales">
     ${product.categoryAll ? `<h2>${product.categoryAll}</h2>` : ""}
    </div>
      <div class="cont-img">
      
       <a id="${product.id}" class="linkCart" href="/html/cart.html">
        <img src="${product.imageUrl}" alt=""/>
        ${product.discount ? `<p class="p-sale">-${product.discount}%</p>` : ""}
      </a>
        
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

      <span class="product-name" data-header>${product.name}</span>

      <div class="stars">
        ${product.rating.map((el) => `<img src="${el}" />`).join(" ")}
      </div>
      <button class="inCartButton" data-id="${product.id}">В корзину</button>
    `;
    productList.appendChild(productElement);
  });

  document.querySelectorAll(".linkCart").forEach((button) => {
    button.addEventListener("click", (event) => {
      const productId = button.id;
      console.log(productId);

      addDetail(productId);
    });
  });

  document.querySelectorAll(".inCartButton").forEach((button) => {
    button.addEventListener("click", (event) => {
      const productId = event.target.getAttribute("data-id");

      addToCart(productId);
    });
  });
};

searchInput.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();

  document.querySelectorAll(".product").forEach((card) => {
    const productName = card
      .querySelector(".product-name")
      .textContent.toLowerCase();
    card.classList.toggle("hide", !productName.includes(value));
  });
});

const addDetail = (id) => {
  let cart = JSON.parse(localStorage.getItem("detail")) || [];
  let product = products.find((p) => p.id == id);

  if (!product) return;

  localStorage.setItem("detail", JSON.stringify(product));
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
