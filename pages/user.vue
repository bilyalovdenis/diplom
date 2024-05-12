<template>
    <NuxtPage />
</template>

<script setup lang="ts">
import { PATHS } from "~/constants/route";

definePageMeta({
    auth: true,
    middleware: ["user"],
    name: PATHS.user.name,
    breadcrumbName: false,
});
</script>

<style scoped></style>
