<template>
    <form class="auth-form">
        <h2 class="auth-form__header">
            <slot name="header" />
        </h2>
        <slot name="default" />
        <Button
            type="submit"
            :loading="props.loading"
            class="auth-form__auth-button"
            severity="primary"
            rounded
        >
            <slot name="button" />
        </Button>
        <Divider class="auth-form__divider"> войти с помощью </Divider>
        <AuthAlternativeBtns />
    </form>
</template>

<script setup lang="ts">
type Props = {
    loading?: boolean;
};

const props = defineProps<Props>();
</script>

<style scoped lang="scss">
@use "~/assets/modules/mixins";
.auth-form {
    padding: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: var(--gray-900);
}
.auth-form__header {
    margin: 0;
    margin-bottom: 24px;
    @include mixins.heading-05();
}
.auth-form__auth-button {
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 5px;
    height: 40px;
    @include mixins.sub-heading-03();
}
.auth-form__divider {
    @include mixins.label-regular();
    color: var(--gray-500);
    margin-top: 24px;
}
</style>
