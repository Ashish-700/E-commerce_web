function loadCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartItems = document.getElementById("cart-items");
    let total = 0;

    cartItems.innerHTML = cart.map((item, index) => {
        let itemTotal = item.price * item.qty;
        total += itemTotal;

        return `
        <tr>
            <td>${item.name}</td>
            <td>₹${item.price}</td>
            <td>
                <input type="number" min="1" value="${item.qty}"
                onchange="updateQty(${index}, this.value)">
            </td>
            <td>₹${itemTotal}</td>
            <td><button class="btn btn-danger btn-sm" onclick="removeItem(${index})">Remove</button></td>
        </tr>`;
    }).join("");

    document.getElementById("grand-total").innerText = "Grand Total: ₹" + total;
}

function updateQty(index, qty) {
    let cart = JSON.parse(localStorage.getItem("cart"));
    cart[index].qty = parseInt(qty);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem("cart"));
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

loadCart();
