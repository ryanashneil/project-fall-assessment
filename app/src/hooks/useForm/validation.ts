export type IInputValidatorNames =
    | 'isEmail'
    | 'isRequired'
    | 'isPhone'
    | 'isNumber';
export type IInputValidatorFunction = (value: string) => boolean | undefined;
export type IConstraint = [IInputValidatorNames, string];

type IValidationRule = {
    [key in IInputValidatorNames]: IInputValidatorFunction;
};

export const validateAgainstConstraints = async (
    value: any,
    constraints?: IConstraint[]
): Promise<string | undefined> => {
    if (constraints) {
        for (const constraint of constraints) {
            const [rule, errorMessage] = constraint;
            const checkForError = validationRule[rule];

            if (await checkForError(value)) {
                return errorMessage;
            }
        }
    }

    return undefined;
};

const isEmpty = (value?: string) => {
    return value === '' || value === undefined || value === null;
};

export const validationRule: IValidationRule = {
    isRequired: (value: string): boolean => {
        return isEmpty(value);
    },
    isEmail: (value: string): boolean => {
        const emailPattern = /(^$|(^([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$)/;
        return !isEmpty(value) && !emailPattern.test(value);
    },
    isPhone: (value: string): boolean => {
        const phonePattern = /(6|8|9)\d{7}/g;
        return !isEmpty(value) && !phonePattern.test(value);
    },
    isNumber: (value: string): boolean => {
        const numberPattern = /^[0-9]+$/;
        return !isEmpty(value) && !numberPattern.test(value);
    }
};
