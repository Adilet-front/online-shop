document.addEventListener("DOMContentLoaded", () => {
 

  const cartBadge = document.querySelector(".badge");
  const cartContainer = document.querySelector(".cart");
  const totalPriceElement = document.querySelector(".summary h1"); // Исправленный селектор
  const discountElement = document.querySelector(".summary .discount");
  const minOrderWarning = document.querySelector(".summary .warning");
  const orderButton = document.querySelector(".checkout");
  const bonusElement = document.querySelector(".summary .bonus");
  const discountCheckbox = document.querySelector(
    ".summary input[type='checkbox']"
  );
  const accumulatedPoints = 200;

  function loadCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cartContainer.innerHTML = "";

    let total = 0;
    let discount = 0;
    let itemCount = 0;

    cart.forEach((item, index) => {
      const price = parseFloat(item.price) || 0;
      const oldPrice = parseFloat(item.oldPrice) || 0;
      const quantity = parseInt(item.quantity) || 0;

      let itemTotal = price * quantity;
      total += itemTotal;
      itemCount += quantity;

      if (oldPrice > price) {
        discount += (oldPrice - price) * quantity;
      }

      const cartItem = document.createElement("div");
      cartItem.classList.add("cart-item");
      cartItem.innerHTML = `
        <input type="checkbox" checked>
        <img src="${item.imageUrl}" alt="Товар">
        <p>${item.name}</p>
        <div class="price">
          ${oldPrice ? `<span class="old-price">${oldPrice} ₽</span>` : ""}
          ${price} ₽ за шт.
        </div>
        <div class="quantity">
          <button class="decrease" data-index="${index}">-</button>
          <span>${quantity}</span>
          <button class="increase" data-index="${index}">+</button>
        </div>
        <div class="total-price">${itemTotal.toFixed(2)} ₽</div>
        <button class="delete" data-index="${index}">Удалить</button>
      `;
      cartContainer.appendChild(cartItem);
    });

    if (discountElement)
      discountElement.textContent = `-${discount.toFixed(2)} ₽`;
    total -= discount;

    let totalWithDiscount = total;
    if (discountCheckbox && discountCheckbox.checked && accumulatedPoints > 0) {
      totalWithDiscount = Math.max(0, totalWithDiscount - 200);
    }

    if (totalPriceElement)
      totalPriceElement.textContent = `${totalWithDiscount.toFixed(2)} ₽`;

    if (cartBadge) {
      cartBadge.textContent = itemCount > 0 ? itemCount : "";
      cartBadge.style.display = itemCount > 0 ? "inline-block" : "none";
    }

    if (bonusElement)
      bonusElement.textContent = `Вы получите ${Math.floor(
        totalWithDiscount / 10
      )} бонусов`;

    if (minOrderWarning && orderButton) {
      if (totalWithDiscount >= 1000) {
        minOrderWarning.style.display = "none";
        orderButton.disabled = false;
        orderButton.style.backgroundColor = "#ff6600";
         orderButton.style.textContent =" white"; 
      } else {
        minOrderWarning.style.display = "block";
        orderButton.disabled = true;
        orderButton.style.backgroundColor = "red"; 
      }
    }

    attachCartEvents();
  }

  function attachCartEvents() {
    document.querySelectorAll(".increase").forEach((button) => {
      button.addEventListener("click", (event) => {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        let index = event.target.getAttribute("data-index");
        cart[index].quantity += 1;
        localStorage.setItem("cart", JSON.stringify(cart));
        loadCart();
      });
    });

    document.querySelectorAll(".decrease").forEach((button) => {
      button.addEventListener("click", (event) => {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        let index = event.target.getAttribute("data-index");

        if (cart[index].quantity > 1) {
          cart[index].quantity -= 1;
        } else {
          cart.splice(index, 1);
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        loadCart();
      });
    });

    document.querySelectorAll(".delete").forEach((button) => {
      button.addEventListener("click", (event) => {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        let index = event.target.getAttribute("data-index");

        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        loadCart();
      });
    });
  }

  if (orderButton) {
    orderButton.addEventListener("click", () => {
      let total = parseFloat(
        totalPriceElement.textContent.replace(" ₽", "").replace(",", ".")
      );

      if (total < 1000) {
        alert("⚠️ Минимальная сумма заказа 1000 ₽!");
      } else {
        alert("✅ Заказ оформлен!");
        localStorage.removeItem("cart");
        loadCart();
      }
    });
  }

  if (discountCheckbox) {
    discountCheckbox.addEventListener("change", () => {
      loadCart();
    });
  }

  loadCart();
});
