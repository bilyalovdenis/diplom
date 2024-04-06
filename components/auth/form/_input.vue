<template>
    <div class="auth-form__input-container">
        <label for="username">{{ props.label }}</label>
        <InputText
            v-model="modelValue"
            :placeholder="props.placeholder"
            :invalid="isError"
            class="auth-form__input-container__input"
        />
        <Transition name="fade">
            <InlineMessage
                v-if="isError"
                class="auth-form__input-container__message"
            >
                {{ error }}
            </InlineMessage>
        </Transition>
    </div>
</template>

<script setup lang="ts">
type Props = { label?: string; placeholder?: string };
const props = withDefaults(defineProps<Props>(), { label: "" });
const modelValue = defineModel<string>();
const isError = defineModel<boolean>("isError");
const error = defineModel<string>("error");
</script>

<style scoped lang="scss">
@use "~/assets/modules/mixins";
.auth-form__input-container {
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
.auth-form__input-container__input {
    height: 40px;
}
.auth-form__input-container__message {
    position: absolute;
    bottom: 0;
    right: 0;
    transform: translateX(120%);
}
</style>
