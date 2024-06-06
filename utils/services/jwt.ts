import jwt from "jsonwebtoken";
import { createError, getRequestHeader, H3Event } from "h3";

const TOKEN_TYPE = "Bearer";

export function sign(user: JwtUser) {
    const { ACCESS_TOKEN_LIFETIME, REFRESH_TOKEN_LIFETIME, SECRET } =
        getConstants();
    const accessToken = jwt.sign({ ...user, scope: ["test", "user"] }, SECRET, {
        expiresIn: ACCESS_TOKEN_LIFETIME,
    });
    const refreshToken = jwt.sign(
        { ...user, scope: ["test", "user"] },
        SECRET,
        {
            expiresIn: REFRESH_TOKEN_LIFETIME,
        }
    );
    return {
        accessToken,
        refreshToken,
    };
}
export const ensureAuth = async (event: H3Event) => {
    const authHeaderValue = getRequestHeader(event, "authorization");
    if (typeof authHeaderValue === "undefined") {
        throw createError({
            statusCode: 403,
            statusMessage:
                "Need to pass valid Bearer-authorization header to access this endpoint",
        });
    }

    const extractedToken = extractToken(authHeaderValue);
    //TODO тут проблема в проде
    if (process.env.NODE_ENV === "development") {
        const decoded = jwt.decode(extractedToken);
        //@ts-ignore
        if (!decoded?.id)
            throw createError({
                statusCode: 403,
                statusMessage: "You must be logged in to use this endpoint",
            });
        return decoded;
    }

    try {
        return jwt.verify(
            extractedToken,
            process.env.ACCESS_TOKEN_SECRET ?? ""
        );
    } catch (error) {
        console.error(error);
        throw createError({
            statusCode: 403,
            statusMessage: "You must be logged in to use this endpoint",
        });
    }
};
const extractToken = (authHeaderValue: string) => {
    const [, token] = authHeaderValue.split(`${TOKEN_TYPE} `);
    return token;
};
function getConstants() {
    const {
        ACCESS_TOKEN_LIFETIME,
        REFRESH_TOKEN_LIFETIME,
        ACCESS_TOKEN_SECRET,
    } = process.env;
    if (
        !ACCESS_TOKEN_LIFETIME ||
        !REFRESH_TOKEN_LIFETIME ||
        !ACCESS_TOKEN_SECRET
    ) {
        throw createError({
            statusCode: 500,
            statusMessage: "Internal jwt key is empty",
        });
    }
    return {
        ACCESS_TOKEN_LIFETIME,
        REFRESH_TOKEN_LIFETIME,
        SECRET: ACCESS_TOKEN_SECRET,
    };
}
