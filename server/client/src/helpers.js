

/**
 * UPPERCASE FIRST LETTER
 * takes a given string and uppercases the first letter
 * 
 */
export const ucFirst = function (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
};