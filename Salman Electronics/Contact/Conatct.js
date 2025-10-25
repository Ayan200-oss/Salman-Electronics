 // =================================================================
// 1. SPINNER, MODAL, and HERO TEXT ANIMATION
// =================================================================

// --- Constants ---
const MINIMUM_LOADER_DISPLAY_TIME = 1000; // 2 seconds minimum for the loader
const MODAL_DELAY_AFTER_LOADER = 1000;   // 1 second delay AFTER the loader is hidden
const startTime = Date.now();

window.addEventListener("load", () => {
    const spinnerWrapper = document.getElementById("spinner");
    const welcomeModalElement = document.getElementById('welcomeModal');
    // Ensure this class is applied to your main hero slogan container (e.g., slogan-container)
    const sloganContent = document.querySelector('.slogan-container'); 
    
    // 1. Loader Logic
    const elapsedTime = Date.now() - startTime;
    const loaderRemainingTime = MINIMUM_LOADER_DISPLAY_TIME - elapsedTime;
    
    setTimeout(() => {
        if (spinnerWrapper) {
            spinnerWrapper.classList.add("hidden");
        }

        // 2. Modal Logic (Unchanged)
        setTimeout(() => {
            if (welcomeModalElement && typeof bootstrap !== 'undefined' && bootstrap.Modal) {
                const welcomeModal = new bootstrap.Modal(welcomeModalElement);
                welcomeModal.show();
            }
        }, MODAL_DELAY_AFTER_LOADER); 

    }, Math.max(0, loaderRemainingTime)); 
    
    
    // 3. Hero Text Animation Logic (Uses its own 'is-visible' class)
    if (sloganContent) {
        const observerOptions = {
            root: null, 
            // Ensures observer doesn't trigger immediately on page load, 
            // enabling animation only on actual scroll/visibility change.
            rootMargin: '0px 0px -200px 0px', 
            threshold: 0 
        };
        
        const heroObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible'); 
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        heroObserver.observe(sloganContent);
    }
    }
);



    // Updated ID reference
    var navList = document.getElementById("qa-nav-list-id");
    function Show() {
        navList.classList.add("qa-nav__list--show");
    }
    function Hide(){
        navList.classList.remove("qa-nav__list--show");
    }

    function myFunction() {
        var input, filter, ul, li, a, i;
        // Updated ID reference
        input = document.getElementById("qa-search-input"); 
        filter = input.value.toUpperCase();
        // Updated ID reference
        ul = document.getElementById("qa-search-list"); 
        li = ul.getElementsByTagName("li");

        for (i = 0; i < li.length; i++) {
            a = li[i].getElementsByTagName("a")[0];
            if (filter !== "" && a.innerHTML.toUpperCase().indexOf(filter) > -1) {
                li[i].style.display = "block"; // Show match
            } else {
                li[i].style.display = "none"; // Hide non-match/empty search
            }
        }
    }

   // --- INPUT PLACEHOLDER TYPING ANIMATION ---
    const searchInput = document.getElementById('qa-search-input');
    const fullPlaceholder = "Search iPhone, Samsung, Xiaomi, etc..."; // The full text to type
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 100; // Speed in milliseconds
    const pauseDuration = 2000; // Pause at the end before repeating

    function typePlaceholder() {
        // Determine the current text to display
        const currentText = fullPlaceholder.substring(0, charIndex);
        searchInput.setAttribute('placeholder', currentText);

        if (!isDeleting) {
            // Typing forward
            if (charIndex < fullPlaceholder.length) {
                charIndex++;
                setTimeout(typePlaceholder, typingSpeed);
            } else {
                // Done typing, start pause
                isDeleting = true;
                setTimeout(typePlaceholder, pauseDuration);
            }
        } else {
            // Deleting backward
            if (charIndex > 0) {
                charIndex--;
                setTimeout(typePlaceholder, typingSpeed / 2); // Faster deletion
            } else {
                // Done deleting, start typing again
                isDeleting = false;
                setTimeout(typePlaceholder, 500); // Short pause before re-typing
            }
        }
    }

    // Start the animation when the page loads
    if (searchInput) {
        typePlaceholder();
    }






 
// Configuration for the Intersection Observer
        const observerOptions = {
            root: null, 
            rootMargin: '0px',
            threshold: 0.1 // Trigger when 10% of the element is visible
        };

        // Callback function to run when an intersection occurs
        const observerCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Element is in the viewport, trigger the animation
                    entry.target.classList.add('in-view');
                    // Stop observing this element once it's animated
                    observer.unobserve(entry.target);
                }
            });
        };

        // Create the Intersection Observer instance
        const observer = new IntersectionObserver(observerCallback, observerOptions);

        // Find all elements with the 'animate-on-scroll' class and observe them
        document.querySelectorAll('.animate-on-scroll').forEach(element => {
            observer.observe(element);
        });

         

    // Add to cart code start

// --- Configuration & Initialization ---
    const CART_STORAGE_KEY = 'cartItemCount';
    
    // CRITICAL: Load the current cart count from Local Storage
    let cartItemCount = parseInt(localStorage.getItem(CART_STORAGE_KEY) || '0', 10);

    // --- Element Getters ---
    const cartButton = document.getElementById('cart-button');
    const cartSlider = document.getElementById('cart-slider');
    const cartOverlay = document.getElementById('cart-overlay');
    const checkoutButton = document.getElementById('checkout-button'); // The new element

    
    // --- Slider Toggling Function (Your original code) ---
    function toggleCartSlider() {
        if (!cartSlider || !cartOverlay) return; 

        const isHidden = cartSlider.classList.contains('translate-x-full');

        if (isHidden) {
            cartSlider.classList.remove('translate-x-full');
            cartOverlay.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        } else {
            cartSlider.classList.add('translate-x-full');
            cartOverlay.classList.add('hidden');
            document.body.style.overflow = '';
        }
    }




    // --- Checkout Logic (The function you need) ---
    /**
     * Checks cart count and either alerts or navigates.
     */
   function handleCheckout(event) {
    event.preventDefault(); 
    
    // Ensure the cartItemCount is loaded (assuming your previous script is running)
    const CART_STORAGE_KEY = 'cartItemCount';
    let cartItemCount = parseInt(localStorage.getItem(CART_STORAGE_KEY) || '0', 10);
    
    if (cartItemCount === 0) {
        Swal.fire({
            icon: "error",
            title: "Oops...can't proceed to checkout",
            text: "Please add an item to your cart before proceeding to checkout",
            
            // *** FIX: ADD THIS CUSTOM CLASS PROPERTY ***
            customClass: {
                // Ensure the SweetAlert container has a Z-index higher than your cart slider (99999)
                container: 'sweet-alert-top-zindex' 
            }
        });
    } else {
        window.location.href = 'cheak.html'; 
    }
}

    // --- Event Listeners ---
    
    // 1. Open/Close Slider
    if (cartButton) {
        cartButton.addEventListener('click', toggleCartSlider);
    }

    // 2. Checkout Logic
    if (checkoutButton) {
        checkoutButton.addEventListener('click', handleCheckout);
    }
    
    // 3. Optional: Close on Escape Key
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && cartSlider && !cartSlider.classList.contains('translate-x-full')) {
            toggleCartSlider();
        }
    });


    