import { IConstraint } from './validation';

export interface IFormFunctions {
    setupFormFields: (schema: IFormSchema) => void;
    getField: (id: string) => IFormField;
    getValue: (id: string) => any;
    updateValue: (id: string, value: any) => void;
    applyMultipleValues: (values: { [key: string]: any }) => void;
    applyColoredFocusedBorders: (values: { [key: string]: any }) => void;
    validateValue: (id: string) => void;
    validateFormForSubmission: () => Promise<boolean>;
}

export interface IOption {
    label: string;
    value: any;
}

export interface IFormSchema {
    [id: string]: IBasicValueFormField | IBasicSelectFormField;
}

export interface IFormFieldHashMap {
    [id: string]: IFormField;
}

type TFieldType = 'text' | 'number' | 'email' | 'phone' | 'textarea';
type TWithOptionsType = 'select' | 'radio' | 'checkbox';

interface IBasicFormProperties {
    constraints?: IConstraint[];
    disableValidation?: boolean;
}

interface IFormProperties {
    id: string;
    value: any;
    error?: string;
}

export interface IBasicValueFormField extends IBasicFormProperties {
    type: TFieldType;
    name: string;
    placeholder?: string;
    focused?: boolean;
    helpText?: React.ReactNode | string;
}

export interface IBasicSelectFormField extends IBasicFormProperties {
    type: TWithOptionsType;
    name: string;
    placeholder?: string;
    helpText?: React.ReactNode | string;
    focused?: boolean;
    items: IOption[];
}

interface IValueFormField extends IBasicValueFormField, IFormProperties {}
interface ISelectFormField extends IBasicSelectFormField, IFormProperties {}

export type IFormField = IValueFormField | ISelectFormField;
