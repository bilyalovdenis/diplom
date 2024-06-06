<template>
    <Menu :model="props.items" class="menu-sidebar">
        <template #start>
            <MainHeader
                class="menu-sidebar__header"
                @click="useRouter().push('/')"
            />
        </template>
        <template #submenuheader="{ item }">
            <span class="menu-sidebar__submenu-header">{{ item.label }}</span>
        </template>
        <template #item="{ item, props }">
            <NuxtLink
                v-slot="{ href, navigate, isExactActive }"
                :to="item.link ?? '/'"
                custom
            >
                <a :href="href" @click="navigate">
                    <div
                        class="menu-sidebar__item"
                        :class="{
                            'menu-sidebar__item_active':
                                item.current || isExactActive,
                        }"
                        v-bind="props.action"
                        v-ripple
                    >
                        <span
                            class="menu-sidebar__item-icon"
                            :class="item.icon"
                        />
                        <span class="ml-2">{{ item.label }}</span>
                    </div>
                </a>
            </NuxtLink>
        </template>
    </Menu>
</template>

<script setup lang="ts">
import type { RouteLocationRaw } from "vue-router";

type MenuItemModel = {
    label: string;
    icon: string;
    link?: RouteLocationRaw;
    current?: boolean;
};

type MenuSectionModel = {
    label: string;
    items: Array<MenuItemModel>;
};

type Props = {
    items: Array<MenuSectionModel>;
};

const props = defineProps<Props>();
</script>

<style scoped lang="scss">
@use "~/assets/modules/mixins";

.menu-sidebar {
    display: flex;
    flex-direction: column;
    gap: 16px;
    border-radius: 0;
    height: 100%;
    a {
        text-decoration: none;
    }
    &__header {
        cursor: pointer;
        padding: 10px 10px;
        padding-bottom: 0;
    }
    &__submenu-header {
        @include mixins.label-regular;
        color: var(--gray-400);
    }
    &__item {
        @include mixins.body-regular-500;
        color: var(--gray-600);
        display: flex;
        gap: 12px;
        transition: all 0.3s ease;
        border-radius: 4px;
        background-color: var(--surface-0);
        align-items: center;
        .menu-sidebar__item-icon {
            transition: color 0.2s ease;
        }
        &_active {
            background-color: var(--gray-200);
            pointer-events: none;
        }
        &:hover {
            background-color: var(--gray-50);
        }
        &:hover,
        &_active {
            .menu-sidebar__item-icon {
                color: var(--primary-color);
            }
        }
    }
}
</style>
