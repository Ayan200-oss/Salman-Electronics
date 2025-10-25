// Your web app's Firebase configuration
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


// Add product function
function addProduct(img, title, price) {
  var obj = {
    product_image: img,
    product_title: title,
    product_price: price,
  };

  firebase.database().ref("products").push(obj)
    .then(() => {
      // Success message (SweetAlert2 style)
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

      // Error alert
      Swal.fire({
        icon: 'error',
        title: 'Oops!',
        text: 'Something went wrong while adding the product.',
        confirmButtonColor: '#d33'
      });
    });
}





//for changes in the database
firebase.database().ref("products").on("value", function(snapshot) {
  var trow = document.getElementById("trow");
  var cardsubtotal = document.getElementById("cart-subtotal");

  // Clear the cart UI
  trow.innerHTML = "";
  var total = 0;
  var itemCount = 0;

  if (snapshot.exists()) {
    snapshot.forEach(function(childSnapshot) {
      var itemData = childSnapshot.val();
      var itemId = childSnapshot.key; // Unique Firebase ID

      // Add product row
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
                </div>
            </td>
        </tr>
      `;

      // Calculate total and count
      var numericPrice = parseFloat(itemData.product_price.replace(/[^0-9.]+/g, ""));
      if (!isNaN(numericPrice)) total += numericPrice;
      itemCount++;
    });
  }

  //  Update all numeric counters (like icon badges)
  var allCounters = document.querySelectorAll(".counter, .cart-count, .cart-icon-badge");
  allCounters.forEach(el => el.textContent = itemCount);

  //  Update the "Your Cart (x Items)" heading
  var cartHeader = document.querySelector(".cart-counter");
  if (cartHeader) {
    cartHeader.textContent = `Your Cart (${itemCount} ${itemCount === 1 ? "Item" : "Items"})`;
  }

  //  Update subtotal with comma formatting
  cardsubtotal.innerText = "Rs " + total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
});


// Delete function
function deleteItemFromCart(itemId) {
  // Delete from Firebase
  firebase.database().ref("products/" + itemId).remove()
    .then(() => {
      // Also remove from UI
      var row = document.getElementById("row-" + itemId);
      if (row) row.remove();
      console.log("Item deleted successfully");
    })
    .catch((error) => {
      console.error("Error deleting item:", error);
    });
}



function handleCheckout() {
  var cartHeader = document.querySelector(".cart-counter");
  var itemCount = 0;

  if (cartHeader) {
    // Extract number from "Your Cart (3 Items)"
    var match = cartHeader.textContent.match(/\((\d+)\sItem/);
    if (match) {
      itemCount = parseInt(match[1]);
    }
  }

  var alertBox = document.getElementById("cart-alert");

  if (itemCount === 0) {
    // Show alert in UI
    alertBox.classList.remove("hidden");
    alertBox.classList.add("block");

    // Auto hide after 2 seconds
    setTimeout(() => {
      alertBox.classList.add("hidden");
      alertBox.classList.remove("block");
    }, 2000);
  } else {
    // Proceed to checkout
    window.location.href = "../cheak.html";
  }
}

