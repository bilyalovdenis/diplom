import { createError, eventHandler, readBody } from "h3";
import * as JwtService from "~/utils/services/jwt";
import { getUser } from "~/utils/services/user";
export const SECRET = process.env.ACCESS_TOKEN_SECRET ?? "";
import { SStytchUserPost } from "~/types";

export default eventHandler(async (event) => {
    const result = SStytchUserPost.pick({
        email: true,
        password: true,
    }).safeParse(await readBody(event));

    if (!result.success) {
        throw createError({
            statusCode: 400,
            data: result.error,
        });
    }

    // const { user, user_id } = await getUser(result.data);
    // const { picture, petName, petSex } =
    //     user.untrusted_metadata as StytchUntrustedMetadata; //TODO
    // const jwtBody: JwtUser = {
    //     id: user_id,
    //     name: user.name?.first_name || "",
    //     email: user.emails[0].email,
    //     picture,
    //     petName,
    //     petSex,
    //     phone: user.phone_numbers?.[0]?.phone_number,
    //     created_at: user.created_at,
    // };

    const jwtBody: JwtUser = {
        id: "fdfdf",
        name: "fdfdf",
        email: "user.emails[0].email",
        picture: null,
        petName: null,
        petSex: null,
        phone: undefined,
        created_at: "04/01/2222",
    };

    return {
        token: JwtService.sign(jwtBody),
    };
});
