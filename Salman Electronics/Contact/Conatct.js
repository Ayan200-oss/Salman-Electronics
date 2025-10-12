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