import jwt from "jsonwebtoken";

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
