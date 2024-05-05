import { createError, eventHandler, readBody } from "h3";
import jwt from "jsonwebtoken";
import { SECRET } from "./login.post";

interface User {
    username: string;
    name: string;
    picture: string;
}

interface JwtPayload extends User {
    scope: Array<"test" | "user">;
    exp: number;
}

export default eventHandler(async (event) => {
    const body = await readBody<{ refreshToken: string }>(event);
    if (!body.refreshToken) {
        throw createError({
            statusCode: 403,
            statusMessage: "Unauthorized, no refreshToken in payload",
        });
    }

    const decoded = jwt.verify(body.refreshToken, SECRET) as
        | JwtPayload
        | undefined;

    if (!decoded) {
        throw createError({
            statusCode: 403,
            statusMessage: "Unauthorized, refreshToken can`t be verified",
        });
    }

    const user: User = {
        username: decoded.username,
        picture: decoded.picture,
        name: decoded.name,
    };

    const accessToken = jwt.sign({ ...user, scope: ["test", "user"] }, SECRET, {
        expiresIn: 15,
    });
    const refreshToken = jwt.sign(
        { ...user, scope: ["test", "user"] },
        SECRET,
        {
            expiresIn: 60 * 60 * 24,
        }
    );

    return {
        token: {
            accessToken,
            refreshToken,
        },
    };
});
