const url = "http://localhost:3000/products";
const productList = document.querySelector(".product-list");

let products = [];

function getMainTitle(text) {
  const title = document.createElement("h2");
  text.classList.add("main-title")
  title.textContent = text
  return title
}
const renderProducts = () => {

  products.forEach((product) => {
    productList.innerHTML += `
   
     <div class="product">
     
            <div class="cont-img">
              <button class="product-heart">
                <img src="/photo/Button.svg" alt="" />
              </button>
              <img
                src="${product.imageUrl}"
                alt=""
              />
              ${
                product.discount !== undefined
                  ? `<p class="p-sale">-${product.discount}%</p>`
                  : ""
              }
            </div>

            <div class="prices">
              <div class="bycard">
                <p class="weight">${product.price}${"₽"}</p>
                  ${
                    product.price !== product.price
                      ?  " "
                      : `<p class="by-cash-p">С картой</p>`
                  }
             
              </div>
              <div class="bycash">
              ${
                product.oldPrice !== undefined
                  ? `<p class="cash">${product.oldPrice}${"₽"}</p> 
                <p class="by-cash-p">Обычная</p>
                `
                  : ""
              }
              </div>
            </div>
            <span>${product.name}</span>

            <div class="stars">
              ${product.rating.map((el) => `<img src="${el}" />`).join(" ")}
            </div>
            <button class="inCartButton">В корзину</button>
          </div>
    `;
  });
};

const startApp = () => {
  fetch(url)
    .then((res) => res.json())
    .then((productsData) => {
      products = productsData.slice(4, 8);
      renderProducts();
    });
};

startApp();
