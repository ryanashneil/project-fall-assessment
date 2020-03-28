import React from 'react';
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, SimpleGrid, Box, useDisclosure } from '@chakra-ui/core';
import { useForm, Field, IFormSchema } from 'src/hooks/useForm';
import { color } from 'src/styles/tokens';
import FP1 from './FallRiskAssessment1';
import { addSenior } from 'src/db/api';

const NAME = 'name';
const NRIC = 'nric';
const POSTAL_CODE = 'postalCode';
const LANGUAGES = 'languages';
const ADDRESS = 'address';
const ETHNICITY = 'ethnicity';
const GENDER = 'gender';

const schema: IFormSchema = {
    [NAME]: { name: 'Name', type: 'text', },
    [NRIC]: { name: 'NRIC', type: 'text', },
    [ADDRESS]: { name: 'Address', type: 'text', },
    [POSTAL_CODE]: { name: 'Postal Code', type: 'text', },
    [GENDER]: {
        name: 'Gender', type: 'radio', items: [
            { label: 'Male', value: 'Male' },
            { label: 'Female', value: 'Female' }
        ]
    },
    [ETHNICITY]: {
        name: 'Ethnicity',
        placeholder: 'Select ethnicity',
        type: 'select',
        items: [
            { label: 'Chinese', value: 'Chinese' },
            { label: 'Malay', value: 'Malay' },
            { label: 'Tamil', value: 'Tamil' }
        ]
    },
    [LANGUAGES]: {
        name: 'Spoken Languages',
        type: 'checkbox',
        items: [
            { label: 'English', value: 'English' },
            { label: 'Mandarin', value: 'Mandarin' },
            { label: 'Malay', value: 'Malay' },
            { label: 'Tamil', value: 'Tamil' }
        ]
    },

}

interface IModal {
    onSubmit: () => void;
}

export default (props: IModal) => {

    const form = useForm(schema);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { light, dark } = color.blue;

    const onSubmit = async (score: number): Promise<void> => {
        addSenior({
            name: form.getValue(NAME),
            fp2Completed: false,
            score
        });
        props.onSubmit();
        onClose();
    }

    return (
        <>
            <Button leftIcon='add' variantColor='blue' onClick={onOpen} minWidth="none">
                Add assessment
            </Button>
            <Modal isOpen={isOpen} onClose={onClose} size='600px' closeOnOverlayClick={false}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader background={light} color={dark} fontSize='24px' mb='24px'>
                        Add assessment
                    </ModalHeader>
                    <ModalBody>
                        <SimpleGrid columns={[1, 1, 2]} spacing={[2, 2, 4]}>
                            <Field.Input form={form} id={NAME} />
                            <Field.Input form={form} id={NRIC} />
                            <Field.Radio form={form} id={GENDER} />
                            <Box display={['none', 'none', 'block']} />
                            <Field.Input form={form} id={ADDRESS} />
                            <Field.Input form={form} id={POSTAL_CODE} />
                            <Field.Select form={form} id={ETHNICITY} />
                            <Field.Checkbox form={form} id={LANGUAGES} />
                        </SimpleGrid>
                    </ModalBody>
                    <ModalFooter>
                        <FP1 onSubmit={onSubmit} />
                        <Button variant="ghost" onClick={onClose} mb='12px' ml={3}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}