import React from 'react';

import { IFormFunctions } from 'src/hooks/useForm/interfaces';
import { FormControl, FormLabel, Input, Textarea } from '@chakra-ui/core';

interface IFieldInputProps {
    id: string;
    form: IFormFunctions;
    width?: string;
    onFocus?: (key: string) => void;
    onBlur?: (key: string) => void;
    onChange?: (key: string, value: any) => void;
}

const FieldInput = (props: IFieldInputProps): JSX.Element => {
    const { id, form } = props;
    const field = form.getField(id);

    if (!field) {
        return <div></div>;
    }

    const FieldElement = field.type === 'textarea' ? Textarea : Input;

    const onBlurHandler = (event: any): void => {
        form.validateValue(id);
        props.onBlur && props.onBlur(id);
    };

    const onChangeHandler = (event: any): void => {
        form.updateValue(id, event.target.value);
        props.onChange && props.onChange(id, event.target.value);
    };

    const onFocusHandler = (): void => {
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
                value={field.value}
                onChange={onChangeHandler}
                onBlur={onBlurHandler}
                onFocus={onFocusHandler}
                width={props.width || '100%'}
            />
        </FormControl>
    );
}

export default FieldInput;