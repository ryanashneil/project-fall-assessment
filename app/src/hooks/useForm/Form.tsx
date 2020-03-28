import { useState, useEffect } from 'react';
import { validateAgainstConstraints } from './validation';
import { IFormFunctions, IFormSchema, IBasicValueFormField, IFormFieldHashMap, IFormField, IBasicSelectFormField } from './interfaces';

export const useForm = (schema?: IFormSchema): IFormFunctions => {

    const [fields, updateForm] = useState<IFormFieldHashMap>({});
    const [snapshot, updateSnapshot] = useState<IFormFieldHashMap>({});

    useEffect(() => setupFormFields(schema), []);

    const setupFormFields = (schema: IFormSchema): void => {
        if (schema) {
            const formFields: IFormFieldHashMap = {};
            const fieldKeys = Object.keys(schema);

            for (const id of fieldKeys) {
                const basicField: IBasicValueFormField | IBasicSelectFormField = schema[id];
                formFields[id] = { ...basicField, id, value: '', error: '' };
            };

            updateForm(formFields);
            updateSnapshot(formFields);
        }
    };

    const applyMultipleValues = async (values: { [key: string]: any }) => {
        const updatedFields = { ...fields };
        for (const key in values) {
            console.log(key);
            updatedFields[key].value = values[key];
        }
        updateForm(updatedFields);
    }

    const applyColoredFocusedBorders = (values: { [key: string]: any }) => {
        const updatedFields = { ...fields };
        for (const key in values) {
            updatedFields[key].focused = values[key];
        }
        updateForm(updatedFields);
    }

    const getField = (id: string): IFormField => {
        return fields[id];
    };

    const getValue = (id: string): any => {
        return fields[id].value;
    };

    const updateValue = (id: string, value: any): void => {
        updateForm(_updateField(fields, id, { value }));
    };

    const validateValue = async (id: string): Promise<void> => {
        const { value, constraints } = fields[id];
        const error = await validateAgainstConstraints(value, constraints);
        updateForm(_updateField(fields, id, { error }));
    };

    const validateFormForSubmission = async (): Promise<boolean> => {
        let validationSuccess: boolean = true;
        let validatedFields: IFormFieldHashMap = fields;

        for (const id of Object.keys(fields)) {
            const { value, constraints } = fields[id];
            const error = await validateAgainstConstraints(value, constraints);
            validatedFields = _updateField(validatedFields, id, { error });
            if (error) validationSuccess = false;
        };

        updateForm(validatedFields);
        return validationSuccess;
    };

    return { applyColoredFocusedBorders, applyMultipleValues, setupFormFields, getField, getValue, updateValue, validateValue, validateFormForSubmission };
};

const _updateField = (fields: IFormFieldHashMap, id: string, updatedValue: object): IFormFieldHashMap => {
    return {
        ...fields,
        [id]: { ...fields[id], ...updatedValue }
    };
};

const _checkChanges = (fields: IFormFieldHashMap, snapshot: IFormFieldHashMap): boolean => {
    for (const id of Object.keys(fields)) {
        if (fields[id].value !== snapshot[id].value) {
            return true;
        }
    }
    return false;
};