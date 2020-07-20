import React, {createContext, useCallback, useContext, useState} from 'react';

import {AuthResponse} from '../../../shared/models/auth-response';

export const AuthContext = createContext<AuthContextType>(null as any);

// @TODO This will be removed when we'll have an API to get user
const LOCAL_STORAGE_CUSTOMER_NAME = 'near_customer_name';
const LOCAL_STORAGE_CUSTOMER_TYPE = 'near_customer_type';

export type AuthStateType = {
    isLoggedIn: boolean,
    customerName: string,
    customerType: string,
}

export type AuthContextType = {
    state: AuthStateType,
    setAuthResponse: (authResponse: AuthResponse) => void,
    logout: () => void,
    getCustomerName: () => string
    getCustomerType: () => string
}

export function AuthProvider(props: any) {
    const customerName = localStorage.getItem(LOCAL_STORAGE_CUSTOMER_NAME);
    const customerType = localStorage.getItem(LOCAL_STORAGE_CUSTOMER_TYPE);

    const [state, setState] = useState<AuthStateType>({
        isLoggedIn: !!customerName,
        customerName: customerName,
        customerType: customerType,
    });

    const setAuthResponse = useCallback((authResponse: AuthResponse) => {
        localStorage.setItem(LOCAL_STORAGE_CUSTOMER_NAME, authResponse.customer.name);
        localStorage.setItem(LOCAL_STORAGE_CUSTOMER_TYPE, authResponse.customer.type);

        setState({
            ...state,
            isLoggedIn: true,
            customerName: authResponse.customer.name,
            customerType: authResponse.customer.type,
        });
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem(LOCAL_STORAGE_CUSTOMER_NAME);
        localStorage.removeItem(LOCAL_STORAGE_CUSTOMER_TYPE);
        setState({
            ...state,
            isLoggedIn: false
        })
    }, []);

    const getCustomerName = useCallback(() => {
        return localStorage.getItem(LOCAL_STORAGE_CUSTOMER_NAME);
    }, []);

    const getCustomerType = useCallback(() => {
        return localStorage.getItem(LOCAL_STORAGE_CUSTOMER_TYPE);
    }, []);

    const value: AuthContextType = {state, setAuthResponse, logout, getCustomerName, getCustomerType};

    return <AuthContext.Provider value={value}>
        {props.children}
    </AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
    return useContext(AuthContext);
}
