export {};

declare module "#app" {
    interface PageMeta {
        breadcrumbName: string | false;
    }
}
declare global {
    type PetSex = null | "female" | "male";

    type StytchUntrustedMetadata = {
        picture: string | null;
        petName: string | null;
        petSex: PetSex;
    };

    type StytchUserPost = {
        email: string;
        password: string;
        name: {
            first_name: string;
        };
        untrusted_metadata: StytchUntrustedMetadata;
    };

    type JwtUser = StytchUntrustedMetadata & {
        id: string;
        email: string;
        name: string;
        created_at?: string;
        phone?: string;
    };
}
