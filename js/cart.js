let detail = JSON.parse(localStorage.getItem("detail")) || [];

const title = document.querySelector(".cartInfo");

title.querySelector("p").textContent = detail.name;

const price = document.querySelector(".priceTwo");

price.textContent = detail.price;

const oldPrice = document.querySelector(".priceOne");

oldPrice.textContent = detail.oldPrice;

const imageUrl = document.querySelector(".productsImagesOne img");

imageUrl.src = detail.imageUrl;

const brand = document.querySelector(".brand");
brand.querySelector("h5").textContent = detail.brand;


const pacage = document.querySelector(".pacage");
pacage.querySelector("h5").textContent = detail.package;

const rating = document.querySelector(".rating");

rating.innerHTML = `
            <img
             src="${detail.rating[0]}"
             alt="star"
            />
            <img
               src="${detail.rating[1]}"
                alt="star"
            />
            <img
              src="${detail.rating[2]}"
             alt="star"
            />
            <img
              src="${detail.rating[3]}"
                alt="star"
            />
            <img
              src="${detail.rating[4]}"
              alt="star"
            />
                <p class="otz"><a href="#">3 отзыва</a></p>
`;

const watchingPhoto = document.querySelector(".productsImagesBlock");

watchingPhoto.innerHTML = `
                <img 
                src="${detail["watching-photo"][0]}" 
                alt="productsImagesblock" 
                />
                                <img 
                src="${detail["watching-photo"][1]}" 
                alt="productsImagesblock" 
                />
                                <img 
                src="${detail["watching-photo"][2]}" 
                alt="productsImagesblock" 
                />
                                <img 
                src="${detail["watching-photo"][3]}" 
                alt="productsImagesblock" 
                />


`;

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
        <button class="product-heart">
          <img src="/photo/Button.svg" alt="" />
        </button>
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



document.addEventListener("DOMContentLoaded", () => {
  let detail = JSON.parse(localStorage.getItem("detail")) || {};

  const title = document.querySelector(".cartInfo p");
  const price = document.querySelector(".priceTwo");
  const oldPrice = document.querySelector(".priceOne");
  const imageUrl = document.querySelector(".productsImagesOne img");
  const brand = document.querySelector(".brand h5");
  const pacage = document.querySelector(".pacage h5");
  const rating = document.querySelector(".rating");
  const watchingPhoto = document.querySelector(".productsImagesBlock");
  const buyButton = document.querySelector(".buy"); 

  if (detail) {
    title.textContent = detail.name;
    price.textContent = detail.price;
    oldPrice.textContent = detail.oldPrice;
    imageUrl.src = detail.imageUrl;
    brand.textContent = detail.brand;
    pacage.textContent = detail.package;

    rating.innerHTML =
      detail.rating.map((star) => `<img src="${star}" alt="star" />`).join("") +
      `<p class="otz"><a href="#">3 отзыва</a></p>`;

    watchingPhoto.innerHTML = detail["watching-photo"]
      .map((photo) => `<img src="${photo}" alt="productsImagesblock" />`)
      .join("");
  }


  buyButton.addEventListener("click", () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

 
    let existingItem = cart.find((item) => item.name === detail.name);

    if (existingItem) {
      existingItem.quantity += 1; 
    } else {
      cart.push({
        name: detail.name,
        price: detail.price,
        oldPrice: detail.oldPrice,
        imageUrl: detail.imageUrl,
        brand: detail.brand,
        package: detail.package,
        quantity: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Товар добавлен в корзину!");
  });
});
