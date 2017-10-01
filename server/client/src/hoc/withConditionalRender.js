import React from 'react';
import { Alert } from 'reactstrap';
import { isEmpty } from 'lodash';

function withConditionalRender(Component, dataProp='data', errorMsg='There was a problem. Please try again.') {
  return function EnhancedComponent(props) {
      if (props.isFetching) {
          return (
              <p>Loading...</p>
          );
      }

      if (props.isError) {
          return (
              <Alert color="warning">
                  { errorMsg }
              </Alert>
          );
      }

      // Don't allow <Component>'s render() method to be called
      // unless the data prop is available      
      if ( isEmpty( props[dataProp] ) ) {
          return ( 
            <Alert color="info">
              No data found.
            </Alert>
          )
      }
    
      return <Component { ...props } />;
  };
};

export default withConditionalRender;