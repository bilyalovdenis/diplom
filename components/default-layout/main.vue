<template>
    <main class="main-layout_main">
        <slot />
    </main>
</template>

<script setup lang="ts"></script>

<style scoped>
.main-layout_main {
    grid-area: main;
    background-color: papayawhip;
}
</style>
