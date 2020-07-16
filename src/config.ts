const defaultConfig = {
    backendUrl: process.env.REACT_APP_BACKEND_URL,
    i18n: {
        lng: 'en',
        fallbackLng: 'en',
        whitelist: ['en', 'ro'],
    },
    routes: {
        homepage: '/',
        users: '/users',
        activity: '/activity',
        createToken: '/create-token',
        modifyToken: '/modify-token',
        accountInfo: '/account-info',
        multisigCreate: '/create-multisig',
        login: '/login',
    },
    defaultEventsCount: 100,
    defaultLanguageId: 1
};

export const config = defaultConfig;
