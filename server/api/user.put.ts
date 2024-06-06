import { SStytchUntrustedMetadata, SJwtUser } from "~/types";
import { getServerSession } from "#auth";

export default eventHandler(async (event) => {
    const result = SJwtUser.pick({ name: true })
        .merge(SStytchUntrustedMetadata)
        .partial()
        .merge(SJwtUser.pick({ id: true }))
        .safeParse(await readBody(event));
    if (!result.success) {
        throw createError({
            statusCode: 400,
            data: result.error,
        });
    }
    return { tmp: result };
    //TODO Нужна валидация
});
