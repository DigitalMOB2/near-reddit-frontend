import React, {createContext, useCallback, useContext, useState} from 'react';

import {AuthResponse} from '../../../shared/models/auth-response';

export const AuthContext = createContext<AuthContextType>(null as any);

// @TODO This will be removed when we'll have an API to get user
const LOCAL_STORAGE_CUSTOMER_NAME = 'near_customer_name';
const LOCAL_STORAGE_CUSTOMER_TYPE = 'near_customer_type';

export type AuthStateType = {
    isLoggedIn: boolean,
    isSpinning: boolean,
    visibleTransferForm: boolean,
    visibleMintForm: boolean,
    customerName: string,
    customerType: string,
    customerBalance: number,
    user: {},
    showModal: boolean
}

export type UserType = {
    name: string,
    type: string,
    balance: number
}

export type AuthContextType = {
    state: AuthStateType,
    setAuthResponse: (authResponse: AuthResponse) => void,
    logout: () => void,
    getCustomerName: () => string,
    getCustomerType: () => string,
    setUser: (user: UserType) => void,
    setSpinning: (spinning: boolean) => void
    setVisibleTransferForm: (visibleTransferForm: boolean) => void
    setVisibleMintForm: (visibleMintForm: boolean) => void
}

export function AuthProvider(props: any) {
    const customerName = localStorage.getItem(LOCAL_STORAGE_CUSTOMER_NAME);

    const [state, setState] = useState<AuthStateType>({
        isLoggedIn: !!customerName,
        customerName: '',
        customerType: '',
        customerBalance: 0,
        showModal: false,
        isSpinning: false,
        visibleTransferForm: false,
        visibleMintForm: false,
        user: {}
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
    }, [state]);

    const setUser = useCallback((user: UserType) => {
        setState({
            ...state,
            showModal: true,
            customerName: user.name,
            customerType: user.type,
            customerBalance: user.balance,
        });
    }, [state]);

    const setSpinning = useCallback((spinning: boolean) => {
        setState({
            ...state,
            isSpinning: spinning,
            visibleTransferForm: false,
            visibleMintForm: false
        })
    }, [state])

    const setVisibleTransferForm = useCallback((visibleTransferForm: boolean) => {
        setState({
            ...state,
            visibleTransferForm: visibleTransferForm
        })
    }, [state])

    const setVisibleMintForm = useCallback((visibleMintForm: boolean) => {
        setState({
            ...state,
            visibleMintForm: visibleMintForm
        })
    }, [state])

    const logout = useCallback(() => {
        setState({
            ...state,
            showModal: false,
        })
    }, [state]);

    const getCustomerName = useCallback(() => {
        return localStorage.getItem(LOCAL_STORAGE_CUSTOMER_NAME);
    }, []);

    const getCustomerType = useCallback(() => {
        return localStorage.getItem(LOCAL_STORAGE_CUSTOMER_TYPE);
    }, []);

    const value: AuthContextType = {state, setAuthResponse, logout, getCustomerName,
        getCustomerType, setUser, setSpinning,
        setVisibleTransferForm, setVisibleMintForm};

    return <AuthContext.Provider value={value}>
        {props.children}
    </AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
    return useContext(AuthContext);
}
