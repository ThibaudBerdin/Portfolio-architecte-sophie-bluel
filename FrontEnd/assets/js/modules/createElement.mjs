/**
 * Fonction de création d'un élément html
 * @param tagName
 * @param attributes
 * @param elementParentId
 * @param text
 * @returns {*}
 */
export function createElement(tagName, attributes = {}, elementParentId, text) {
    const element = document.createElement(tagName);

    for (const [attribute, value] of Object.entries(attributes)) {
        element.setAttribute(attribute, value);
    }

    if (text) {
        element.innerText = text;
    }
    if (elementParentId) {
        const elemParent = document.querySelector(elementParentId);
        elemParent.appendChild(element);
    }
    return element;
}