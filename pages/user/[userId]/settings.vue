<template>
    <div class="settings-container">
        <UserPictureForm />
        <UserForm />
    </div>
</template>

<script setup lang="ts">
import { PATHS } from "~/constants/route";

definePageMeta({
    auth: true,
    name: PATHS.settings.name,
    breadcrumbName: "Настройки",
});
</script>

<style scoped lang="scss">
.settings-container {
    display: grid;
    gap: 24px;
    grid-template-columns: minmax(150px, 400px) minmax(150px, 500px);
}
</style>
