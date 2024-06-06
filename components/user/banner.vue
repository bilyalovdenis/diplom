<template>
    <div class="user-banner rounded">
        <div class="user-banner__image"></div>
        <div class="user-banner__panel">
            <div class="d-flex align-items-end gap-3">
                <UserBaseAvatar
                    :picture="picture"
                    :pet-name="petName"
                    :name="name"
                    size="xlarge"
                    class="user-banner__avatar"
                />
                <div class="user-banner__name-container">
                    <span class="user-banner__main-name">
                        {{ petName ?? name }}
                    </span>
                    <span class="user-banner__second-name" v-if="petName">
                        Родитель: {{ name }}
                    </span>
                </div>
            </div>
            <div v-if="created_at" class="user-banner__fun-fact">
                <span>{{ useFormat(created_at, "MM/dd/yyyy") }}</span>
                <span>Дата регистрации</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const { name, petName, picture, created_at }: JwtUser =
    await useAuth().getSession();
</script>

<style scoped lang="scss">
@use "~/assets/modules/mixins";
.user-banner {
    overflow: hidden;
    &__image {
        background-image: url("/user-banner-image.png");
        height: 62.5%;
    }
    &__panel {
        display: flex;
        align-items: end;
        justify-content: space-between;
        background-color: var(--surface-0);
        height: 37.5%;
        padding: 0 40px;
        padding-bottom: 36px;
    }
    &__avatar {
        height: 180px;
        font-size: 62px;
        width: 180px;
    }
    &__name-container {
        display: flex;
        flex-direction: column;
        gap: 4px;
    }
    &__main-name {
        @include mixins.heading-05;
        color: var(--gray-900);
    }
    &__second-name {
        @include mixins.body-large-400;
        color: var(--gray-600);
    }
    &__fun-fact {
        display: flex;
        flex-direction: column;
        gap: 8px;

        & span:first-child {
            @include mixins.body-xtra-large-500;
            color: var(--gray-900);
        }
        & span:last-child {
            color: var(--gray-600);
            @include mixins.body-regular-400;
        }
    }
}
</style>
