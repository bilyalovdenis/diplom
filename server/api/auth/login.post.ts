import { createError, eventHandler, readBody } from "h3";
import { z } from "zod";
import jwt from "jsonwebtoken";

export const SECRET = process.env.ACCESS_TOKEN_SECRET ?? "";

export default eventHandler(async (event) => {
    const result = z
        .object({
            email: z.string().email(),
            password: z.string().min(5).max(15),
        })
        .safeParse(await readBody(event));
    if (!result.success) {
        throw createError({
            statusCode: 400,
            data: result,
        });
    }

    const { email } = result.data;

    // const { name, petName, email } = result.data;
    const user = {
        id: 1,
        email,
        picture: "https://github.com/nuxt.png",
    };
    // const user = {
    //     id: 1,
    //     name,
    //     email
    //     petSex: null,
    //     picture: "https://github.com/nuxt.png",
    //     petName,
    // };

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
