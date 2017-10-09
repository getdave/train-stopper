import { parse, getTime, format } from 'date-fns';

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
    const newDate = parse(`${date} ${time}`);
    return getTime(newDate);
}

export const dateFromTS = (timestamp) => {
    return format(parseInt(timestamp, 10), 'Do MMMM YYYY');
}

export const timeFromTS = (timestamp) => {
    return format(parseInt(timestamp, 10), 'HH:mm');
}


export const omitByKey = (keyToOmit, obj) => {
	const newObj = Object.assign({}, obj);
            
    Object.keys(newObj).forEach(key => {
        if (key === keyToOmit) {
            delete newObj[key];
        }
    });

    return newObj;
}
