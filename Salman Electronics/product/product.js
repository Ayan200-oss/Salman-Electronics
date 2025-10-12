// --- NAVBAR TOGGLE FUNCTIONS ---
function Show() {
    const navList = document.getElementById("qa-nav-list-id");
    if (navList) {
        navList.classList.add("qa-nav__list--show");
    }
}
function Hide() {
    const navList = document.getElementById("qa-nav-list-id");
    if (navList) {
        navList.classList.remove("qa-nav__list--show");
    }
}

// --- SEARCH FILTER FUNCTION ---
function myFunction() {
    const input = document.getElementById('qa-search-input');
    const filter = input.value.toUpperCase();
    const ul = document.getElementById("qa-search-list");
    const li = ul.getElementsByTagName('li');

    for (let i = 0; i < li.length; i++) {
        const a = li[i].getElementsByTagName("a")[0];
        const txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

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

// --- MAIN SCRIPT INITIALIZATION ---
window.onload = function () {

    // --- SPINNER LOGIC ---
    const MINIMUM_LOADER_DISPLAY_TIME = 1500; // 1.5 seconds
    const startTime = Date.now();
    const spinnerWrapper = document.getElementById("spinner");
    if(spinnerWrapper) {
        const elapsedTime = Date.now() - startTime;
        const loaderRemainingTime = MINIMUM_LOADER_DISPLAY_TIME - elapsedTime;
        setTimeout(() => {
            spinnerWrapper.classList.add("hidden");
        }, Math.max(0, loaderRemainingTime));
    }


    // --- SLIDER ELEMENTS ---
    const slides = document.getElementsByClassName("sliderBlock_items__itemPhoto");
    const next = document.getElementsByClassName("sliderBlock_controls__arrowForward")[0];
    const previous = document.getElementsByClassName("sliderBlock_controls__arrowBackward")[0];
    const paginators = document.getElementsByClassName("sliderBlock_positionControls__paginatorItem");
    let currentSlide = 0;
    let slideInterval = setInterval(nextSlide, 5000);

    function goToSlide(n) {
        if (slides.length === 0) return;
        slides[currentSlide].classList.remove('sliderBlock_items__showing');
        paginators[currentSlide].classList.remove('sliderBlock_positionControls__active');
        currentSlide = (n + slides.length) % slides.length;
        slides[currentSlide].classList.add('sliderBlock_items__showing');
        paginators[currentSlide].classList.add('sliderBlock_positionControls__active');
        updateZoomForActiveSlide();
    }

    function nextSlide() {
        goToSlide(currentSlide + 1);
    }

    function previousSlide() {
        goToSlide(currentSlide - 1);
    }

    if(next && previous) {
        next.onclick = () => { clearInterval(slideInterval); nextSlide(); slideInterval = setInterval(nextSlide, 5000); };
        previous.onclick = () => { clearInterval(slideInterval); previousSlide(); slideInterval = setInterval(nextSlide, 5000); };
    }

    for (let i = 0; i < paginators.length; i++) {
        paginators[i].onclick = () => { clearInterval(slideInterval); goToSlide(i); slideInterval = setInterval(nextSlide, 5000); };
    }

    // --- IMAGE ZOOM FUNCTION ---
    function updateZoomForActiveSlide() {
        const oldLens = document.getElementById("imgZoomLens");
        if (oldLens) oldLens.remove();
        const activeSlide = slides[currentSlide];
        const activeImage = activeSlide ? activeSlide.querySelector('img') : null;
        if (activeImage && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
            imageZoom(activeImage.id, activeSlide);
        }
    }

    function imageZoom(imgID, container) {
        const img = document.getElementById(imgID);
        if(!img || !container) return;

        const lens = document.createElement("DIV");
        lens.setAttribute("class", "img-zoom-lens");
        lens.setAttribute("id", "imgZoomLens");
        container.appendChild(lens);
        
        const zoomRatio = 2;
        const cx = lens.offsetWidth / zoomRatio;
        const cy = lens.offsetHeight / zoomRatio;

        lens.style.backgroundImage = `url('${img.src}')`;
        lens.style.backgroundSize = `${img.width * zoomRatio}px ${img.height * zoomRatio}px`;

        const moveLens = (e) => {
            e.preventDefault();
            const pos = getCursorPos(e);
            let x = pos.x;
            let y = pos.y;
            
            lens.style.opacity = 1;

            if (x > img.width - (lens.offsetWidth / 2)) { x = img.width - (lens.offsetWidth / 2); }
            if (x < lens.offsetWidth / 2) { x = lens.offsetWidth / 2; }
            if (y > img.height - (lens.offsetHeight / 2)) { y = img.height - (lens.offsetHeight / 2); }
            if (y < lens.offsetHeight / 2) { y = lens.offsetHeight / 2; }
            
            lens.style.left = `${x}px`;
            lens.style.top = `${y}px`;
            lens.style.backgroundPosition = `-${(x * zoomRatio) - cx}px -${(y * zoomRatio) - cy}px`;
        };
        const hideLens = () => { lens.style.opacity = 0; };

        container.addEventListener("mousemove", moveLens);
        container.addEventListener("mouseleave", hideLens);

        function getCursorPos(e) {
            e = e || window.event;
            const a = img.getBoundingClientRect();
            let x = e.pageX - a.left - window.pageXOffset;
            let y = e.pageY - a.top - window.pageYOffset;
            return { x, y };
        }
    }
    updateZoomForActiveSlide();

    // --- QUANTITY CONTROLS ---
    const up = document.getElementsByClassName('block_quantity__up')[0];
    const down = document.getElementsByClassName('block_quantity__down')[0];
    const input = document.getElementsByClassName('block_quantity__number')[0];

    if (up && down && input) {
        const getValue = () => parseInt(input.value) || 1;
        up.onclick = () => { input.value = getValue() + 1; };
        down.onclick = () => { input.value = getValue() > 1 ? getValue() - 1 : 1; };
    }
    
    // --- SPECIFICATION TOGGLE ---
    const specToggleBtn = document.getElementById("specToggleBtn");
    const fullSpecBlock = document.getElementById("fullSpecBlock");

    if (specToggleBtn && fullSpecBlock) {
        specToggleBtn.onclick = function () {
            const isVisible = fullSpecBlock.classList.toggle("block_descriptionCharacteristic__active");
            specToggleBtn.textContent = isVisible ? "Hide Full Specs" : "Show Full Specs";
            fullSpecBlock.style.maxHeight = isVisible ? `${fullSpecBlock.scrollHeight}px` : "0";
        };
        // Initial setup for smooth transition
        fullSpecBlock.style.maxHeight = "0";
    }
};

// --- INPUT PLACEHOLDER TYPING ANIMATION ---
    const searchInput = document.getElementById('qa-search-input');
    const fullPlaceholder = "Search for iPhone, Samsung, Xiaomi, etc..."; // The full text to type
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
    // ------------------------------------------