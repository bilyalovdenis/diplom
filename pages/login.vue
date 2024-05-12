<template>
    <section class="auth-container">
        <MainHeader size="large" style="margin-bottom: 10px" />
        <article class="auth-card">
            <Image
                class="auth-card__image-container"
                image-class="auth-card__image-container__image"
                src="/auth.jpg"
            />
            <AuthFormLogin />
        </article>
        <div class="auth-container-auth-redirect">
            <span>Еще не фанат Бусинки?</span>
            <NuxtLink
                class="auth-container-auth-redirect__link utils-animation-underline"
                :to="{ name: PATHS.register.name }"
            >
                Присоединиться к фанбазе
            </NuxtLink>
        </div>
    </section>
</template>

<script setup lang="ts">
import { PATHS } from "~/constants/route";
definePageMeta({
    layout: "empty",
    name: PATHS.login.name,
    auth: {
        unauthenticatedOnly: true,
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
        height: 440px;
    }
    & :deep(.auth-card__image-container__image) {
        width: 100%;
        height: 440px;
        object-fit: cover;
        object-position: 50% 10%;
        border-radius: 8px 0 0 8px;
    }
}
.auth-container-auth-redirect {
    @include mixins.body-regular-400();
    margin-top: 32px;
    color: var(--gray-600);
    align-content: center;
    .auth-container-auth-redirect__link {
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
