export type AppContextType = {
    state: {
        loadedModuleKey: string
    },
    setModule: (key: string) => void;
}
