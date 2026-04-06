// Products Database
const products = [
    {
        id: 1,
        name: 'Tricou Clasic Premium',
        category: 'men',
        price: 449.99,
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop&q=80',
        description: 'Tricou din bumbac 100%, conforabil și durabil - Design exclusiv'
    },
    {
        id: 2,
        name: 'Bluză Elegantă Silk',
        category: 'women',
        price: 789.99,
        image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400&h=400&fit=crop&q=80',
        description: 'Bluză de mătase cu design modern și elegant - Colecție limitată'
    },
    {
        id: 3,
        name: 'Pantaloni Slim Fit',
        category: 'men',
        price: 1199.99,
        image: 'https://images.unsplash.com/photo-1542272604-787c62d465d1?w=400&h=400&fit=crop&q=80',
        description: 'Pantaloni slim fit, perfect pentru orice ocazie - Material premium'
    },
    {
        id: 4,
        name: 'Rochie de Vară Chic',
        category: 'women',
        price: 1099.99,
        image: 'https://images.unsplash.com/photo-1595777707802-c7c1fbc2c337?w=400&h=400&fit=crop&q=80',
        description: 'Rochie lejeră și aerisită, perfectă pentru vară - Stil contemporan'
    },
    {
        id: 5,
        name: 'Jachetă Denim Vintage',
        category: 'men',
        price: 1499.99,
        image: 'https://images.unsplash.com/photo-1551028719-00167b16ebc5?w=400&h=400&fit=crop&q=80',
        description: 'Jachetă denim clasică cu look vintage - Piesa de referință'
    },
    {
        id: 6,
        name: 'Pulover Cald Luxury',
        category: 'women',
        price: 899.99,
        image: 'https://images.unsplash.com/photo-1556821552-5ff63b1c3897?w=400&h=400&fit=crop&q=80',
        description: 'Pulover moale și cald, ideal pentru iarna - Lână fină'
    },
    {
        id: 7,
        name: 'Pantaloni Scurți Kids',
        category: 'kids',
        price: 359.99,
        image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3dd18?w=400&h=400&fit=crop&q=80',
        description: 'Pantaloni scurți ideali pentru copii activi - Confortabili și rezistenți'
    },
    {
        id: 8,
        name: 'Cămașă Formal Executive',
        category: 'men',
        price: 699.99,
        image: 'https://images.unsplash.com/photo-1596706594361-45129833a47f?w=400&h=400&fit=crop&q=80',
        description: 'Cămașă formal pentru ocazii speciale - Finisaj impecabil'
    },
    {
        id: 9,
        name: 'Top Sport High-Tech',
        category: 'women',
        price: 539.99,
        image: 'https://images.unsplash.com/photo-1506629082632-401cfe8ba0a3?w=400&h=400&fit=crop&q=80',
        description: 'Top sport cu material respirabil - Tehnologie de ultimă generație'
    },
    {
        id: 10,
        name: 'Tricou Copii Colorat',
        category: 'kids',
        price: 269.99,
        image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3dd18?w=400&h=400&fit=crop&q=80',
        description: 'Tricou colorat și confortabil pentru copii - Motive distractive'
    },
    {
        id: 11,
        name: 'Fustă Plisată Elegant',
        category: 'women',
        price: 1249.99,
        image: 'https://images.unsplash.com/photo-1595541595868-14730380fcad?w=400&h=400&fit=crop&q=80',
        description: 'Fustă plisată cu design retro-modern - Material de calitate superioară'
    },
    {
        id: 12,
        name: 'Cărări Sport Performance',
        category: 'kids',
        price: 409.99,
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop&q=80',
        description: 'Cărări sport comode și rezistente - Design ergonomic'
    }
];

// Cart Management
let cart = [];
let currentFilter = 'all';

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadProducts('all');
    loadCartFromStorage();
    updateCartUI();
});

// Load Products
function loadProducts(category) {
    currentFilter = category;
    const productsGrid = document.getElementById('products-grid');
    productsGrid.innerHTML = '';

    const filteredProducts = category === 'all' 
        ? products 
        : products.filter(p => p.category === category);

    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

// Create Product Card
function createProductCard(product) {
    const div = document.createElement('div');
    div.className = 'product-card';
    div.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}" loading="lazy">
        </div>
        <div class="product-info">
            <div class="product-category">${getCategoryLabel(product.category)}</div>
            <div class="product-name">${product.name}</div>
            <div class="product-price">${product.price.toFixed(2)} MDL</div>
            <div class="product-desc">${product.description}</div>
            <div class="product-actions">
                <button class="add-to-cart" onclick="addToCart(${product.id})">Adaugă în Coș</button>
                <button class="wishlist-btn" onclick="toggleWishlist(this)">♡</button>
            </div>
        </div>
    `;
    return div;
}

// Get Category Label
function getCategoryLabel(category) {
    const labels = {
        men: 'Bărbați',
        women: 'Femei',
        kids: 'Copii'
    };
    return labels[category] || category;
}

// Filter Products
function filterProducts(category) {
    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    loadProducts(category);
}

// Add to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    saveCartToStorage();
    updateCartUI();
    showNotification('Produs adăugat în coș!');
}

// Remove from Cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCartToStorage();
    updateCartUI();
}

// Update Quantity
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            saveCartToStorage();
            updateCartUI();
        }
    }
}

// Update Cart UI
function updateCartUI() {
    const cartItemsDiv = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');

    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);

    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<p class="empty-cart">Coșul este gol</p>';
        cartTotal.textContent = '0 MDL';
        return;
    }

    cartItemsDiv.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-details">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">${item.price.toFixed(2)} MDL</div>
                <div class="cart-item-quantity">
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">−</button>
                    <span>${item.quantity}</span>
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                    <button class="remove-btn" onclick="removeFromCart(${item.id})">Șterge</button>
                </div>
            </div>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = total.toFixed(2) + ' MDL';
}

// Toggle Cart Sidebar
function toggleCart() {
    const cartSidebar = document.getElementById('cart-sidebar');
    cartSidebar.classList.toggle('active');
}

// Close cart when clicking outside
document.addEventListener('click', (e) => {
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartIcon = document.querySelector('.cart-icon');
    
    if (!cartSidebar.contains(e.target) && !cartIcon.contains(e.target)) {
        cartSidebar.classList.remove('active');
    }
});

// Toggle Wishlist
function toggleWishlist(element) {
    element.textContent = element.textContent === '♡' ? '♥' : '♡';
    element.style.color = element.textContent === '♥' ? '#ff6b6b' : '#ff6b6b';
}

// Checkout
function checkout() {
    if (cart.length === 0) {
        alert('Coșul este gol!');
        return;
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const message = `Comanda ta:\n\n${
        cart.map(item => `${item.name} x${item.quantity} = ${(item.price * item.quantity).toFixed(2)} MDL`).join('\n')
    }\n\nTotal: ${total.toFixed(2)} MDL\n\nMultumim pentru comanda!`;

    alert(message);
    cart = [];
    saveCartToStorage();
    updateCartUI();
    document.getElementById('cart-sidebar').classList.remove('active');
    showNotification('Comanda finalizată cu succes!');
}

// Local Storage functions
function saveCartToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCartFromStorage() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}

// Show Notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: #4ecdc4;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 300;
        animation: slideInRight 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
`;
document.head.appendChild(style);

// Search Products Function
function searchProducts() {
    const searchInput = document.getElementById('search-input');
    const searchTerm = searchInput.value.toLowerCase();
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        const productName = card.querySelector('.product-name').textContent.toLowerCase();
        const productDesc = card.querySelector('.product-desc').textContent.toLowerCase();
        
        if (productName.includes(searchTerm) || productDesc.includes(searchTerm) || searchTerm === '') {
            card.style.display = 'block';
            card.style.animation = 'fadeIn 0.3s ease';
        } else {
            card.style.display = 'none';
        }
    });
}

// Subscribe to Newsletter Function
function subscribeNewsletter() {
    const emailInput = document.getElementById('newsletter-email');
    const email = emailInput.value.trim();
    
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (email === '') {
        showNotification('Te rugăm introdu un email!');
        return;
    }
    
    if (!emailRegex.test(email)) {
        showNotification('Te rugăm introdu o adresă email validă!');
        return;
    }
    
    // Save to localStorage
    let subscribers = JSON.parse(localStorage.getItem('newsletter-subscribers') || '[]');
    if (!subscribers.includes(email)) {
        subscribers.push(email);
        localStorage.setItem('newsletter-subscribers', JSON.stringify(subscribers));
    }
    
    showNotification('✓ Te-ai abonat cu succes la newsletter!');
    emailInput.value = '';
}
