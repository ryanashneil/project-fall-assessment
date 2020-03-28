import React from 'react';

import { IFormFunctions } from 'hooks/useForm/interfaces';
import { FormControl, FormLabel, Radio, RadioGroup, FormHelperText } from '@chakra-ui/core';
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

    if (field.type !== 'radio') {
        throw Error('Incompatible field type; Type must be [radio]');
    }

    const { change, value, blur } = getFieldProps(id, form, onChange);

    return (
        <FormControl isInvalid={!!field.error} marginBottom='40px'>
            <FormLabel htmlFor={id} fontWeight='medium'>{field.name}</FormLabel>
            {field.helpText && <FormHelperText marginBottom="24px">
                {field.helpText}
            </FormHelperText>}
            <RadioGroup
                id={id}
                mt='4px'
                value={value}
                placeholder={field.placeholder}
                aria-describedby={field.name}
                onChange={event => change(event.target.value)}
                isInline={props.inline}
                onBlur={blur}
            >
                {field.items.map(item => <Radio key={item.value} value={item.value}>{item.label}</Radio>)}
            </RadioGroup>
        </FormControl>
    );
}

export default FieldInput;