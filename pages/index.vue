<template>
    <div>Home</div>
    <pre>Status: <span data-testid="status">{{ status }}</span></pre>
    <pre>Data: {{ data || "no session data present, are you logged in?" }}</pre>
    <pre>Last refreshed at: {{ lastRefreshedAt || "no refresh happened" }}</pre>
    <pre>JWT token: {{ token || "no token present, are you logged in?" }}</pre>
    <pre>
JWT refreshToken: {{
            refreshToken || "no refreshToken present, are you logged in?"
        }}</pre
    >
    <Button label="loginout" @click="loginOut" />
</template>

<script setup lang="ts">
import { PATHS } from "~/constants/route";

const { signOut, refreshToken, token, data, status, lastRefreshedAt } =
    useAuth();
definePageMeta({ auth: true, breadcrumbName: false, name: PATHS.home.name });
const loginOut = () => {
    signOut({ callbackUrl: "/login" });
};
</script>

<style scoped></style>
