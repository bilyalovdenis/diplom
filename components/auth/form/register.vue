<template>
    <AuthFormBase @submit.prevent="singUpClick">
        <template #header> Создать аккаунт </template>
        <div class="container">
            <AuthFormInput
                label="Имя"
                placeholder="Введите ваше имя"
                v-model="name"
                v-model:error="nameError"
            />
            <AuthFormInput
                label="Почта"
                type="email"
                placeholder="Введите почту"
                v-model="email"
                v-model:error="emailError"
            />
        </div>
        <AuthFormInput
            label="Пароль"
            type="password"
            placeholder="Введите пароль"
            v-model="passwd"
            v-model:error="passwdError"
        />
        <AuthFormInput
            label="Повторите пароль"
            type="password"
            placeholder="Повторите пароль"
            v-model="confirmedPasswd"
            v-model:error="confirmedPasswdError"
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
    if (!checkPasswordsSimilar()) return;

    const credentials = {
        username: name.value,
        password: passwd.value,
        email: email.value,
    };

    await signUp(credentials, { callbackUrl: "/" });
};

const checkPasswordsSimilar = () => {
    confirmedPasswdHasError.value = false;
    confirmedPasswdError.value = "";

    const isSimilar = confirmedPasswd.value === passwd.value;
    if (!isSimilar) {
        confirmedPasswdHasError.value = true;
        confirmedPasswdError.value = "Пароли должны совпадать";
    }
    return isSimilar;
};
</script>

<style scoped lang="scss">
.container {
    display: flex;
    width: 100%;
    gap: 16px;
}
</style>
