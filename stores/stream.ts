export const useStreamStore = defineStore("streamStore", {
    state: () => ({
        isStreaming: false,
        isLoading: false,
    }),

    actions: {
        async enableStream() {
            this.isLoading = true;
            await sleep(2000);
            this.isStreaming = true;
            this.isLoading = false;
        },
        async disableStream() {
            this.isLoading = true;
            await sleep(2000);
            this.isStreaming = false;
            this.isLoading = false;
        },
    },
});
