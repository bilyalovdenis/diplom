<template>
    <section class="auth-container">
        <header class="auth-container__header">
            <Image
                class="auth-container__header__logo"
                src="logo.png"
                alt="logo"
                width="40"
            />
            <span>BUSINKA</span>
        </header>
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
});
onMounted(() => {
    console.log(process.env.STYTCH_PROJECT_ID, process.env);
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
.auth-container__header {
    margin-bottom: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 32.5px;
    align-content: center;
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
