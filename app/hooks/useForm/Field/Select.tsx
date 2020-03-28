import React from 'react';

import { IFormFunctions } from 'hooks/useForm/interfaces';
import { FormControl, FormLabel, Select } from '@chakra-ui/core';
import { getFieldProps } from '../utils';

interface IFieldInputProps {
    id: string;
    form: IFormFunctions;
    width?: string;
}

export interface ISelectOption {
    label: string;
    value: any;
}

const FieldInput = (props: IFieldInputProps): JSX.Element => {
    const { id, form } = props;
    const field = form.getField(id);

    if (!field) {
        return <div></div>;
    }

    if (field.type !== 'select') {
        throw Error('Incompatible field type; Type must be [select]');
    }

    const { change, value, blur } = getFieldProps(id, form);

    return (
        <FormControl isInvalid={!!field.error} marginBottom='40px'>
            <FormLabel htmlFor={id} fontWeight='medium'>{field.name}</FormLabel>
            <Select
                id={id}
                mt='4px'
                placeholder={field.placeholder}
                value={value}
                aria-describedby={field.name}
                onChange={event => change(event.target.value)}
                onBlur={blur}
                width={props.width}
            >
                {field.items.map(item => <option key={item.value} value={item.value}>{item.label}</option>)}
            </Select>
        </FormControl>
    );
}

export default FieldInput;