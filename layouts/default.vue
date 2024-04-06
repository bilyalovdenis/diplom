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
#_main-layout {
    display: grid;
    min-height: 100vh;
    grid-template-areas:
        "header header header"
        "sidebar main main";
    grid-template-rows: 100px 1fr;
}
</style>
