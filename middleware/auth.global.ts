import type { RouteLocationNormalized } from "vue-router";
import { META, PATHS } from "~/constants/route";

export default defineNuxtRouteMiddleware((to, from) => {
    // const token = useCookie(COOKIES.authToken);
    // if (!token.value) {
    //     return noAuthScript(to);
    // } else {
    //     return AuthScript(to);
    // }
});
function noAuthScript(to: RouteLocationNormalized) {
    if (to.name === PATHS.login.name || to.meta[META.authNotNeeded]) {
        return;
    } else {
        return navigateTo({ name: PATHS.login.name });
    }
}
function AuthScript(to: RouteLocationNormalized) {
    if (to.name === PATHS.login.name) {
        return "/";
    } else {
        return;
    }
}
