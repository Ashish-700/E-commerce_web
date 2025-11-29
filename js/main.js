// Product data
let products = [
    {id:1, name:"Casual T-Shirt", price:499, img:" asset/images/T-shirt.jpg",},
    {id:2, name:"Sneakers", price:1499, img: " asset/images/sneaker.jpg"},
    {id:3, name:"Sunglasses", price:699, img: " asset/images/sunglasses.jpg"},

    {id:4, name:"watches", price:999, img: " asset/images/watch-1.jpg"},
    {id:5, name:"watches", price:899, img: " asset/images/watch-2.jpg"},
    {id:6, name:"watches", price:799, img: " asset/images/watch-3.jpg"},

    {id:7, name:"shoes", price:999, img:" asset/images/shoes-1.jpg"},
    {id:8, name:"shoes", price:999, img:" asset/images/shoes-2.jpg"},
    {id:9, name:"shoes", price:999, img:"asset/images/shoes-3.jpg"},

    {id:10, name:"tshirt", price:599, img:" asset/images/tshirt-1.jpg"},
    {id:11, name:"tshirt", price:699, img:" asset/images/tshirt-2.jpg"},
     {id:12, name:"tshirt", price:899, img:" asset/images/tshirt-3.jpg"},
    {id:13, name:"tshirt", price:999, img:" asset/images/tshirt-4.jpg"},


    // Add more products as needed
];

// Load products on Products Page
function loadProducts() {
    let container = document.getElementById("product-list");
    if (!container) return;

    container.innerHTML = products.map(p => `
        <div class="col-md-4">
            <div class="card mb-4 shadow-sm">
                <img src="${p.img}" class="card-img-top" style="height:200px; object-fit:cover;">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${p.name}</h5>
                    <p class="fw-bold">₹${p.price}</p>
                    <button class="btn btn-primary mt-auto" onclick="addToCart(${p.id})">Add to Cart</button>
                </div>
            </div>
        </div>
    `).join("");
}

// Add product to cart
function addToCart(id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let item = cart.find(c => c.id === id);
    if (item) item.qty++;
    else {
        let product = products.find(p => p.id === id);
        cart.push({...product, qty:1});
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart!");
}

// Load cart on Cart Page
function loadCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartItems = document.getElementById("cart-items");
    if (!cartItems) return;

    let total = 0;
    cartItems.innerHTML = cart.map((item, index) => {
        let itemTotal = item.price * item.qty;
        total += itemTotal;

        return `
        <tr>
            <td>${item.name}</td>
            <td>₹${item.price}</td>
            <td><input type="number" min="1" value="${item.qty}" onchange="updateQty(${index}, this.value)"></td>
            <td>₹${itemTotal}</td>
            <td><button class="btn btn-danger btn-sm" onclick="removeItem(${index})">Remove</button></td>
        </tr>
        `;
    }).join("");

    document.getElementById("grand-total").innerText = "Grand Total: ₹" + total;
}

// Update quantity
function updateQty(index, qty) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart[index].qty = parseInt(qty);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

// Remove item from cart
function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

// Initialize pages
document.addEventListener("DOMContentLoaded", () => {
    loadProducts();
    loadCart();
});
