import React, {createContext, useCallback, useContext, useState} from 'react';

import {AuthResponse} from '../../../shared/models/auth-response';

export const AuthContext = createContext<AuthContextType>(null as any);

// @TODO This will be removed when we'll have an API to get user
const LOCAL_STORAGE_CUSTOMER_NAME = 'near_customer_name';
const LOCAL_STORAGE_CUSTOMER_TYPE = 'near_customer_type';

export type AuthStateType = {
    isLoggedIn: boolean,
    shouldGetUsers: boolean,
    shouldGetBalance: boolean,
    visibleTransferForm: boolean,
    visibleMintForm: boolean,
    customerName: string,
    customerType: string,
    customerBalance: number,
    user: {},
    users: [],
    items: [],
    showModal: boolean
}

export type UserType = {
    user_name: string,
    user_type: string,
    balance: number
}

export type AuthContextType = {
    state: AuthStateType,
    setAuthResponse: (authResponse: AuthResponse) => void,
    logout: () => void,
    setUser: (user: UserType) => void,
    setUsers: (users: []) => void,
    setItems: (items: []) => void,
    setShouldGetUsers: (shouldGetUsers: boolean) => void
    setShouldGetBalance: (shouldGetBalance: boolean) => void
    setBalance: (balance: number) => void
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
        shouldGetUsers: false,
        shouldGetBalance: false,
        visibleTransferForm: false,
        visibleMintForm: false,
        user: {},
        users: [],
        items: []
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
            customerName: user.user_name,
            customerType: user.user_type,
            customerBalance: user.balance
        });
    }, [state]);

    const setUsers = useCallback((users: []) => {
        setState({
            ...state,
            users: users,
            shouldGetUsers: false,
            visibleMintForm: false
        });
    }, [state]);

    const setItems = useCallback((items: []) => {
        setState({
            ...state,
            items: items,
        });
    }, [state]);

    const setBalance = useCallback((balance: number) => {
        setState({
            ...state,
            customerBalance: balance,
            shouldGetBalance: false
        });
    }, [state]);

    const setShouldGetUsers = useCallback((spinning: boolean) => {
        setState({
            ...state,
            shouldGetUsers: spinning,
            visibleTransferForm: false,
            visibleMintForm: false,
            shouldGetBalance: false
        })
    }, [state]);

    const setShouldGetBalance = useCallback((shouldGetBalance: boolean) => {
        setState({
            ...state,
            shouldGetBalance: shouldGetBalance,
            visibleMintForm: false,
            visibleTransferForm: false
        })
    }, [state]);

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

    const value: AuthContextType = {state, setAuthResponse, logout, setUser, setShouldGetUsers,
        setVisibleTransferForm, setVisibleMintForm, setUsers, setItems, setShouldGetBalance, setBalance};

    return <AuthContext.Provider value={value}>
        {props.children}
    </AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
    return useContext(AuthContext);
}
