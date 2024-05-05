import { createError, eventHandler, getRequestHeader, H3Event } from "h3";
import jwt from "jsonwebtoken";
import { SECRET } from "./login.post";
import sleep from "~/utils/sleep";

const TOKEN_TYPE = "Bearer";

const extractToken = (authHeaderValue: string) => {
    const [, token] = authHeaderValue.split(`${TOKEN_TYPE} `);
    return token;
};
const ensureAuth = async (event: H3Event) => {
    const authHeaderValue = getRequestHeader(event, "authorization");
    if (typeof authHeaderValue === "undefined") {
        throw createError({
            statusCode: 403,
            statusMessage:
                "Need to pass valid Bearer-authorization header to access this endpoint",
        });
    }

    const extractedToken = extractToken(authHeaderValue);

    if (process.env.NODE_ENV === "development")
        return jwt.decode(extractedToken);

    try {
        return jwt.verify(extractedToken, SECRET);
    } catch (error) {
        console.error(error);
        throw createError({
            statusCode: 403,
            statusMessage: "You must be logged in to use this endpoint",
        });
    }
};

export default eventHandler((event) => {
    const user = ensureAuth(event);
    return user;
});
