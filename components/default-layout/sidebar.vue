<template>
    <aside class="main-layout_sidebar">
        <DefaultLayoutRouteMenu :items="items" />
    </aside>
</template>

<script setup lang="ts">
import { PATHS } from "~/constants/route";
const { id }: JwtUser = await useAuth().getSession();
const { isStreaming } = storeToRefs(useStreamStore());
const items = computed(() => [
    {
        label: "Здоровье",
        items: [
            {
                label: "Live",
                icon: `pi pi-circle${isStreaming.value ? "-fill" : ""}`,
            },
            {
                label: "Статистика",
                icon: "pi pi-chart-bar",
            },
        ],
    },
    {
        label: "Аккаунт",
        items: [
            {
                label: "Профиль",
                icon: "pi pi-user",
                link: { name: PATHS.userId.name, params: { userId: id } },
            },
            {
                label: "Настройки",
                link: { name: PATHS.settings.name, params: { userId: id } },
                icon: "pi pi-cog",
            },
        ],
    },
]);
</script>

<style lang="scss">
.main-layout_sidebar {
    grid-area: sidebar;
}
</style>
