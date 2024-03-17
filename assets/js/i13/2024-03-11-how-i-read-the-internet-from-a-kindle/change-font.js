
// @license magnet:?xt=urn:btih:d3d9a9a6595521f9666a5e94cc830dab83b65699&dn=expat.txt Expat
document.addEventListener('DOMContentLoaded', () => {
    const PROPOSED_FONT = "IBM Plex Serif";

    // A human-readable form of the proposed font.
    // This is separated because we may need to do this anyway if the proposed font turns into a list.
    const HR_PROPOSED_FONT = PROPOSED_FONT;

    // The fallback text displayed when the original post content's font family can not be figured out.
    // Reads: "Currently, this page is using "
    const ORIGINAL_FONT_NAME_FALLBACK = 'original';

    // I can quickly see why people use React.
    // For all its flaws, it would have made the job x10 easier compared to all this.

    /** @type {HTMLElement} */
    const $$fontChangeButton = document.getElementById('i13-font-selector-button');
    /** @type {HTMLElement} */
    const $$currentFontName = document.getElementById('i13-current-font-name');
    /** @type {HTMLElement} */
    const $$proposedFontName = document.getElementById('i13-proposed-font-name');
    /** @type {HTMLElement} */
        const $$proposedFontNameAdverb = document.getElementById('i13-proposed-font-name-adverb');
    /** @type {HTMLElement} */
    const $$postContent = document.querySelector('.post-content');

    // Hack to find the current font. Weird.
    // Thanks to <https://stackoverflow.com/a/76000784>.
    const originalFont = (() => {
        const fontChoices = getComputedStyle($$postContent)
                .getPropertyValue('font-family')
                .split(', ');

        try {
            for (const font of document.fonts) {
                const { family } = font;
                if (fontChoices.includes(family)) {
                    // Strip quotes (if they exist).
                    const match = family.match(/^(?:'|")(.+)(?:'|")$/u);
                    return match ? match[1] : family;
                }
            }
        } catch (error) {
            return null;
        }
    })();

    let usingProposedFont = false;

    // A human-readable form of the original font's name.
    // If the original font could not be grabbed, just use a fallback placeholder.
    const HR_ORIGINAL_FONT_NAME = originalFont || ORIGINAL_FONT_NAME_FALLBACK;

    // The CSS stylesheet to change the document to the proposed font.
    const PROPOSED_FONT_CSS = `.post-content { font-family: ${PROPOSED_FONT}; }`;

    // Create a new stylesheet changing the post-content's font to the proposed one,
    // ready to be inserted into the document when the button is clicked.
    const $$customFontStylesheet = document.createElement('style');
    document.body.append($$customFontStylesheet);

    $$fontChangeButton.addEventListener('click', () => {
        // When the "change font" button is clicked, we need to... well... change the font.
        // We also need to *update* the "current font name" box so it accurately reflects
        // the font the article is currently being rendered in.
        if (usingProposedFont) {
            // We need to change from IBM Plex Serif (proposed) -> original.
            $$currentFontName.textContent = HR_ORIGINAL_FONT_NAME;
            $$proposedFontName.textContent = HR_PROPOSED_FONT;
            $$proposedFontNameAdverb.style.display = 'unset';

            // Remove the stylesheet changing the font to the proposed one.
            $$customFontStylesheet.innerHTML = '';
        } else {
            // We need to change from the original -> IBM Plex Serif (proposed).
            $$currentFontName.textContent = HR_PROPOSED_FONT;
            $$proposedFontName.textContent = originalFont ? `${originalFont} (the original)` : 'the original';

            // Hide the "temporarily" when we're changing the font to the proposed one.
            // This is because if we don't, it'll say "temporarily change back to [...] (the original)".
            // Changing back to the default isn't a temporary change (a page refresh reverts it back).
            $$proposedFontNameAdverb.style.display = 'none';
            $$customFontStylesheet.innerHTML = PROPOSED_FONT_CSS;
        }

        usingProposedFont = !usingProposedFont;
    });

    $$currentFontName.textContent = HR_ORIGINAL_FONT_NAME;
});
// @license-end