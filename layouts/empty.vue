<template>
    <section class="empty-container">
        <slot />
    </section>
</template>

<script setup lang="ts"></script>

<style scoped>
.empty-container {
    width: 100vw;
    height: 100vh;
    background-color: var(--color-background);
}
</style>
