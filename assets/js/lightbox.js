// Listen for clicks on the document instead of iterating over each <img>.
document.addEventListener('click', (e) => {
    /** @type {HTMLElement} */
    const target = e.target;

    // The lightbox can be disabled for individual elements via the named class.
    if (target.tagName !== 'IMG' || target.classList.contains('u__lightbox-disabled')) {
        return;
    }

    console.log(target);

    // To achieve the lightbox effect, we 
});