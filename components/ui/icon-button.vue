<template>
    <Button text severity="contrast" class="ui-icon-button">
        <i
            v-if="badge"
            v-badge.danger
            class="pi"
            :class="icon"
            style="font-size: 1rem"
        />
        <i v-else class="pi" :class="icon" style="font-size: 1rem" />
        <!-- <i class="pi ui-icon-button__icon" :class="icon" v-badge.danger /> -->
    </Button>
</template>

<script setup lang="ts">
type Props = { icon: string; badge?: boolean };
const props = defineProps<Props>();

const { icon, badge } = toRefs(props);
</script>

<style lang="scss">
.ui-icon-button {
    width: 20px;
    height: 20px;
    padding: 1px;
}
</style>
