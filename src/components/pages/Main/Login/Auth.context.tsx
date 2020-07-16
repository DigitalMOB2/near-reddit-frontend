import React, {createContext, useCallback, useContext, useState} from 'react';

import {CustomerRecord} from '../../../shared/models/customer-record';
import {AuthResponse} from '../../../shared/models/auth-response';

export const AuthContext = createContext<AuthContextType>(null as any);

const LOCAL_STORAGE_TOKEN_NAME = 'algorandlu_token';

// @TODO This will be removed when we'll have an API to get user
const LOCAL_STORAGE_CUSTOMER_NAME = 'algorandlu_customer_name';

export type AuthStateType = {
    isLoggedIn: boolean,
    userSessionId: string,
    customerName: string,
    customer: CustomerRecord
}

export type AuthContextType = {
    state: AuthStateType,
    setAuthResponse: (authResponse: AuthResponse) => void,
    logout: () => void,
    getToken: () => string,
    getCustomerName: () => string
}

export function AuthProvider(props: any) {
    const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME);
    const userSessionId = localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME);
    const customerName = localStorage.getItem(LOCAL_STORAGE_CUSTOMER_NAME);

    const [state, setState] = useState<AuthStateType>({
        isLoggedIn: !!token,
        userSessionId: userSessionId,
        customerName: customerName,
        customer: null
    });

    const setAuthResponse = useCallback((authResponse: AuthResponse) => {
        setState({
            ...state,
            isLoggedIn: true,
            userSessionId: authResponse.user.userSessionId,
            customerName: authResponse.customer.name,
            customer: authResponse.customer
        });
        localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, authResponse.user.userSessionId);
        localStorage.setItem(LOCAL_STORAGE_CUSTOMER_NAME, authResponse.customer.name);
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
        localStorage.removeItem(LOCAL_STORAGE_CUSTOMER_NAME);
        setState({
            ...state,
            isLoggedIn: false
        })
    }, []);

    const getToken = useCallback(() => {
        return localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME);
    }, []);

    const getCustomerName = useCallback(() => {
        return localStorage.getItem(LOCAL_STORAGE_CUSTOMER_NAME);
    }, []);

    const value: AuthContextType = {state, setAuthResponse, logout, getToken, getCustomerName};

    return <AuthContext.Provider value={value}>
        {props.children}
    </AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
    return useContext(AuthContext);
}
