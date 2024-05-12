<template>
    <main class="main-layout_main">
        <Breadcrumb :home="home" :model="breadcrumbs" class="breadcrumbs">
            <template #item="{ item, props }">
                <NuxtLink v-slot="{ href, navigate }" :to="item.route" custom>
                    <a
                        :href="href"
                        v-bind="props.action"
                        @click="navigate"
                        class="breadcrumbs__item utils-animation-underline"
                        :class="{
                            breadcrumbs__item_active: isExactActive(item as Breadcrumb),
                        }"
                    >
                        <span :class="[item.icon, 'text-color']" />
                        <span>{{ item.label }}</span>
                    </a>
                </NuxtLink>
            </template>
        </Breadcrumb>
        <slot />
    </main>
</template>

<script setup lang="ts">
import type { RouteParams, RouteRecordName } from "vue-router";
import { PATHS } from "~/constants/route";

type Breadcrumb = {
    label: string;
    route: string;
    params: RouteParams;
    name: RouteRecordName;
};

const route = useRoute();

const breadcrumbs = computed<Array<Breadcrumb>>(() => {
    return route.matched.reduce<Array<Breadcrumb>>(
        (acc, { meta, path, name }) => {
            if (!meta.breadcrumbName) return acc;
            return [
                ...acc,
                {
                    label: meta.breadcrumbName,
                    route: path,
                    params: { ...route.params },
                    name: name ?? "",
                },
            ];
        },
        []
    );
});

const home = computed(() => ({
    icon: "pi pi-home",
    route: PATHS.home.path,
    class: "home-icon",
    name: PATHS.home.name,
}));

const isExactActive = (breadcrumb: Breadcrumb): boolean => {
    return route.name === breadcrumb.name;
};
</script>

<style lang="scss">
@use "~/assets/modules/mixins";
.home-icon {
    margin-top: 5px;
}
.main-layout_main {
    grid-area: main;
    background-color: #f2f2f2;
    padding: 24px 40px;
    overflow: auto;
}
.breadcrumbs {
    padding: 0;
    margin-bottom: 25px;
    background-color: transparent;
    &__item {
        @include mixins.body-regular-400;
        color: var(--gray-500);
        text-decoration: none;
        &_active {
            color: var(--gray-900);
            pointer-events: none;

            &::after {
                content: "";
                width: 100%;
                height: 1px;
                display: block;
                background: currentColor;
            }
        }
    }
}
</style>
