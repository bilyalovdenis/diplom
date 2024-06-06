<template>
    <UiFormBasic
        :loading="isLoading"
        @submit="execute"
        header="Мои данные"
        :fields="contactFields"
        v-model="values"
        v-model:errors="errors"
    >
        <template #button> Сохранить </template>
    </UiFormBasic>
</template>

<script setup lang="ts">
import { FieldType, type Field } from "~/constants/index";

const { id, petName, name, petSex }: JwtUser = await useAuth().getSession();

const values = ref({
    name,
    petName,
    petSex: petSex ?? "null",
});

const contactFields = {
    name: {
        label: "Имя",
        fieldType: FieldType.INPUT,
        placeholder: "Введите Ваше имя",
    } as Field,
    petName: {
        label: "Кличка питомца",
        fieldType: FieldType.INPUT,
        placeholder: "Введите кличку питомца",
    } as Field,
    petSex: {
        label: "Пол питомца",
        fieldType: FieldType.RADIO_BUTTON,
        radios: [
            {
                value: "null",
                name: "Не указан",
                inputId: useId(),
            },
            {
                value: "female",
                name: "Женский",
                inputId: useId(),
            },
            {
                value: "male",
                name: "Мужской",
                inputId: useId(),
            },
        ],
    } as Field,
};

const errors = ref({
    name: "",
    petName: "",
    petSex: "",
});

const response = async () => {
    try {
        await $fetch<typeof values.value>("/api/user", {
            method: "PUT",
            body: {
                ...values.value,
                id,
                petSex:
                    values.value.petSex === "null" ? null : values.value.petSex,
            },
        });
    } catch ({ data }: any) {
        const issues: any = data?.data?.issues;
        if (issues) {
            issues.forEach((issue: any) => {
                const field: keyof typeof values.value = issue?.path?.[0];
                errors.value[field] = issue.message;
            });
        }
    }
};
const { isLoading, execute } = useAsyncState(response, null, {
    immediate: false,
});
</script>

<style scoped></style>
