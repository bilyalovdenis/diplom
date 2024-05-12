<template>
    <header class="main-layout_header">
        <div>
            <UiSearchInput />
        </div>
        <div class="main-layout_header__right">
            <InputSwitch
                v-model="streamingModel"
                :disabled="isLoading"
                v-tooltip.bottom="{
                    value: tooltipValue,
                }"
            />
            <UiIconButton icon="pi-th-large" />
            <UiIconButton icon="pi-bell" badge />
            <UserAvatar />
        </div>
    </header>
</template>

<script setup lang="ts">
const { isStreaming, isLoading } = storeToRefs(useStreamStore());
const { enableStream, disableStream } = useStreamStore();

const streamingModel = computed({
    get() {
        return isStreaming.value;
    },
    set(value) {
        if (value) enableStream();
        else disableStream();
    },
});

const tooltipValue = computed(() => {
    if (isLoading.value) return "Подключаемся к стриму";
    if (isStreaming.value) return "Отключить стрим";
    if (!isStreaming.value) return "Включить стрим";
});
</script>

<style scoped lang="scss">
.main-layout_header {
    grid-area: header;
    padding: 16px 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: inset 1px 0 0 0 var(--surface-border);

    &__right {
        display: flex;
        align-items: center;
        gap: 16px;
    }
}
</style>
