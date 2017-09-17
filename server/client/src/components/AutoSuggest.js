import React from 'react';
import Combobox from 'react-widgets/lib/Combobox';

export const ucFirst = function (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

const AutoSuggest = props => {
	const { labelName, input, data, valueField, textField, busy, meta: { touched, error } } = props;

	return (
		<div className={ error ? 'has-danger' : ''}>
			<label htmlFor={input.id} className="">{labelName}</label>
			<Combobox {...input}
		    	data={data}
		    	valueField={valueField}
		    	textField={textField}
		    	onChange={input.onChange}
		    	busy={busy}
		   	/>
		   	{touched &&
	        error &&
	        <small className="form-control-feedback">
	          {error}
	        </small>}
	    </div>
	)
}

export default AutoSuggest;