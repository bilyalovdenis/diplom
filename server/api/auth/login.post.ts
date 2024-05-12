import { createError, eventHandler, readBody } from "h3";
import { Client } from "stytch";
import type { PasswordsAuthenticateRequest } from "stytch";
import { z } from "zod";
import * as JwtService from "~/utils/services/jwt";

export const SECRET = process.env.ACCESS_TOKEN_SECRET ?? "";

export default eventHandler(async (event) => {
    const result = z
        .object({
            email: z.string().email(),
            password: z.string().min(1),
        })
        .safeParse(await readBody(event));
    if (!result.success) {
        throw createError({
            statusCode: 400,
            data: result,
        });
    }

    const { user, user_id } = await getUser(result.data);
    const { picture, petName, petSex } =
        user.untrusted_metadata as StytchUntrustedMetadata; //TODO
    const jwtBody: JwtUser = {
        id: user_id,
        name: user.name?.first_name || "",
        email: user.emails[0].email,
        picture,
        petName,
        petSex,
        phone: user.phone_numbers?.[0]?.phone_number,
        created_at: user.created_at,
    };

    return {
        token: JwtService.sign(jwtBody),
    };
});

async function getUser(params: PasswordsAuthenticateRequest) {
    const { STYTCH_PROJECT_ID, STYTCH_SECRET } = process.env;
    if (!STYTCH_PROJECT_ID || !STYTCH_SECRET) {
        throw createError({
            statusCode: 500,
            statusMessage: "Internal stytch key is empty",
        });
    }

    const client = new Client({
        project_id: STYTCH_PROJECT_ID,
        secret: STYTCH_SECRET,
    });

    try {
        const resp = await client.passwords.authenticate(params);
        return resp;
    } catch (error: any) {
        throw createError({
            statusCode: 400,
            statusMessage: error.error_message,
        });
    }
}
