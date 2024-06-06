import { ensureAuth } from "~/utils/services/jwt";

export default eventHandler((event) => {
    const user = ensureAuth(event);
    return user;
});
