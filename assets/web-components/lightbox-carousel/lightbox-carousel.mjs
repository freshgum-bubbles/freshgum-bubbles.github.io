import { customElement } from "../../lib/tlit";

/**
 * @typedef CustomHTMLElement
 * @property {{(): void}} [connectedCallback]
 * @property {{(): void}} [disconnectedCallback]
 * @property {{(): void}} [adoptedCallback]
 * @property {{(name: string, oldValue: string, newValue: string): void}} [attributeChangedCallback]
 */

/**
 * @implements {CustomHTMLElement}
 */
export class LightboxCarouselElement extends HTMLElement {
    constructor () {
        super();
        this._shadow = this.attachShadow({ mode: 'closed' });
    }

    /** @private @type {ShadowRoot} The shadow root for this custom element. */
    _shadow;

    /** @private @type {HTMLImageElement[]} The images this lightbox shall display. */
    _images = [ ];

    /**
     * Create a mutation observer to monitor for the addition and removal of
     * images from the specified document.
     *
     * @param {Document} document - The document to observe.
     */
    createImageMutationObserver (document) { }

    connectedCallback () {
        this._shadow.
    }

    /**
     * Set the images to be displayed via the lightbox.
     *
     * @param {HTMLImageElement} image - The image to add to the collection of images in the lightbox.
     */
    setImages (image) {
        this._images.push(image);
    }
}

customElement('fg-lightbox-carousel', LightboxCarouselElement);