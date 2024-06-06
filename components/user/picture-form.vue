<template>
    <div
        class="user-picture-form d-flex flex-column align-items-center rounded"
    >
        <UserBaseAvatar
            :picture="picture"
            :pet-name="petName"
            :name="name"
            size="xlarge"
            class="user-picture-form__avatar"
        />

        <Button
            :disabled="picture === null"
            icon="pi pi-trash"
            severity="danger"
            rounded
            plain
            loading-icon="pi pi-spin pi-spinner"
            :loading="isLoading"
            label="Удалить фото"
            class="user-picture-form__button mb-3"
        />

        <Button
            icon="pi pi-upload"
            outlined
            rounded
            :loading="isLoading"
            loading-icon="pi pi-spin pi-spinner"
            label="Загрузить фото"
            class="user-picture-form__button"
            @click="callFileSelecting"
        />
        <input
            type="file"
            class="d-none"
            ref="fileInput"
            @input="imageUpload"
            accept="image/png, image/jpeg"
        />
        <span class="user-picture-form__text">
            <span>Обратите внимание:</span>
            Для лучшего результата, используйте картинку размерами 200px x 200px
            в .jpg или .png форматах.
        </span>
    </div>
</template>

<script setup lang="ts">
const { picture, petName, name, id }: JwtUser = await useAuth().getSession();

const response = async () => {
    try {
        await $fetch("/api/user", {
            method: "PUT",
            body: {
                id,
                picture,
            },
        });
    } catch ({ data }: any) {
        const issues: any = data?.data?.issues;
        if (issues) {
            issues.forEach((issue: any) => {
                console.error(issue);
            });
        }
    }
};
const { isLoading, execute } = useAsyncState(response, null, {
    immediate: false,
});

const fileInput = ref();

function callFileSelecting() {
    fileInput.value.click();
}

function imageUpload(event: any) {
    console.log(event.target.files[0]);
}
</script>

<style scoped lang="scss">
@use "~/assets/modules/mixins";
.user-picture-form {
    background-color: white;
    padding: 40px;
    &__avatar {
        width: 152px;
        height: 152px;
        margin-bottom: 36px;
    }
    &__button {
        width: 100%;
        margin-bottom: 24px;
    }
    &__text {
        span {
            color: var(--gray-900);
        }
        color: var(--gray-400);
        @include mixins.body-regular-400;
    }
}
</style>
