import { z } from "zod";
import {
    MAX_NAME_LENGTH,
    MIN_PASSWORD_LENGTH,
    MAX_PASSWORD_LENGTH,
} from "~/constants/user";
declare module "#app" {
    interface PageMeta {
        breadcrumbName: string | false;
    }
}
declare global {
    type PetSex = z.infer<typeof SPetSex>;

    type StytchUntrustedMetadata = z.infer<typeof SStytchUntrustedMetadata>;

    type StytchUserPost = z.infer<typeof SStytchUserPost>;

    type JwtUser = z.infer<typeof SJwtUser>;
}
export const SName = z.string().min(1).max(MAX_NAME_LENGTH);
export const SPetSex = z.union([
    z.literal("male"),
    z.literal("female").nullable(),
]);
export const SStytchUntrustedMetadata = z.object({
    picture: z.string().nullable(),
    petName: SName.nullable(),
    petSex: SPetSex,
});
export const SJwtUser = SStytchUntrustedMetadata.merge(
    z.object({
        id: z.string(),
        email: z.string().email(),
        name: z.string().min(1).max(MAX_NAME_LENGTH),
        created_at: z.string().optional(),
        phone: z.string().optional(),
    })
);
export const SStytchUserPost = z.object({
    email: z.string().email(),
    password: z.string().min(MIN_PASSWORD_LENGTH).max(MAX_PASSWORD_LENGTH),
    name: z.object({
        first_name: SName,
    }),
    untrusted_metadata: SStytchUntrustedMetadata,
});
