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
        login: '/login',
        addModerator: '/add-moderator',
        removeModerator: '/remove-moderator',
        transfer: '/transfer-tokens',
        mint: '/mint-tokens',
        purchase: '/purchase-item',
    },
    defaultEventsCount: 100,
    defaultLanguageId: 1
};

export const config = defaultConfig;
