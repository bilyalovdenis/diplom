<template>
    <section class="auth-container">
        <MainHeader size="large" style="margin-bottom: 10px" />
        <article class="auth-card">
            <Image
                class="auth-card__image-container"
                image-class="auth-card__image-container__image"
                src="/auth.jpg"
            />
            <AuthFormRegister></AuthFormRegister>
        </article>
        <div class="auth-container-login-redirect">
            <span>Уже в числе фанатов?</span>
            <NuxtLink
                class="auth-container-login-redirect__link utils-animation-underline"
                :to="{ name: PATHS.login.name }"
            >
                Войти
            </NuxtLink>
        </div>
    </section>
</template>

<script setup lang="ts">
import { PATHS } from "~/constants/route";
definePageMeta({
    layout: "empty",
    name: PATHS.register.name,
    auth: {
        unauthenticatedOnly: true,
        navigateAuthenticatedTo: "/",
    },
    breadcrumbName: false,
});
</script>

<style scoped lang="scss">
@use "~/assets/modules/mixins";
.auth-container {
    position: fixed;
    top: 50%;
    left: 50%;
    height: 20px;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
}
.auth-card {
    width: 1010px;
    display: grid;
    background-color: white;
    border-radius: 8px;
    grid-template-columns: 1fr 1fr;
    & :deep(.auth-card__image-container) {
        height: 522px;
    }
    & :deep(.auth-card__image-container__image) {
        width: 100%;
        height: 522px;
        object-fit: cover;
        object-position: 50% 10%;
        border-radius: 8px 0 0 8px;
    }
}
.auth-container-login-redirect {
    @include mixins.body-regular-400();
    margin-top: 32px;
    color: var(--gray-600);
    align-content: center;
    .auth-container-login-redirect__link {
        @include mixins.body-regular-400();
        margin-left: 2px;
        text-decoration: none;
        color: var(--gray-900);
        &:visited {
            color: var(--gray-900);
        }
    }
}
</style>
