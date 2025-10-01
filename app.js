 const container = document.getElementById('logoScrollContainer');
  let scrollSpeed = 0.5; // Adjust speed (pixels per frame)
  let animationFrameId;

  function autoScroll() {
    container.scrollLeft += scrollSpeed;

    // When scrolled past half the scroll width, reset to start for infinite effect
    if (container.scrollLeft >= container.scrollWidth / 2) {
      container.scrollLeft = 0;
    }

    animationFrameId = requestAnimationFrame(autoScroll);
  }

  // Start auto scrolling
  animationFrameId = requestAnimationFrame(autoScroll);

  // Pause auto scroll on hover
  container.addEventListener('mouseenter', () => {
    cancelAnimationFrame(animationFrameId);
    container.style.cursor = 'grab';
  });

  // Resume auto scroll when mouse leaves
  container.addEventListener('mouseleave', () => {
    animationFrameId = requestAnimationFrame(autoScroll);
    container.style.cursor = 'default';
  });

  // Pause on touch start (mobile)
  container.addEventListener('touchstart', () => {
    cancelAnimationFrame(animationFrameId);
  });

  // Resume on touch end (mobile)
  container.addEventListener('touchend', () => {
    animationFrameId = requestAnimationFrame(autoScroll);
  });