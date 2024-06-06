import { Client } from "stytch";
import type { PasswordsAuthenticateRequest } from "stytch";
function getClient() {
    const { STYTCH_PROJECT_ID, STYTCH_SECRET } = process.env;
    if (!STYTCH_PROJECT_ID || !STYTCH_SECRET) {
        throw createError({
            statusCode: 500,
            statusMessage: "Internal stytch key is empty",
        });
    }

    return new Client({
        project_id: STYTCH_PROJECT_ID,
        secret: STYTCH_SECRET,
    });
}

export async function getUser(params: PasswordsAuthenticateRequest) {
    const client = getClient();

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

export async function createUser(params: StytchUserPost) {
    const client = getClient();

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

export async function updateUser() {
    const client = getClient();
}
