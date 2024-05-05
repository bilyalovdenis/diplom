export {};

declare global {
    type User = {
        id: number;
        name: string;
        petName: string;
        petSex: "female" | "male" | null;
        email: string;
        picture: string | null;
    };
}
