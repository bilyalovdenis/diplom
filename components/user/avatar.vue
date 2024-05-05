<template>
    <Avatar
        :label="!picture ? username[0] : undefined"
        shape="circle"
        :image="picture"
        style="background-color: #dee9fc; color: #1a2551"
    />
</template>

<script setup lang="ts">
const { username, picture } = await useAuth().getSession();
</script>

<style scoped></style>
