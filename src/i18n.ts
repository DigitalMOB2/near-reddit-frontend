import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import Backend from 'i18next-xhr-backend';

import {config} from './config';

i18n.use(Backend)
    .use(initReactI18next)
    .init({
        debug: false,
        ...config.i18n,
        interpolation: {
            escapeValue: false,
        },
        backend: {
            loadPath: '/locales/{{lng}}/{{ns}}.json',
        },
    });
export default i18n;
