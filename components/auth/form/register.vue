<template>
    <AuthFormBase @submit.prevent="submit">
        <template #header> Создать аккаунт </template>
        <div class="container">
            <AuthFormInput
                label="Имя"
                type="name"
                placeholder="Введите ваше имя"
                v-model="name"
                v-bind="nameAttrs"
                v-model:error="errors.name"
            />
            <AuthFormInput
                label="Кличка питомца"
                placeholder="Введите кличку "
                v-model="petName"
                v-bind="petNameAttrs"
                v-model:error="errors.petName"
            />
        </div>
        <AuthFormInput
            label="Почта"
            type="email"
            placeholder="Введите почту"
            v-model="email"
            v-bind="emailAttrs"
            v-model:error="errors.email"
        />
        <div class="container">
            <AuthFormInput
                label="Пароль"
                type="password"
                placeholder="Введите пароль"
                v-model="password"
                v-bind="passwordAttrs"
                v-model:error="errors.password"
            />
            <AuthFormInput
                label="Повторите пароль"
                type="password"
                placeholder="Повторите пароль"
                v-model="confirmedPasswd"
                v-bind="confirmedPasswdAttrs"
                v-model:error="errors.confirmedPasswd"
            />
        </div>
        <template #button>
            Зарегистрироваться
            <i class="pi pi-arrow-right"></i>
        </template>
    </AuthFormBase>
</template>

<script setup lang="ts">
const { signUp } = useAuth();

const { errors, setFieldError, defineField } = useForm({
    validationSchema: {},
});
const [name, nameAttrs] = defineField("name");
const [email, emailAttrs] = defineField("email");
const [password, passwordAttrs] = defineField("password");
const [confirmedPasswd, confirmedPasswdAttrs] = defineField("confirmedPasswd");
const [petName, petNameAttrs] = defineField("petName");

const isLoading = ref(false);

const submit = async () => {
    if (!checkPasswordsSimilar()) return;

    const credentials = {
        name: name.value,
        password: password.value,
        email: email.value,
        petName: petName.value,
    };
    try {
        isLoading.value = true;
        await signUp(credentials, { callbackUrl: "/" });
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

const checkPasswordsSimilar = () => {
    const isSimilar = confirmedPasswd.value === password.value;
    if (!isSimilar) {
        setFieldError("confirmedPasswd", "Пароли должны совпадать");
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
