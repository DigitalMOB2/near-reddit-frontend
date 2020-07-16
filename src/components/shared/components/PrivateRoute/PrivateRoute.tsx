import React from 'react';
import {Route, Redirect} from 'react-router-dom';

import {useAuth} from '../../../pages/Main/Login/Auth.context';
import {config} from '../../../../config';

export function PrivateRoute({ children, ...rest }: any) {

    const authCtx = useAuth();

    return (<Route
            {...rest}
            render={({ location }) =>
                authCtx.state.isLoggedIn ? (children) : (
                    <Redirect
                        to={{
                            pathname: config.routes.login,
                            state: { from: location }
                        }}
                    />
                )
            }
        />);
}
