import React from 'react';
import { withRouter } from 'react-router';

// https://stackoverflow.com/questions/52097564/forward-ref-through-react-routers-withrouter-hoc/52098690
export const withRouterAndRef = (Wrapped: any) => {
    const WithRouter = withRouter((props: any) => {
        const { forwardRef, ...otherProps } = props;
        return (<Wrapped ref={forwardRef} {...otherProps} />);

    });
    const WithRouterAndRef = React.forwardRef((props, ref) => (
        <WithRouter {...props} forwardRef={ref} />
    ))
    const name = Wrapped.displayName || Wrapped.name
    WithRouterAndRef.displayName = `withRouterAndRef(${name})`
    return WithRouterAndRef
}