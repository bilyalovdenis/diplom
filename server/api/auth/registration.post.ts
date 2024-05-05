import { createError, eventHandler, readBody } from "h3";
import { z } from "zod";
import jwt from "jsonwebtoken";
import { Client } from "stytch";
import { SECRET } from "./login.post";

export default eventHandler(async (event) => {
    const result = z
        .object({
            username: z.string().min(1),
            email: z.string().email(),
            password: z.string().min(1),
        })
        .safeParse(await readBody(event));
    if (!result.success) {
        throw createError({
            statusCode: 403,
            statusMessage: result.error.message,
        });
    }

    const client = new Client({
        project_id: "project-test-a6a4e32e-8905-4ded-9f24-f67ef84572c1",
        secret: "secret-test-2Zjmd_RoxEyrwyt2ukZpCe5MynURopd-y9E=",
    });

    const params = {
        email: "sandbox@stytch.com",
    };
    try {
        const resp = client.users.create(params);
        console.log("resp", resp);
    } catch (error) {
        console.log("error", error);
    }
    const expiresIn = 15;

    const { username } = result.data;

    const user = {
        username,
        picture: "https://github.com/nuxt.png",
        name: "User " + username,
    };

    const accessToken = jwt.sign({ ...user, scope: ["test", "user"] }, SECRET, {
        expiresIn,
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
