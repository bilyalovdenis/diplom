<template>
    <section id="_main-layout" class="main-layout">
        <DefaultLayoutHeader></DefaultLayoutHeader>
        <DefaultLayoutSidebar></DefaultLayoutSidebar>
        <DefaultLayoutMain>
            <slot />
        </DefaultLayoutMain>
    </section>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
#_main-layout.main-layout {
    display: grid;
    min-height: 100vh;
    grid-template-areas:
        "sidebar header header"
        "sidebar main main";
    grid-template-rows: 64px 1fr;
    grid-template-columns: 280px 1fr;
}
</style>
