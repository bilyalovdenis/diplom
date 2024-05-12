export const useUserStore = defineStore("userStore", {
    state: () => ({
        name: "",
        isLoading: true,
        error: <null | string>null,
    }),

    actions: {
        async fetch() {
            this.isLoading = true;
            try {
                const session = await useAuth().getSession();
                this.name = session.name;
            } catch (error: any) {
                this.error = error.toString ? error.toString() : "";
            } finally {
                this.isLoading = false;
            }
        },
    },
});
