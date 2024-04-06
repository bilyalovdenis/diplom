<template>
    <AuthFormBase @button-click="singInClick">
        <template #header> Войти в аккаунт </template>
        <pre>Status: <span data-testid="status">{{ status }}</span></pre>
        <pre>
Data: {{ data || "no session data present, are you logged in?" }}</pre
        >
        <pre>
Last refreshed at: {{ lastRefreshedAt || "no refresh happened" }}</pre
        >
        <pre>
JWT token: {{ token || "no token present, are you logged in?" }}</pre
        >
        <pre>
JWT refreshToken: {{
                refreshToken || "no refreshToken present, are you logged in?"
            }}</pre
        >
        <button @click="refresh()">refresh tokens</button>
        <AuthFormInput
            label="Почта"
            placeholder="Введите почту"
            v-model="email"
            v-model:is-error="emailHasError"
            v-model:error="emailError"
        />
        <AuthFormInput
            label="Пароль"
            placeholder="Введите пароль"
            v-model="passwd"
            v-model:is-error="passwdHasError"
            v-model:error="passwdError"
            :style="{ 'margin-bottom': '24px' }"
        />
        <template #button>
            Войти
            <i class="pi pi-arrow-right"></i>
        </template>
    </AuthFormBase>
</template>

<script setup lang="ts">
const { signIn, refreshToken, refresh, token, data, status, lastRefreshedAt } =
    useAuth();

const email = ref("");
const emailHasError = ref<boolean>(false);
const emailError = ref("");
watch(email, () => (emailHasError.value = false));

const passwd = ref("");
const passwdHasError = ref<boolean>(false);
const passwdError = ref("");
watch(passwd, () => (passwdHasError.value = false));

const singInClick = async () => {
    const credentials = {
        username: email.value,
        password: passwd.value,
    };
    await signIn(credentials, { callbackUrl: "/" });
};
</script>

<style scoped lang="scss"></style>
