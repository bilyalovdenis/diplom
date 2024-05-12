import { PATHS } from "~/constants/route";
import isAuth from "~/utils/route-validations/auth";

export default defineNuxtRouteMiddleware(async (to) => {
    if (!isAuth()) {
        return navigateTo({ name: PATHS.login.name });
    }
    const { id } = await useAuth().getSession();
    if (!to.params.userId || to.params.userId !== id) {
        return navigateTo({
            name: to.name ?? PATHS.userId.name,
            params: { userId: id },
        });
    }
});
