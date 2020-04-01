import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({component: Component, ...rest}) => {
    return (
        <Route
            {...rest}
            render={(props) =>{
                if(localStorage.getItem('logged')){
                    //TODO
                    console.log('protected route suveike')
                   return <Component {...props} />
                } else {
                    console.log('protected route nesuveike')
                   return <Redirect to={{
                            pathname: '/',
                            state: {from: props.location}
                        }} 
                    />
                }
            }}
        />
    );
}

export default ProtectedRoute;