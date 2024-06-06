import { createError, eventHandler, readBody } from "h3";
import { z } from "zod";
import { SStytchUserPost, SName } from "~/types";
import * as JwtService from "~/utils/services/jwt";
import { createUser } from "~/utils/services/user";

export default eventHandler(async (event) => {
    const result = SStytchUserPost.pick({ email: true, password: true })
        .merge(
            z.object({
                name: SName,
                petName: SName,
            })
        )
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
