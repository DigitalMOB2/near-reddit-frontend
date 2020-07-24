const defaultConfig = {
    backendUrl: process.env.REACT_APP_BACKEND_URL || 'http://188.166.164.13',
    i18n: {
        lng: 'en',
        fallbackLng: 'en',
        whitelist: ['en', 'ro'],
    },
    routes: {
        homepage: '/',
    },
    defaultEventsCount: 100,
    defaultLanguageId: 1,
    userTypes: {owner: 'owner', moderator: 'moderator', user: 'user'},
    itemTypes: {silver: 'Silver Award', gold: 'Golden Award', platinum: 'Diamond Award'},
    userNames: [{value: 'Deveon Lane'}, {value: 'Leslie Alexander'}, {value: 'Courtney Henry'}, {value: 'Eleanor Pena'}, {value: 'Theresa'}]
};

export const config = defaultConfig;
