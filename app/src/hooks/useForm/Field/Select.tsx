import React from 'react';

import { IFormFunctions } from 'src/hooks/useForm/interfaces';
import { FormControl, FormLabel, Select } from '@chakra-ui/core';

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

    const onBlurHandler = (): void => {
        form.validateValue(id);
    };

    const onChangeHandler = (event: any): void => {
        form.updateValue(id, event.target.value);
    };

    return (
        <FormControl isInvalid={!!field.error} marginBottom='40px'>
            <FormLabel htmlFor={id} fontWeight='medium'>{field.name}</FormLabel>
            <Select
                id={id}
                mt='4px'
                placeholder={field.placeholder}
                aria-describedby={field.name}
                onChange={onChangeHandler}
                onBlur={onBlurHandler}
                width={props.width}
            >
                {field.items.map(item => <option key={item.value} value={item.value}>{item.label}</option>)}
            </Select>
        </FormControl>
    );
}

export default FieldInput;