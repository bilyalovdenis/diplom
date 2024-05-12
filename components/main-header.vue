<template>
    <header class="main-header" :class="`main-header_${props.size}`">
        <img class="main-header__logo" src="/logo.png" alt="logo" />
        <span>Businka</span>
    </header>
</template>

<script setup lang="ts">
type Props = {
    size?: "small" | "default" | "large";
};
const props = withDefaults(defineProps<Props>(), { size: "default" });
</script>

<style scoped lang="scss">
.main-header {
    display: flex;
    align-items: center;
    font-weight: 400;
    line-height: 100%;
    text-transform: capitalize;
    color: var(--gray-900);
    &_default {
        font-size: 24px;
        .main-header__logo {
            width: 32px;
            height: 32px;
        }
    }
    &_large {
        font-size: 37px;
        .main-header__logo {
            width: 51px;
            height: 51px;
        }
    }
}
</style>
