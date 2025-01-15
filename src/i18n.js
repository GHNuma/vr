import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
    .use(HttpBackend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'ru', // Язык по умолчанию
        debug: true,
        interpolation: {
            escapeValue: false // React автоматически экранирует значения
        },
        backend: {
            loadPath: '/locales/{{lng}}/translation.json' // Путь к JSON-файлам
        }
    });

export default i18n;
