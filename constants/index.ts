import { type CheckboxProps } from "primevue/checkbox";
import { type RadioButtonProps } from "primevue/radiobutton";
import type { InputHTMLAttributes } from "vue";

export enum FieldType {
    INPUT,
    CHECKBOX,
    RADIO_BUTTON,
}

export interface InputField extends InputHTMLAttributes {
    fieldType: FieldType.INPUT;
    label?: string;
}
export type CheckboxField = CheckboxProps & {
    fieldType: FieldType.CHECKBOX;
};

export type RadioField = {
    label?: string;
    fieldType: FieldType.RADIO_BUTTON;
    radios: Array<RadioButtonProps>;
};
export type Field = InputField | CheckboxField | RadioField;
