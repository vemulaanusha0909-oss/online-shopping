const products = [
    {
        id: 1,
        name: "T-Shirt",
        price: 499,
        category: "fashion",
        image: "https://via.placeholder.com/300x200?text=T-Shirt"
    },
    {
        id: 2,
        name: "Sneakers",
        price: 1299,
        category: "fashion",
        image: "https://via.placeholder.com/300x200?text=Sneakers"
    },
    {
        id: 3,
        name: "Headphones",
        price: 999,
        category: "electronics",
        image: "https://via.placeholder.com/300x200?text=Headphones"
    },
    {
        id: 4,
        name: "Smart Watch",
        price: 1999,
        category: "electronics",
        image: "https://via.placeholder.com/300x200?text=Smart+Watch"
    },
    {
        id: 5,
        name: "Table Lamp",
        price: 699,
        category: "home",
        image: "https://via.placeholder.com/300x200?text=Table+Lamp"
    },
    {
        id: 6,
        name: "Backpack",
        price: 799,
        category: "fashion",
        image: "https://via.placeholder.com/300x200?text=Backpack"
    }
];

let cart = [];

function displayProducts(list = products) {

    const productList = document.getElementById("productList");

    productList.innerHTML = "";

    list.forEach(product => {

        productList.innerHTML += `
            <div class="product">

                <img src="${product.image}" alt="${product.name}">

                <h3>${product.name}</h3>

                <p class="price">₹${product.price}</p>

                <button onclick="addToCart(${product.id})">
                    Add to Cart
                </button>

            </div>
        `;
    });
}

function addToCart(id) {

    const product = products.find(p => p.id === id);

    const existing = cart.find(item => item.id === id);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCart();

    alert("Product added to cart!");
}

function updateCart() {

    const cartCount = document.getElementById("cartCount");

    const totalItems = cart.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

    cartCount.textContent = totalItems;
}

function showCart() {

    const cartBox = document.getElementById("cart");

    cartBox.style.display = "block";

    displayCart();
}

function closeCart() {

    document.getElementById("cart").style.display = "none";
}

function displayCart() {

    const cartItems = document.getElementById("cartItems");

    const totalElement = document.getElementById("total");

    cartItems.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {

        cartItems.innerHTML = "<p>Your cart is empty 🛒</p>";

        totalElement.textContent = "0";

        return;
    }

    cart.forEach(item => {

        total += item.price * item.quantity;

        cartItems.innerHTML += `
            <div class="cart-item">

                <span>
                    ${item.name} × ${item.quantity}
                </span>

                <span>
                    ₹${item.price * item.quantity}
                </span>

                <div>
                    <button onclick="changeQuantity(${item.id}, -1)">
                        −
                    </button>

                    <button onclick="changeQuantity(${item.id}, 1)">
                        +
                    </button>
                </div>

            </div>
        `;
    });

    totalElement.textContent = total;
}

function changeQuantity(id, change) {

    const item = cart.find(item => item.id === id);

    if (!item) return;

    item.quantity += change;

    if (item.quantity <= 0) {

        cart = cart.filter(item => item.id !== id);
    }

    updateCart();

    displayCart();
}

function searchProducts() {

    const searchText =
        document.getElementById("search").value.toLowerCase();

    const filtered = products.filter(product =>
        product.name.toLowerCase().includes(searchText)
    );

    displayProducts(filtered);
}

function filterProducts(category) {

    if (category === "all") {

        displayProducts(products);

    } else {

        const filtered = products.filter(
            product => product.category === category
        );

        displayProducts(filtered);
    }
}

function checkout() {

    if (cart.length === 0) {

        alert("Your cart is empty!");

    } else {

        alert("Order placed successfully! 🎉");

        cart = [];

        updateCart();

        displayCart();
    }
}

displayProducts();