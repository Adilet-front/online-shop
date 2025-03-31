const url = "http://localhost:3000/products";
const productHeart = document.querySelector(".product-heart");


const startApp = () => {
  fetch(url)
      .then((res) => res.json())
      .then((productsData) => {
          products = productsData;
          renderProducts();
      });
};

const addToCart = (product) => {
  const existingProduct = cart.find((item) => item.id === product.id);
  if (existingProduct) {
      existingProduct.count += 1;
  } else {
      cart.push({ ...product, count: 1 });
  }
  updateCartUI();
};




const renderProducts = () => {
  productList.innerHTML = "";
  products.forEach((product) => {
    const productElement = document.createElement("div");
    productElement.classList.add("product");
    productElement.innerHTML = `
      <div class="cont-img">
        <button class="product-heart" data-id="${product.id}">
          <img src="/photo/Button.svg" alt="Добавить в избранное" />
        </button>
        <img src="${product.imageUrl}" alt="${product.name}" />
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
        ${product.rating.map((el) => `<img src="${el}" alt="Звезда" />`).join(" ")}
      </div>
      <button class="inCartButton" data-id="${product.id}">В корзину</button>
    `;
    productList.appendChild(productElement);

    // Привязываем обработчик клика к кнопке-сердечку
    const heartButton = productElement.querySelector(".product-heart");
    heartButton.addEventListener("click", () => {
      toggleFavorite(product.id);
    });
  });
  updateHeartButtons();
};



function products() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cartContainer.innerHTML = "";}


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
  