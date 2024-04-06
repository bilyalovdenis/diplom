<template>
    <AuthFormBase @button-click="singUpClick">
        <template #header> Создать аккаунт </template>
        <div class="container">
            <AuthFormInput
                label="Имя"
                placeholder="Введите ваше имя"
                v-model="name"
                v-model:is-error="nameHasError"
                v-model:error="nameError"
            />
            <AuthFormInput
                label="Почта"
                placeholder="Введите почту"
                v-model="email"
                v-model:is-error="emailHasError"
                v-model:error="emailError"
            />
        </div>
        <AuthFormInput
            label="Пароль"
            placeholder="Введите пароль"
            v-model="passwd"
            v-model:is-error="passwdHasError"
            v-model:error="passwdError"
        />
        <AuthFormInput
            label="Повторите пароль"
            placeholder="Повторите пароль"
            v-model="confirmedPasswd"
            v-model:is-error="confirmedPasswdHasError"
            v-model:error="confirmedPasswdError"
            :style="{ 'margin-bottom': '24px' }"
        />
        <template #button>
            Зарегистрироваться
            <i class="pi pi-arrow-right"></i>
        </template>
    </AuthFormBase>
</template>

<script setup lang="ts">
const { signUp } = useAuth();

const name = ref("");
const nameHasError = ref<boolean>(false);
const nameError = ref("");
watch(name, () => (nameHasError.value = false));

const email = ref("");
const emailHasError = ref<boolean>(false);
const emailError = ref("");
watch(email, () => (emailHasError.value = false));

const passwd = ref("");
const passwdHasError = ref<boolean>(false);
const passwdError = ref("");
watch(passwd, () => (passwdHasError.value = false));

const confirmedPasswd = ref("");
const confirmedPasswdHasError = ref<boolean>(false);
const confirmedPasswdError = ref("");
watch(confirmedPasswd, () => (confirmedPasswdHasError.value = false));

const singUpClick = async () => {
    //TODO Добавить валидацию сохранения паролей
    const credentials = {
        username: name.value,
        password: passwd.value,
        email: email.value,
    };

    await signUp(credentials, { callbackUrl: "/" });
};
</script>

<style scoped lang="scss">
.container {
    display: flex;
    width: 100%;
    gap: 16px;
}
</style>
