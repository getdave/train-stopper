import React from 'react';
import Combobox from 'react-widgets/lib/Combobox';


const AutoSuggest = props => {
	const { input, data, valueField, textField, busy} = props;
	return (
		<Combobox {...input}
	    	data={data}
	    	valueField={valueField}
	    	textField={textField}
	    	onChange={input.onChange}
	    	busy={busy}
	   	/>
	)
}

export default AutoSuggest;