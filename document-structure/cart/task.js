document.addEventListener('DOMContentLoaded', () => {
    const cartProducts = document.querySelector('.cart__products');
    const cartTitle = document.querySelector('.cart__title');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function updateCartDisplay() {
        if (cart.length === 0) {
            cartProducts.innerHTML = '';
            cartTitle.style.display = 'none';
        } else {
            cartTitle.style.display = 'block';
            renderCartItems();
        }
    }

    function renderCartItems() {
        cartProducts.innerHTML = '';
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart__product';
            cartItem.setAttribute('data-id', item.id);

            cartItem.innerHTML = `
                <img class="cart__product-image" src="${item.image}" alt="">
                <div class="cart__product-count">${item.quantity}</div>
                <div class="cart__product-remove">×</div>
            `;

            cartProducts.appendChild(cartItem);
        });

        document.querySelectorAll('.cart__product-remove').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.closest('.cart__product').getAttribute('data-id');
                cart = cart.filter(item => item.id !== id);
                saveCart();
                updateCartDisplay();
            });
        });
    }

    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    document.querySelectorAll('.product').forEach(product => {
        const id = product.getAttribute('data-id');
        const imageSrc = product.querySelector('.product__image').getAttribute('src');
        const quantityValue = product.querySelector('.product__quantity-value');
        const incBtn = product.querySelector('.product__quantity-control_inc');
        const decBtn = product.querySelector('.product__quantity-control_dec');
        const addBtn = product.querySelector('.product__add');

        incBtn.addEventListener('click', () => {
            let qty = parseInt(quantityValue.textContent);
            qty++;
            quantityValue.textContent = qty;
        });

        decBtn.addEventListener('click', () => {
            let qty = parseInt(quantityValue.textContent);
            if (qty > 1) {
                qty--;
                quantityValue.textContent = qty;
            }
        });

 
        addBtn.addEventListener('click', () => {
            const quantity = parseInt(quantityValue.textContent);

 
            const existingItem = cart.find(item => item.id === id);

            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cart.push({
                    id: id,
                    image: imageSrc,
                    quantity: quantity
                });
            }

            saveCart();
            updateCartDisplay();

            showMoveEffect(product.querySelector('.product__image'), cartProducts);
        });
    });


    function showMoveEffect(imageElem, targetContainer) {
        const clone = imageElem.cloneNode(true);
        const rect = imageElem.getBoundingClientRect();
        const targetRect = targetContainer.getBoundingClientRect();

        clone.style.position = 'absolute';
        clone.style.left = `${rect.left}px`;
        clone.style.top = `${rect.top}px`;
        clone.style.width = `${rect.width}px`;
        clone.style.height = `${rect.height}px`;
        clone.style.zIndex = '1000';
        clone.style.transition = 'all 0.5s ease-in-out';

        document.body.appendChild(clone);


        requestAnimationFrame(() => {
            clone.style.left = `${targetRect.left + window.scrollX}px`;
            clone.style.top = `${targetRect.top + window.scrollY}px`;
            clone.style.transform = 'scale(0.5)';
            clone.style.opacity = '0';
        });

        clone.addEventListener('transitionend', () => {
            clone.remove();
        });
    }
    updateCartDisplay();
});
