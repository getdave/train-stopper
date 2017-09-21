import React from 'react';
import DropdownList from 'react-widgets/lib/DropdownList';

export const ucFirst = function (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

const AutoSuggest = props => {
	const { handleInputChanged, labelName, placeholder, input, data, valueField, textField, busy, meta: { touched, error } } = props;


	return (
		<div className={ error ? 'has-danger' : ''}>
			<label htmlFor={input.id} className="">{labelName}</label>
			<DropdownList {...input}
				placeholder={placeholder}
		    	data={data}
		    	valueField={valueField}
		    	textField={textField}
		    	onSearch={handleInputChanged}
		    	busy={busy}
		    	caseSensitive={false}
			    minLength={3}
			    filter='contains'
		   		suggest={true}
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