const menu = document.getElementById("menu")
const cartBtn = document.getElementById("cart-btn")
const cartModal = document.getElementById("cart-modal")
const cartItemsContainer = document.getElementById("cart-items")
const cartTotal = document.getElementById("cart-total")
const checkoutBtn = document.getElementById("checkout-btn")
const closeModalBtn= document.getElementById("close-modal-btn")
const cartCounter  =document.getElementById("cart-count")
const addressInput = document.getElementById("customer-name");
const addressWarn = document.getElementById("name-warn");
const paymentSelect = document.getElementById("payment-method");
const paymentWarn = document.getElementById("payment-warn");

function generateOrderNumber(){
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");

    const random = Math.floor(Math.random() * 9000) + 1000;

    return `GT-${year}${month}${day}-${random}`;
}

function getFormattedDateTime(){
    const now = new Date();

    const date = now.toLocaleDateString("pt-BR");
    const time = now.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit"
    });

    return `${date} ${time}`;
}

let cart = []; // array

// abrir o modal do carrinho
cartBtn.addEventListener("click", function(){
    updateCartModal();
    cartModal.style.display = "flex"
})

// fechar o modal qnd clicar fora
cartModal.addEventListener("click",function(event){
    if(event.target === cartModal){
        cartModal.style.display = "none"
    }
})

// fechar pelo botao fechar
closeModalBtn.addEventListener("click", function(){
    cartModal.style.display = "none"
})

menu.addEventListener("click", function(event){
   let parentButton = event.target.closest(".add-to-cart-btn")
   
   if(parentButton){
    const name = parentButton.getAttribute("data-name")
    const price = parseFloat(parentButton.getAttribute("data-price"))

    addToCart(name, price)
   }
})

// função p adicionar no carrinho
function addToCart(name, price) {
  const existing = cart.find((i) => i.name === name);
  if (existing) existing.quantity += 1;
  else cart.push({ name, price, quantity: 1 });

  Toastify({
    text: "Adicionado ao orçamento!",
    duration: 2000,
    gravity: "top",
    position: "right",
  }).showToast();

  updateCartModal();
}

// atualiza o carrinho
function updateCartModal() {
  cartItemsContainer.innerHTML = "";
  let total = 0;

  cart.forEach((item) => {
    total += item.price * item.quantity;

    const lineTotal = (item.price * item.quantity).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    const unit = item.price.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    const card = document.createElement("div");
    card.className =
      "border rounded-xl p-3 shadow-sm flex items-start justify-between gap-3";

    card.innerHTML = `
      <div class="min-w-0">
        <p class="font-semibold leading-tight truncate">${item.name}</p>
        <p class="text-sm text-zinc-600 mt-1">Unidade: ${unit}</p>
        <p class="text-sm font-medium text-zinc-800 mt-1">Subtotal: ${lineTotal}</p>
      </div>

      <div class="flex flex-col items-end gap-2 shrink-0">
        <div class="flex items-center gap-2">
          <button
            class="qty-minus px-2 py-1 rounded border"
            data-name="${item.name}"
            aria-label="Diminuir quantidade"
            title="Diminuir"
          >–</button>

          <span class="font-bold w-6 text-center">${item.quantity}</span>

          <button
            class="qty-plus px-2 py-1 rounded border"
            data-name="${item.name}"
            aria-label="Aumentar quantidade"
            title="Aumentar"
          >+</button>
        </div>

        <button
          class="remove-item text-red-600 text-sm underline"
          data-name="${item.name}"
          aria-label="Remover item"
        >
          Remover
        </button>
      </div>
    `;

    cartItemsContainer.appendChild(card);
  });
  

  cartTotal.textContent = total.toLocaleString("pt-BR",{
      style: "currency",
      currency: "BRL"
  });
  
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCounter.textContent = totalItems;
}

// controles + / - / remover
cartItemsContainer.addEventListener("click", (event) => {
  const plus = event.target.closest(".qty-plus");
  const minus = event.target.closest(".qty-minus");
  const remove = event.target.closest(".remove-item");

  if (plus) {
    const name = plus.getAttribute("data-name");
    const item = cart.find((i) => i.name === name);
    if (item) item.quantity += 1;
    updateCartModal();
    return;
  }

  if (minus) {
    const name = minus.getAttribute("data-name");
    const item = cart.find((i) => i.name === name);
    if (!item) return;

    if (item.quantity > 1) item.quantity -= 1;
    else cart = cart.filter((i) => i.name !== name);

    updateCartModal();
    return;
  }

  if (remove) {
    const name = remove.getAttribute("data-name");
    cart = cart.filter((i) => i.name !== name);
    updateCartModal();
  }
});

addressInput.addEventListener("input", function(event){
    let inputValue = event.target.value;

    if(inputValue !== ""){
        addressInput.classList.remove("border-red-500")
        addressWarn.style.display = "none"
    }
})

// finalizar pedido
checkoutBtn.addEventListener("click", function(){
    const isOpen = checkRestaurantOpen();

    if(!isOpen){
        Toastify({
            text: "No momento estou fora do horário. Você pode enviar mesmo assim 🙂",
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            style: { background: "#ef4444" },
        }).showToast();
        return;
    }

    if(cart.length === 0) return;

    if (addressInput.value === ""){
        addressWarn.style.display = "flex";
        addressInput.classList.add("border-red-500");
        return;
    }

    if (paymentSelect.value === ""){
        paymentWarn.style.display = "flex";
        paymentSelect.classList.add("border-red-500");
        return;
    }

    const cartItems = cart
    .map((item) => {
        const sub = (item.price * item.quantity).toFixed(2).replace(".", ",");
        return `- ${item.quantity}x ${item.name} (R$ ${sub})`;
    })
    .join("\n");

    const orderNumber = generateOrderNumber();
    const dateTime = getFormattedDateTime();
    const total = cartTotal.textContent;
    const message = encodeURIComponent(
        `ORÇAMENTO - GUIMATECH
Nº: ${orderNumber}
Data: ${dateTime}

Cliente: ${addressInput.value}

Serviços:
${cartItems}

Total: ${total}
Pagamento: ${paymentSelect.value}

Atendimento via WhatsApp`
    );

    const phone = "67991851966"; // SEU NÚMERO AQUI

    window.open(
        `https://wa.me/${phone}?text=${message}`,
        "_blank"
    );

    cart.length = 0;
    paymentSelect.value = "";
    updateCartModal();
});

// verificar a hora e manipular o card horario
function checkRestaurantOpen(){
    const data = new Date();
    const hora = data.getHours();
    return hora >= 0 && hora < 24; // boolean true/false
}

const spanItem = document.getElementById("date-span")
const isOpen = checkRestaurantOpen();

if(isOpen){
    spanItem.classList.remove("bg-red-500");
    spanItem.classList.add("bg-green-600")
}else{
    spanItem.classList.remove("bg-green-600")
    spanItem.classList.add("bg-red-500")
}

/* =========================
   CARROSSEL (COM LIMITE + SETAS DINÂMICAS)
   ========================= */

const track = document.getElementById("combo-track");
const prevBtn = document.getElementById("combo-prev");
const nextBtn = document.getElementById("combo-next");

let scrollAmount = 0;

function getScrollValue() {
  const card = document.querySelector(".combo-card");
  if (!card) return 0;

  const styles = getComputedStyle(track);
  const gap = parseFloat(styles.columnGap || styles.gap || "0");

  return card.getBoundingClientRect().width + gap;
}

function getMaxScroll() {
  const container = track.parentElement;
  return Math.max(0, track.scrollWidth - container.clientWidth);
}

function updateButtons() {
  const maxScroll = getMaxScroll();

  // Esquerda
  if (scrollAmount <= 0) {
    prevBtn.style.opacity = "0";
    prevBtn.style.pointerEvents = "none";
  } else {
    prevBtn.style.opacity = "1";
    prevBtn.style.pointerEvents = "auto";
  }

  // Direita
  if (scrollAmount >= maxScroll) {
    nextBtn.style.opacity = "0";
    nextBtn.style.pointerEvents = "none";
  } else {
    nextBtn.style.opacity = "1";
    nextBtn.style.pointerEvents = "auto";
  }
}

function updateCarouselPosition() {
  track.style.transform = `translateX(-${scrollAmount}px)`;
  updateButtons();
}

nextBtn.addEventListener("click", () => {
  const maxScroll = getMaxScroll();
  scrollAmount = Math.min(scrollAmount + getScrollValue(), maxScroll);
  updateCarouselPosition();
});

prevBtn.addEventListener("click", () => {
  scrollAmount = Math.max(scrollAmount - getScrollValue(), 0);
  updateCarouselPosition();
});

// Ajusta quando redimensiona a tela
window.addEventListener("resize", () => {
  const maxScroll = getMaxScroll();
  if (scrollAmount > maxScroll) scrollAmount = maxScroll;
  updateCarouselPosition();
});

// Inicializa estado correto ao carregar
updateCarouselPosition();