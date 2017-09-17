import React from 'react';
import Combobox from 'react-widgets/lib/Combobox';


const ComboBox = props => {
	console.log(props);
	const { input, data, valueField, textField, busy} = props;
	return (
		<ComboBox {...input}
	    	data={data}
	    	valueField={valueField}
	    	textField={textField}
	    	onChange={input.onChange} 
	    	busy={busy}
	   	/>
	)
}

export default Combobox;