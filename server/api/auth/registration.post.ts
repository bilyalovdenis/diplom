import { createError, eventHandler, readBody } from "h3";
import { z } from "zod";
import { Client } from "stytch";
import {
    MIN_PASSWORD_LENGTH,
    MAX_PASSWORD_LENGTH,
    MAX_NAME_LENGTH,
} from "~/constants/user";
import * as JwtService from "~/utils/services/jwt";
export default eventHandler(async (event) => {
    const result = z
        .object({
            name: z.string().min(1).max(MAX_NAME_LENGTH),
            email: z.string().email(),
            petName: z.string().min(1).max(MAX_NAME_LENGTH),
            password: z
                .string()
                .min(MIN_PASSWORD_LENGTH)
                .max(MAX_PASSWORD_LENGTH),
        })
        .safeParse(await readBody(event));
    if (!result.success) {
        throw createError({
            statusCode: 400,
            data: result.error,
        });
    }
    const { name, email, password } = result.data;

    const params: StytchUserPost = {
        email,
        password,
        name: { first_name: name },
        untrusted_metadata: {
            picture: null,
            petName: result.data.petName,
            petSex: null,
        },
    };

    const { user, user_id } = await createUser(params);

    const { picture, petName, petSex } =
        user.untrusted_metadata as StytchUntrustedMetadata; //TODO
    const jwtBody: JwtUser = {
        id: user_id,
        name: user.name?.first_name || "",
        email: user.emails[0].email,
        picture,
        petName,
        petSex,
        created_at: user.created_at,
        phone: user.phone_numbers?.[0]?.phone_number,
    };

    return {
        token: JwtService.sign(jwtBody),
    };
});
async function createUser(params: StytchUserPost) {
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
        const resp = await client.passwords.create(params);
        return resp;
    } catch (error: any) {
        console.error(error, "error");
        throw createError({
            statusCode: 400,
            statusMessage: error.error_message,
        });
    }
}
