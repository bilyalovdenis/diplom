import type { RouteLocationNormalized } from "vue-router";
import isAuth from "~/utils/route-validations/auth";

export default async function (route: RouteLocationNormalized) {
    if (!isAuth()) return false;

    const { userId: routeUserId } = route.params;
    const { id: sessionUserId } = await useAuth().getSession();
    return routeUserId == sessionUserId;
}
