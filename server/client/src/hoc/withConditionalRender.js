import React from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import { Alert } from 'reactstrap';

function withConditionalRender(Component) {
  return function EnhancedComponent(props) {

      if (props.loading) {
          return (
              <LoadingSpinner />
          );
      }

      if (props.error) {
          return (
              <Alert color="warning">
                  { props.errorMsg }
              </Alert>
          );
      }

      // Don't allow <Component>'s render() method to be called
      // unless the data prop is available
      if (!props.data || !props.data.length) {
          return null;
      }
    
      return <Component { ...props } />;
  };
};

export default withConditionalRender;