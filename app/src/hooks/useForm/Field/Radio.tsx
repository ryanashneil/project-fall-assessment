import React from 'react';

import { IFormFunctions } from 'src/hooks/useForm/interfaces';
import { FormControl, FormLabel, Radio, RadioGroup, FormHelperText } from '@chakra-ui/core';

interface IFieldInputProps {
    id: string;
    form: IFormFunctions;
    inline?: boolean;
    onFocus?: (key: string) => void;
    onBlur?: (key: string) => void;
    onChange?: (key: string, value: any) => void;
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

    if (field.type !== 'radio') {
        throw Error('Incompatible field type; Type must be [radio]');
    }

    const onBlurHandler = (): void => {
        form.validateValue(id);
    };

    const onChangeHandler = (event: any): void => {
        form.updateValue(id, event.target.value);
        props.onChange && props.onChange(id, event.target.value);
    };

    return (
        <FormControl isInvalid={!!field.error} marginBottom='40px'>
            <FormLabel htmlFor={id} fontWeight='medium'>{field.name}</FormLabel>
            {field.helpText && <FormHelperText marginBottom="24px">
                {field.helpText}
            </FormHelperText>}
            <RadioGroup
                id={id}
                mt='4px'
                value={field.value}
                placeholder={field.placeholder}
                aria-describedby={field.name}
                onChange={onChangeHandler}
                isInline={props.inline}
                onBlur={onBlurHandler}
            >
                {field.items.map(item => <Radio key={item.value} value={item.value}>{item.label}</Radio>)}
            </RadioGroup>
        </FormControl>
    );
}

export default FieldInput;