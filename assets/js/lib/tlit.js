/**
 * Add a custom element to the *Custom Element Registry*.
 *
 * @param {string} name - The name of the custom element.
 * @param {{ new(): HTMLElement }} elementClass - A class extending `HTMLElement`.
 * @param {ElementDefinitionOptions} [options] - A list of options for the custom element declaration.
 */
export function customElement (name, elementClass, options) {
    // Check if there's a pre-existing element with the same name as this one.
    const preexistingElementWithSameName = customElements.get(name);
    if (preexistingElementWithSameName !== elementClass) {
        // If so, throw an error.
        throw Error(`An element with the name ${name} has already been declared.`);
    }

    customElements.define(name, elementClass, options);
}