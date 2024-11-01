let cart = [];
let total = 0;

function updateCartUI() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    cartItems.innerHTML = '';

    cart.forEach(product => {
        const item = document.createElement('div');
        item.classList.add('cart-item');
        item.innerHTML = `
            <p>${product.name} - $${product.price} x ${product.quantity}</p>
            <button onclick="removeFromCart('${product.name}')">Eliminar</button>
        `;
        cartItems.appendChild(item);
    });

    cartTotal.textContent = `Total: $${total}`;
}

function addToCart(productName, productPrice) {
    const existingProduct = cart.find(product => product.name === productName);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ name: productName, price: productPrice, quantity: 1 });
    }
    total += productPrice;
    updateCartUI();
}

function removeFromCart(productName) {
    const productIndex = cart.findIndex(product => product.name === productName);

    if (productIndex !== -1) {
        const product = cart[productIndex];
        total -= product.price * product.quantity;
        cart.splice(productIndex, 1);
        updateCartUI();
    }
}

function simulatePurchase() {
    if (cart.length === 0) {
    } else {
        document.getElementById('cart-items').innerHTML = "<p>¡Compra exitosa! Gracias por su compra.</p>";
        total = 0;
        cart = [];
        updateCartUI();
    }
}

document.getElementById('cart-toggle').addEventListener('click', () => {
    const cartSection = document.getElementById('cart-section');
    cartSection.style.display = cartSection.style.display === 'none' ? 'block' : 'none';
});

document.querySelectorAll('.product button').forEach(button => {
    button.addEventListener('click', (e) => {
        const productDiv = e.target.closest('.product');
        const productName = productDiv.querySelector('h2').textContent;

        const priceText = productDiv.querySelector('p').textContent;
        const productPrice = parseInt(priceText.match(/(\d+)\.\d+/)[0].replace('.', ''));

        addToCart(productName, productPrice);
    });
});

document.getElementById('checkout').addEventListener('click', simulatePurchase);