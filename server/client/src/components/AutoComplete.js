// Be sure to include styles at some point, probably during your bootstrapping
import React, { Component } from 'react';
import axios from 'axios';
import Select from 'react-select';

class AutoComplete extends Component {


    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);

        this.state = {
            value: ''
        }
    }


    onChange (value) {
        this.setState({
            value: value
        });
    }


    getOptions(input) {

        if (input.length <= 3) {
            return Promise.reject('Too short');
        }

        const url = `/api/transport/stations`;
        
        return axios.get(url, {
            params: {
                query: input
            }
        }).then(response => {
            return { 
                options: response.data
            };            
        });
    }


    render() { 

		return ( 
			<div>
			    <Select.Async
			        name="originstation"
			        value={this.state.value} 
			        onChange={this.onChange}
			        loadOptions={this.getOptions}
			        autoload={false}
			    />
			</div>
		)
	}
}

export default AutoComplete;
