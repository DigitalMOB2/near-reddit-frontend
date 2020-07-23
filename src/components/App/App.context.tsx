import React, {createContext, useCallback, useContext, useState} from 'react';

import {AppContextType} from './app-context.type';
import {modules} from '../pages/modules/config';

export const AppContext = createContext<AppContextType>(null as any);

type AppStateType = {
    loadedModuleKey: string
}

export function AppProvider(props: any) {
    const [state, setState] = useState<AppStateType>({
        loadedModuleKey: modules.default.key
    });

    const setModule = useCallback((key: string) => {
        setState({
                ...state,
                loadedModuleKey: key
        })
    }, [state]);

    const value: AppContextType = { state, setModule };

    return <AppContext.Provider value={value}>
        {props.children}
    </AppContext.Provider>;
}

export function useApp(): AppContextType {
    return useContext(AppContext);
}
