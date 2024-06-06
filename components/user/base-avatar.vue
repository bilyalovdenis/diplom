<template>
    <Avatar
        :label="
            props.picture ? props.picture : props.petName?.[0] ?? props.name[0]
        "
        shape="circle"
        :image="props.picture ?? undefined"
        class="base-avatar"
    />
</template>

<script setup lang="ts">
type Props = {
    picture: string | null;
    petName: string | null;
    name: string;
};
const props = defineProps<Props>();
</script>

<style scoped>
.base-avatar {
    background-color: var(--avatar-background);
    color: var(--avatar-color);
}
</style>
