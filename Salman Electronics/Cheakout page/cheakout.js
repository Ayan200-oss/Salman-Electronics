/* Set rates + misc */
var taxRate = 0.05;
var shippingRate = 15.00; 
var fadeTime = 300;

/* Document Ready Function to ensure HTML is loaded before script runs */
$(document).ready(function() {
    /* Assign actions */
    // Attaching handlers for changes in quantity input
    $('.product-quantity input').on('change', function() {
        updateQuantity(this);
    });

    // Attaching handlers for clicks on remove button
    $('.product-removal button').on('click', function() {
        removeItem(this);
    });

    // *** CRITICAL STEP: Recalculate cart on page load to set initial totals ***
    recalculateCart();
});


/* Recalculate cart */
function recalculateCart()
{
    var subtotal = 0;
    
    /* Sum up row totals */
    // The .text() now retrieves a number because we removed the '$' from HTML
    $('.product').each(function () {
        subtotal += parseFloat($(this).children('.product-line-price').text());
    });
    
    /* Calculate totals */
    var tax = subtotal * taxRate;
    var shipping = (subtotal > 0 ? shippingRate : 0);
    var total = subtotal + tax + shipping;
    
    /* Update totals display */
    $('.totals-value').fadeOut(fadeTime, function() {
        // We add the '$' back in the display only
        $('#cart-subtotal').html('$' + subtotal.toFixed(2));
        $('#cart-tax').html('$' + tax.toFixed(2));
        $('#cart-shipping').html('$' + shipping.toFixed(2));
        $('#cart-total').html('$' + total.toFixed(2));
        if(total == 0){
            $('.checkout').fadeOut(fadeTime);
        }else{
            $('.checkout').fadeIn(fadeTime);
        }
        $('.totals-value').fadeIn(fadeTime);
    });
}


/* Update quantity */
function updateQuantity(quantityInput)
{
    /* Calculate line price */
    var productRow = $(quantityInput).parent().parent();
    // No need to clean the price text as we fixed the HTML
    var price = parseFloat(productRow.children('.product-price').text());
    var quantity = $(quantityInput).val();
    var linePrice = price * quantity;
    
    /* Update line price display and recalc cart totals */
    productRow.children('.product-line-price').each(function () {
        $(this).fadeOut(fadeTime, function() {
            $(this).text(linePrice.toFixed(2)); // Display without '$' for recalculation
            recalculateCart();
            $(this).fadeIn(fadeTime);
        });
    }); 
}


/* Remove item from cart */
function removeItem(removeButton)
{
    /* Remove row from DOM and recalc cart total */
    var productRow = $(removeButton).parent().parent();
    productRow.slideUp(fadeTime, function() {
        productRow.remove();
        recalculateCart();
    });
}