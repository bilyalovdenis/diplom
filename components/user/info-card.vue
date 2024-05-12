<template>
    <div class="user-info-card rounded">
        <div class="user-info-card__title border-bottom">Информация</div>
        <ul class="user-info-card__body">
            <li
                v-for="item in infoItems"
                :key="item.title"
                class="user-info-card__item"
            >
                <i :class="item.icon" />
                <div class="d-flex flex-column">
                    <span class="user-info-card__item-title">
                        {{ item.title }}
                    </span>
                    <span class="user-info-card__item-content">
                        {{ item.content }}
                    </span>
                </div>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
const { email, petSex, phone }: JwtUser = await useAuth().getSession();
const NOT_DEFINED = "Не указан";

const infoItems = computed(() => [
    {
        icon: "pi pi-envelope",
        title: "email",
        content: email,
    },
    {
        icon: "pi pi-phone",
        title: "Телефон",
        content: phone ?? NOT_DEFINED,
    },
    {
        icon: "pi pi-github",
        title: "Пол питомца",
        content: petSex ?? NOT_DEFINED,
    },
]);
</script>

<style scoped lang="scss">
@use "~/assets/modules/mixins";
.user-info-card {
    background-color: white;
    &__title {
        padding: 24px 16px;
        @include mixins.body-large-500;
    }
    &__body {
        margin: 0;
        padding: 24px;
        display: flex;
        flex-direction: column;
        gap: 24px;
    }
    &__item {
        list-style-type: none;
        display: flex;
        gap: 12px;
        i {
            color: var(--primary-color);
            font-size: 24px;
        }
    }
    &__item-title {
        @include mixins.label-regular;
        text-transform: uppercase;
        color: var(--gray-400);
    }
    &__item-content {
        @include mixins.body-large-400;
        color: var(--gray-900);
    }
}
</style>
