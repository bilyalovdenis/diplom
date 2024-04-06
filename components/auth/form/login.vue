<template>
    <AuthFormBase @button-click="singInClick">
        <template #header> Войти в аккаунт </template>
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
const email = ref("");
const emailHasError = ref<boolean>(false);
const emailError = ref("");
watch(email, () => (emailHasError.value = false));

const passwd = ref("");
const passwdHasError = ref<boolean>(false);
const passwdError = ref("");
watch(passwd, () => (passwdHasError.value = false));

const { signIn } = useAuth();

const singInClick = async () => {
    const credentials = {
        email: email.value,
        password: passwd.value,
    };
    try {
        const tmp = await signIn(credentials);
        console.log(tmp);
        alert("Successfully logged in!");
    } catch (error) {
        console.log(error);
    }
};
</script>

<style scoped lang="scss"></style>
