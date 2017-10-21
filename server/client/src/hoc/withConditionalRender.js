import React from 'react';
import { Alert } from 'reactstrap';
import { isEmpty } from 'lodash';


const withConditionalRender = options => Component => props => {
    
      options = Object.assign({},{
        requiredProp: 'data', // eg: props.data
        missingDataMsg: 'No data found do something else',
        errorMsg: 'There was a problem. Please try again.',
        fetchingMsg: 'Loading...',
      }, options);

      
      if (props.isFetching) {
          return (
              <p>{options.fetchingMsg}</p>
          );
      }

      if (props.isError) {
          return (
              <Alert color="warning">
                  { options.errorMsg }
              </Alert>
          );
      }

      // Don't allow <Component>'s render() method to be called
      // unless the data prop is available      
      if ( isEmpty( props[options.requiredProp] ) ) {
          return ( 
            <Alert color="info">
              { options.missingDataMsg }
            </Alert>
          )
      }
    
      return <Component { ...props } />;
};

export default withConditionalRender;