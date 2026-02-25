const menu = document.getElementById("menu")
const cartBtn = document.getElementById("cart-btn")
const cartModal = document.getElementById("cart-modal")
const cartItemsContainer = document.getElementById("cart-items")
const cartTotal = document.getElementById("cart-total")
const checkoutBtn = document.getElementById("checkout-btn")
const closeModalBtn= document.getElementById("close-modal-btn")
const cartCounter  =document.getElementById("cart-count")
const addressInput = document.getElementById("address")
const addressWarn = document.getElementById("address-warn")
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
   // console.log(event.target) - PARA PEGAR O TARGET DE QUALQUER ITEM
   let parentButton = event.target.closest(".add-to-cart-btn")
   
   if(parentButton){
    const name = parentButton.getAttribute("data-name")
    const price = parseFloat(parentButton.getAttribute("data-price"))

    // adicionar no carrinho

    addToCart(name, price)



   }
})

// função p adicionar no carrrinho
function addToCart(name, price){
    const existingItem = cart.find(item => item.name === name)

    if(existingItem){
        // se o item existe muda apenas a quantidade (+1)
        existingItem.quantity += 1;
    }else{
        cart.push({
            name,
            price,
            quantity: 1,
        })
    }

    updateCartModal()

}


// atualiza o carrinho
function updateCartModal(){
    cartItemsContainer.innerHTML = "";
    let total = 0;
    cart.forEach(item => {
        const cartItemElement = document.createElement("div");
        cartItemElement.classList.add("flex", "justify-between", "mb-4", "flex-col")

        cartItemElement.innerHTML = `
            <div class="flex items-center justify-between">
                <div>
                    <p class="font-medium">${item.name}</p>
                    <p>Qtd: ${item.quantity}</p>
                    <p class="font-medium mt-2">R$ ${item.price.toFixed(2)}</p>
                </div>

                <button class="remove-from-cart-btn" data-name="${item.name}">
                    Remover
                </button>

            </div>
        `
        total += item.price * item.quantity

        cartItemsContainer.appendChild(cartItemElement)
    })

    cartTotal.textContent = total.toLocaleString("pt-BR",{
        style: "currency",
        currency: "BRL"
    });
    
    cartCounter.innerHTML = cart.length;
}

// função para remover item do carrinho
cartItemsContainer.addEventListener("click", function (event){
    if(event.target.classList.contains("remove-from-cart-btn")){
        const name = event.target.getAttribute("data-name")
        removeItemCart(name);
    }
})

function removeItemCart(name){
    const index = cart.findIndex(item => item.name === name);
    if(index !== -1){
        const item = cart[index];
        if(item.quantity > 1){
            item.quantity -= 1;
            updateCartModal();
            return;
        }
        cart.splice(index, 1);
        updateCartModal();
    }
}

addressInput.addEventListener("input", function(event){
    let inputValue = event.target.value;

    if(inputValue !== ""){
        addressInput.classList.remove("border-red-500")
        addressWarn.style.display = "none"
    }

    //
})

// finalizar pedido
checkoutBtn.addEventListener("click", function(){
    const isOpen = checkRestaurantOpen();

    if(!isOpen){
        Toastify({
            text: "Não estou atendendo no momento.",
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

    const cartItems = cart.map((item) => {
        return `• ${item.name} — ${item.quantity}x — R$ ${(item.price * item.quantity).toFixed(2)}`
    }).join("\n");

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

    const phone = "000000000"; // SEU NÚMERO AQUI

    window.open(
        `https://wa.me/${phone}?text=${message} Nome: ${addressInput.value}`,
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


const track = document.getElementById("combo-track");
const prevBtn = document.getElementById("combo-prev");
const nextBtn = document.getElementById("combo-next");

let scrollAmount = 0;

function getScrollValue(){
  const card = document.querySelector(".combo-card");
  return card.offsetWidth + 24; // largura + gap
}

nextBtn.addEventListener("click", () => {
  scrollAmount += getScrollValue();
  track.style.transform = `translateX(-${scrollAmount}px)`;
});

prevBtn.addEventListener("click", () => {
  scrollAmount -= getScrollValue();
  if(scrollAmount < 0) scrollAmount = 0;
  track.style.transform = `translateX(-${scrollAmount}px)`;
});




