<template>
    <div class="form__input-container">
        <label for="username">{{ props.label }}</label>
        <InputText
            v-bind="$attrs"
            v-model="modelValue"
            :invalid="Boolean(error)"
            class="form__input-container__input"
        />
        <Transition name="fade">
            <small v-if="error" class="form__input-container__message">
                {{ error }}
            </small>
        </Transition>
    </div>
</template>

<script setup lang="ts">
type Props = { label?: string };
const props = withDefaults(defineProps<Props>(), {
    label: "",
});
const modelValue = defineModel<string>();
const error = defineModel<string | undefined>("error");

defineOptions({
    inheritAttrs: false,
});
</script>

<style scoped lang="scss">
@use "~/assets/modules/mixins";
.form__input-container {
    display: flex;
    flex-direction: column;
    gap: 6px;
    position: relative;
    width: 100%;
    margin-bottom: 16px;
    label {
        @include mixins.body-regular-400();
    }
}
.form__input-container__input {
    height: 40px;
}
.form__input-container__message {
    color: var(--red-500);
}
</style>
