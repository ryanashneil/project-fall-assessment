import React from 'react';

import { IFormFunctions } from 'hooks/useForm/interfaces';
import { FormControl, FormLabel, Checkbox, CheckboxGroup } from '@chakra-ui/core';
import { getFieldProps } from '../utils';

interface IFieldInputProps {
    id: string;
    form: IFormFunctions;
    inline?: boolean;
    onFocus?: (key: string) => void;
    onBlur?: (key: string) => void;
    onChange?: () => void;
}

export interface ISelectOption {
    label: string;
    value: any;
}

const FieldInput = (props: IFieldInputProps): JSX.Element => {
    const { id, form, onChange } = props;
    const field = form.getField(id);

    if (!field) {
        return <div></div>;
    }

    if (field.type !== 'checkbox') {
        throw Error('Incompatible field type; Type must be [checkbox]');
    }

    const { change, value, blur } = getFieldProps(id, form, onChange);

    return (
        <FormControl isInvalid={!!field.error} marginBottom='40px'>
            <FormLabel htmlFor={id} fontWeight='medium'>{field.name}</FormLabel>
            <CheckboxGroup
                id={id}
                mt='4px'
                value={value}
                placeholder={field.placeholder}
                aria-describedby={field.name}
                onChange={(value: string[]) => change(value)}
                isInline={props.inline}
                onBlur={blur}
            >
                {field.items.map(item => <Checkbox key={item.value} value={item.value}>{item.label}</Checkbox>)}
            </CheckboxGroup>
        </FormControl>
    );
}

export default FieldInput;