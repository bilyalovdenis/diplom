<template>
    <header class="main-layout_header">
        <div>
            <UiSearchInput />
        </div>
        <div class="main-layout_header__right">
            <UiIconButton icon="pi-th-large" />
            <UiIconButton icon="pi-bell" badge />
            <UserAvatar />
        </div>
    </header>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.main-layout_header {
    grid-area: header;
    padding: 16px 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: inset 1px 0 0 0 var(--surface-border);

    &__right {
        display: flex;
        align-items: center;
        gap: 16px;
    }
}
</style>
