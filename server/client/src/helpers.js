import parse from 'date-fns/parse';

/**
 * UPPERCASE FIRST LETTER
 * takes a given string and uppercases the first letter
 * 
 */
export const ucFirst = (string='') => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};



export const uriEncodeAll = (items=[]) => {
	return items.map( item => encodeURIComponent(item) );
}

export const timeStampFromDateTime = (date, time) => {
    return parse(`${date} ${time}`);
}