<template>
    <article class="form-basic rounded">
        <header v-if="props.header" class="form-basic__header border-bottom">
            {{ props.header }}
        </header>
        <div class="form-basic__body">
            <form
                v-bind="attrs"
                class="form-basic__form"
                @submit.prevent="emit('submit', $event)"
            >
                <template
                    v-for="(fieldValue, field) in props.fields"
                    :key="field"
                >
                    <UiFormInput
                        v-if="fieldValue.fieldType === FieldType.INPUT"
                        :model-value="values[field]"
                        @update:model-value="handleModelUpdate($event, field)"
                        :error="props.errors?.[field]"
                        v-bind="fieldValue"
                    />
                    <Checkbox
                        v-else-if="fieldValue.fieldType === FieldType.CHECKBOX"
                        class="form-basic__checkbox"
                        :model-value="values[field]"
                        @update:model-value="handleModelUpdate($event, field)"
                        :error="props.errors?.[field]"
                        v-bind="fieldValue"
                    />
                    <div
                        v-else-if="
                            fieldValue.fieldType === FieldType.RADIO_BUTTON
                        "
                        class="d-flex flex-column gap-2 form-basic__radio"
                    >
                        <label v-if="fieldValue.label">
                            {{ fieldValue.label }}
                        </label>
                        <div
                            v-for="(radio, index) in fieldValue.radios"
                            :key="index"
                            class="d-flex align-items-center gap-2"
                        >
                            <RadioButton
                                :model-value="values[field]"
                                @update:model-value="
                                    handleModelUpdate($event, field)
                                "
                                v-bind="radio"
                                :invalid="Boolean(errors?.[field])"
                            />
                            <label
                                v-if="radio.inputId && radio.name"
                                :for="radio.inputId"
                                >{{ radio.name }}
                            </label>
                        </div>
                    </div>
                </template>
                <Button
                    type="submit"
                    :loading="props.loading"
                    class="form-basic__action"
                    severity="primary"
                    rounded
                >
                    <slot name="button" />
                </Button>
            </form>
        </div>
    </article>
</template>

<script setup lang="ts" generic="T extends {[key: string]:any }">
import type Checkbox from "primevue/checkbox";
import { errorMessages } from "vue/compiler-sfc";
import { FieldType } from "~/constants/index";
import { type Field } from "~/constants/index";
type Props = {
    modelValue: T;
    fields: { [key in keyof T]: Field };
    errors?: { [key in keyof T]: string | undefined };
    header?: string;
    loading?: boolean;
};

type Emits = {
    "update:model-value": [T];
    "update:errors": [{ [key in keyof T]: string | undefined }];
    submit: [any];
};
const attrs = useAttrs();
const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const values = computed<T>({
    get() {
        return props.modelValue;
    },
    set(value) {
        emit("update:model-value", value);
    },
});

const errors = computed<{ [key in keyof T]: string | undefined } | undefined>({
    get() {
        return props.errors;
    },
    set(value) {
        if (value) emit("update:errors", value);
    },
});

const handleModelUpdate = (value: any, field: keyof T) => {
    values.value = { ...values.value, [field]: value };
    if (errors.value) errors.value = { ...errors.value, [field]: "" };
};
</script>

<style scoped lang="scss">
@use "~/assets/modules/mixins";
.form-basic {
    background-color: white;
    &__header {
        @include mixins.body-large-500;
        padding: 16px 24px;
    }
    &__body {
        padding: 32px;
    }
    &__checkbox,
    &__radio {
        & > label {
            @include mixins.body-regular-400();
        }
        label {
            @include mixins.body-regular-400;
        }
    }
    &__action {
        margin-top: 32px;
    }
}
</style>
