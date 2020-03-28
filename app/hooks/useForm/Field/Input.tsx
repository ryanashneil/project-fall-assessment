import React from 'react';

import { IFormFunctions } from 'hooks/useForm/interfaces';
import { FormControl, FormLabel, Input, Textarea } from '@chakra-ui/core';
import { getFieldProps } from '../utils';

interface IFieldInputProps {
    id: string;
    form: IFormFunctions;
    width?: string;
    onFocus?: (key: string) => void;
    onBlur?: (key: string) => void;
    onChange?: () => void;
}

const FieldInput = (props: IFieldInputProps): JSX.Element => {
    const { id, form, onChange } = props;
    const field = form.getField(id);

    if (!field) {
        return <div></div>;
    }

    const FieldElement = field.type === 'textarea' ? Textarea : Input;

    const { change, value, blur } = getFieldProps(id, form, onChange);

    const focus = (): void => {
        props.onFocus && props.onFocus(id);
    };

    return (
        <FormControl isInvalid={!!field.error} marginBottom='40px'>
            <FormLabel htmlFor={id} fontWeight='medium'>{field.name}</FormLabel>
            <FieldElement
                id={id}
                mt='4px'
                placeholder={field.placeholder}
                type={field.type === 'textarea' ? 'text' : field.type}
                aria-describedby={field.name}
                value={value}
                onChange={event => change(event.target.value)}
                onBlur={blur}
                onFocus={focus}
                width={props.width || '100%'}
            />
        </FormControl>
    );
}

export default FieldInput;