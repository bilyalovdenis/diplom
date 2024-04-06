// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    ssr: true,
    devtools: { enabled: true },
    typescript: {
        typeCheck: true,
    },
    build: {
        transpile: ["jsonwebtoken"],
    },
    modules: ["nuxt-primevue", "@pinia/nuxt", "@sidebase/nuxt-auth"],
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
    ],
});
