<template>
    <div class="alternative-btns-container">
        <Button severity="secondary">
            <i class="pi pi-google"></i>
            Google
        </Button>
        <Button severity="secondary">
            <i class="pi pi-apple"></i>
            Apple
        </Button>
        <Button severity="secondary">
            <i class="pi pi-facebook"></i>
            Facebook
        </Button>
    </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
@use "~/assets/modules/mixins";
.alternative-btns-container {
    display: flex;
    gap: 12px;
    align-items: stretch;
    width: 100%;
    justify-content: center;
    & button {
        @include mixins.body-regular-400();
        display: flex;
        gap: 6px;
        justify-content: center;
        flex-basis: 33.3333333%;
        height: 40px;
    }
}
</style>
