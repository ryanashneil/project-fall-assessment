import { useEffect, useState } from 'react';
import { IFormFunctions } from './interfaces';

export const getFieldProps = (id: string, form: IFormFunctions, afterChangeCallback?: VoidFunction) => {

    const [performAfterChange, setPerformAfterChange] = useState<boolean>(false);

    useEffect(() => {
        if (performAfterChange && afterChangeCallback) {
            afterChangeCallback();
        }
        setPerformAfterChange(false);
    }, [performAfterChange]);

    const value = form.getValue(id);

    const blur = (): void => {
        form.validateValue(id);
    }

    const change = (newValue: any): void => {
        if (value !== newValue) {
            form.updateValue(id, newValue);
            setPerformAfterChange(true);
        }
    };

    return { value, blur, change };
}