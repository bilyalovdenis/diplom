<template>
    <div class="user-page-container">
        <UserBanner class="mb-2 banner" />
        <UserInfoCard />
    </div>
</template>

<script setup lang="ts">
import { PATHS } from "~/constants/route";

definePageMeta({
    auth: true,
    name: PATHS.userId.name,
    breadcrumbName: "Профиль",
});
</script>

<style scoped lang="scss">
.user-page-container {
    display: grid;
    gap: 24px;
    grid-template-rows: 320px 1fr;
    grid-template-columns: 372px 1fr;
    .banner {
        grid-column: 1 / -1;
    }
}
</style>
