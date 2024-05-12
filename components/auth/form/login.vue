<template>
    <AuthFormBase @submit.prevent="submit" :loading="isLoading">
        <template #header> Войти в аккаунт </template>
        <AuthFormInput
            label="Почта"
            type="email"
            placeholder="Введите почту"
            v-model="email"
            v-bind="emailAttrs"
            v-model:error="errors.email"
        />
        <AuthFormInput
            label="Пароль"
            type="password"
            placeholder="Введите пароль"
            v-model="password"
            v-bind="passwordAttrs"
            v-model:error="errors.password"
        />
        <template #button>
            Войти
            <i class="pi pi-arrow-right"></i>
        </template>
    </AuthFormBase>
</template>

<script setup lang="ts">
const { signIn } = useAuth();

const { errors, setFieldError, defineField } = useForm({
    validationSchema: {},
});
const [email, emailAttrs] = defineField("email");
const [password, passwordAttrs] = defineField("password");

const isLoading = ref(false);

const submit = async () => {
    const credentials = {
        email: email.value,
        password: password.value,
    };
    try {
        isLoading.value = true;
        await signIn(credentials, { callbackUrl: "/" });
    } catch ({ data }: any) {
        const issues: any = data?.data?.issues;
        if (issues) {
            issues.forEach((issue: any) => {
                setFieldError(issue?.path?.[0], issue.message);
            });
        }
    } finally {
        isLoading.value = false;
    }
};
</script>

<style scoped lang="scss"></style>
