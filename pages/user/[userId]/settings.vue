<template>
    <div>templ</div>
</template>

<script setup lang="ts">
import { PATHS } from "~/constants/route";
definePageMeta({
    auth: true,
    name: PATHS.settings.name,
    breadcrumbName: "Настройки",
});
</script>

<style scoped></style>
