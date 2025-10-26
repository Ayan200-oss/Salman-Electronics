// 🔥 Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAjPufUIt6k4WXt3R1vmTBBBcDvuU68Zv0",
    authDomain: "salman-electronics-bea6f.firebaseapp.com",
    databaseURL: "https://salman-electronics-bea6f-default-rtdb.firebaseio.com",
    projectId: "salman-electronics-bea6f",
    storageBucket: "salman-electronics-bea6f.firebasestorage.app",
    messagingSenderId: "361411398595",
    appId: "1:361411398595:web:0d27ae1b42ec08122f8b76"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.database();

// 🛒 Add product function (for Add to Cart)
function addProduct(img, title, price) {
    const color = document.querySelector('input[name="color"]:checked')?.value || "Not Selected";
    const storage = document.querySelector('input[name="storage"]:checked')?.value || "Not Selected";
    const quantity = document.querySelector(".block_quantity__number")?.value || "1";

    var obj = {
        product_image: img,
        product_title: title,
        product_price: price,
        product_color: color,
        product_storage: storage,
        product_quantity: quantity
    };

    firebase.database().ref("products").push(obj)
        .then(() => {
            Swal.fire({
                icon: 'success',
                title: 'Item Added to Cart!',
                text: `"${title}" has been added to your cart.`,
                showConfirmButton: false,
                timer: 1800,
                background: '#ffffff',
                color: '#333',
            });
        })
        .catch((error) => {
            console.error("Error adding product:", error);
            Swal.fire({
                icon: 'error',
                title: 'Oops!',
                text: 'Something went wrong while adding the product.',
                confirmButtonColor: '#d33'
            });
        });
}

// ⚡ Buy Now (fixed to NOT remove cart)
function buyNow() {
    const image = document.querySelector(".sliderBlock_items__itemPhoto img")?.src;
    const title = document.querySelector(".block_name__mainName")?.innerText;
    const price = document.querySelector(".block_price p.text-gray-900")?.innerText;
    const color = document.querySelector('input[name="color"]:checked')?.value || "Not Selected";
    const storage = document.querySelector('input[name="storage"]:checked')?.value || "Not Selected";
    const quantity = document.querySelector(".block_quantity__number")?.value || "1";

    const product = {
        product_image: image,
        product_title: title,
        product_price: price,
        product_color: color,
        product_storage: storage,
        product_quantity: quantity
    };

    // ✅ Just store buy-now product separately
    db.ref("single_buy_item").set(product)
        .then(() => {
            window.location.href = "../cheak.html";
        })
        .catch((error) => {
            console.error("Error during Buy Now process:", error);
            Swal.fire({
                icon: 'error',
                title: 'Oops!',
                text: 'Something went wrong while processing your order.',
                confirmButtonColor: '#d33'
            });
        });
}

// 🧾 Live update from Firebase (cart UI)
window.addEventListener("load", () => {
    firebase.database().ref("products").on("value", function(snapshot) {
        var trow = document.getElementById("trow");
        var cardsubtotal = document.getElementById("cart-subtotal");
        if (!trow || !cardsubtotal) return; // Prevent null element errors

        trow.innerHTML = "";
        var total = 0;
        var itemCount = 0;

        if (snapshot.exists()) {
            snapshot.forEach(function(childSnapshot) {
                var itemData = childSnapshot.val();
                var itemId = childSnapshot.key;

                const unitPrice = parseFloat(String(itemData.product_price).replace(/[^0-9.]+/g, "")) || 0;
                const quantity = parseInt(itemData.product_quantity) || 1;
                const itemTotal = unitPrice * quantity;

                total += itemTotal;
                itemCount++;

                trow.innerHTML += `
                    <tr class='product-row' id='row-${itemId}'>
                        <td class='product-image-cell'>
                            <img class='product-img' src="${itemData.product_image}" alt="Product Image" />
                        </td>
                        <td class='product-details-cell'>
                            <div class='product-details-container'>
                                <h3 class='product-title'>${itemData.product_title}</h3>
                                <button onclick="deleteItemFromCart('${itemId}')" class="single-delete-button text-gray-500 hover:text-gray-900 p-2 focus:outline-none">
                                    <i class="fa-solid fa-xmark"></i>
                                </button>
                                <p class='product-price-label'>Price: <span class='product-price'>${itemData.product_price}</span></p>
                                <p class='text-sm text-gray-600'>Color: ${itemData.product_color || "Not Selected"}</p>
                                <p class='text-sm text-gray-600'>Storage: ${itemData.product_storage || "Not Selected"}</p>
                                <p class='text-sm text-gray-600'>Quantity: ${itemData.product_quantity || "1"}</p>
                                <p class='text-sm font-semibold text-gray-800'>Item Total: Rs ${itemTotal.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                            </div>
                        </td>
                    </tr>
                `;
            });
        } else {
            // If no items, show empty message
            trow.innerHTML = `<tr><td colspan="2" class="text-center text-gray-500 py-4">🛒 Your cart is empty.</td></tr>`;
        }

        // 🧮 Update counters
        var allCounters = document.querySelectorAll(".counter, .cart-count, .cart-icon-badge");
        allCounters.forEach(el => el.textContent = itemCount);

        var cartHeader = document.querySelector(".cart-counter");
        if (cartHeader) {
            cartHeader.textContent = `Your Cart (${itemCount} ${itemCount === 1 ? "Item" : "Items"})`;
        }

        cardsubtotal.innerText = "Rs " + total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    });
});

// 🗑️ Delete function
function deleteItemFromCart(itemId) {
    firebase.database().ref("products/" + itemId).remove()
        .then(() => {
            const row = document.getElementById("row-" + itemId);
            if (row) row.remove();
            Swal.fire({
                icon: "success",
                title: "Item Removed",
                text: "Product has been removed from your cart.",
                timer: 1200,
                showConfirmButton: false,
                didOpen: () => {
                    const swal = document.querySelector('.swal2-container');
                    if (swal) swal.style.zIndex = '999999';
                }
            });
        })
        .catch((error) => {
            console.error("Error deleting item:", error);
        });
}

// 🧾 Checkout button handler (fixed)
function handleCheckout() {
    var cartHeader = document.querySelector(".cart-counter");
    var itemCount = 0;

    if (cartHeader) {
        var match = cartHeader.textContent.match(/\((\d+)\sItem/);
        if (match) {
            itemCount = parseInt(match[1]);
        }
    }

    var alertBox = document.getElementById("cart-alert");

    if (itemCount === 0) {
        alertBox.classList.remove("hidden");
        alertBox.classList.add("block");

        setTimeout(() => {
            alertBox.classList.add("hidden");
            alertBox.classList.remove("block");
        }, 2000);
    } else {
        // ✅ Copy all cart products to "checkout_items" before redirect
        firebase.database().ref("products").once("value")
            .then(snapshot => {
                if (snapshot.exists()) {
                    return firebase.database().ref("checkout_items").set(snapshot.val());
                }
            })
            .then(() => {
                window.location.href = "../cheak.html";
            })
            .catch((error) => {
                console.error("Error during checkout:", error);
            });
    }
}
