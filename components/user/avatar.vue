<template>
    <Avatar
        :label="picture ? picture : petName?.[0] ?? name[0]"
        shape="circle"
        :image="picture ?? undefined"
        @click="menu.toggle($event)"
        class="user-avatar"
    />
    <Menu ref="menu" :model="menuItems" :popup="true">
        <template #item="{ item, props }">
            <NuxtLink
                v-if="item.route"
                :to="item.route"
                custom
                v-slot="{ href, navigate }"
            >
                <a
                    v-ripple
                    :href="href"
                    v-bind="props.action"
                    @click="navigate"
                >
                    <span :class="item.icon" />
                    <span class="ml-2">{{ item.label }}</span>
                </a>
            </NuxtLink>
            <a
                v-else-if="item.callback"
                v-ripple
                @click="item.callback()"
                v-bind="props.action"
            >
                <span :class="item.icon" />
                <span class="ml-2">{{ item.label }}</span>
            </a>
        </template>
    </Menu>
</template>

<script setup lang="ts">
import { PATHS } from "~/constants/route";

const { name, picture, petName }: JwtUser = await useAuth().getSession();

const { signOut } = useAuth();
const loginOut = () => {
    signOut({ callbackUrl: PATHS.login.path });
};

const menu = ref();
const menuItems = ref([
    {
        label: "Профиль",
        icon: "pi pi-user",
        route: {
            name: PATHS.user.name,
        },
    },
    {
        label: "Настройки",
        icon: "pi pi-cog",
        route: PATHS.settings,
    },
    {
        label: "Выйти",
        icon: "pi pi-sign-out",
        callback: loginOut,
    },
]);
</script>

<style scoped lang="scss">
.user-avatar {
    cursor: pointer;
    outline: solid 1px transparent;
    transition: all ease 0.3s;
    background-color: var(--avatar-background);
    color: var(--avatar-color);
    &:hover {
        outline-color: var(--primary-color);
    }
}
.ml-2 {
    margin-left: 8px;
}
</style>
