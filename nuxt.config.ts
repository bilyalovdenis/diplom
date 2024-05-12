// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    ssr: false,
    devtools: { enabled: true },
    typescript: {
        typeCheck: true,
    },
    build: {
        transpile: ["jsonwebtoken"],
    },
    modules: [
        "nuxt-primevue",
        "@pinia/nuxt",
        "@sidebase/nuxt-auth",
        "nuxt-zod-i18n",
        "@nuxtjs/i18n",
        "@vee-validate/nuxt",
        "@vueuse/nuxt",
        "nuxt3-date-fns",
    ],
    veeValidate: {
        // disable or enable auto imports
        autoImports: true,
        // Use different names for components
        componentNames: {
            Form: "VeeForm",
            Field: "VeeField",
            FieldArray: "VeeFieldArray",
            ErrorMessage: "VeeErrorMessage",
        },
    },
    auth: {
        baseURL: "/api/auth",
        provider: {
            type: "refresh",
            endpoints: {
                signIn: { path: "/login", method: "post" },
                signOut: { path: "/logout", method: "post" },
                signUp: { path: "/registration", method: "post" },
                getSession: { path: "/session", method: "get" },
                refresh: { path: "/refresh", method: "post" },
            },
            token: {
                signInResponseTokenPointer: "/token/accessToken",
                maxAgeInSeconds: 60 * 5, // 5 min
                sameSiteAttribute: "lax",
            },
            refreshToken: {
                signInResponseRefreshTokenPointer: "/token/refreshToken",
                refreshRequestTokenPointer: "/refreshToken",
            },
            sessionDataType: {
                id: "string",
                email: "string",
                name: "string",
                role: "admin | guest | account",
                subscriptions:
                    "{ id: number, status: 'ACTIVE' | 'INACTIVE' }[]",
            },
        },
        globalAppMiddleware: true,
    },
    primevue: {
        /* Options */
    },
    css: [
        "primevue/resources/themes/aura-light-green/theme.css",
        "~/assets/main.scss",
        "normalize.css/normalize.css",
        "bootstrap/dist/css/bootstrap.min.css",
    ],
    zodI18n: {},
    i18n: {
        vueI18n: "./i18n.config.ts", // if you are using custom path, default
        defaultLocale: "ru", // default locale of your project for Nuxt pages and routing
    },
});
