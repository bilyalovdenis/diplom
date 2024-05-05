<template>
    <IconField iconPosition="left">
        <InputIcon class="pi pi-search" />
        <InputText v-model="search" placeholder="Поиск" />
    </IconField>
</template>

<script setup lang="ts">
const search = ref();
</script>

<style scoped></style>
