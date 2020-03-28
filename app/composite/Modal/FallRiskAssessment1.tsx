import React from 'react';
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Box, useDisclosure, Heading, List, ListItem, Text } from '@chakra-ui/core';
import { useForm, Field, IFormSchema } from 'hooks/useForm';
import { color } from 'styles/tokens';

const FALL = 'fall';
const ADL = 'adl';
const BALANCE = 'balance';

const schema: IFormSchema = {
    [FALL]: {
        name: 'What is the number of falls in the past 12 months',
        type: 'radio',
        items: [
            { label: 'None', value: "0" },
            { label: '1 Fall', value: "1" },
            { label: '2 Falls', value: "2" },
            { label: '3 or more', value: "3" }
        ]
    },
    [ADL]: {
        name: 'Prior to this fall, how much assistance was the individual requiring for instrumental activities of living (e.g. cooking, housework, laundry)?',
        helpText: 'If no fall in last 12 months, rate current function',
        type: 'radio',
        items: [
            { label: 'None (completely independent)', value: "0" },
            { label: 'Supervision', value: "1" },
            { label: 'Some assistance required', value: "2" },
            { label: 'Completely dependent', value: "3" }
        ]
    },
    [BALANCE]: {
        name: 'When walking and turning, does the person appear unsteady or at risk of losing their balance',
        helpText: (
            <List as="ul">
                <ListItem marginBottom="8px">Observe the person standing, walking a few metres, turning and sitting. If the person uses an aid, observe the person with the aid. Do not base on self-report.</ListItem>
                <ListItem>If level fluctuates, select the most unsteady rating. If the person is unable to walk due to injury, score as 3.</ListItem>
            </List>
        ),
        type: 'radio',
        items: [
            { label: 'No unsteadiness', value: "0" },
            { label: 'Minimally unsteady', value: "1" },
            { label: 'Moderately unsteady', value: "2" },
            { label: 'Severely unsteady', value: "3" }
        ]
    }
}

interface IModal {
    onSubmit: (score: number) => void;
    name?: string;
}

export default (props: IModal) => {

    const form = useForm(schema);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const onSubmit = async (): Promise<void> => {
        props.onSubmit(3);
        onClose();
    }

    const { light, dark } = color.blue;

    return (
        <>
            <Button variantColor='blue' onClick={onOpen} minWidth="none">
                Start Fall Risk Assessment 1
            </Button>
            <Modal isOpen={isOpen} onClose={onClose} size='600px' closeOnOverlayClick={false}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader background={light} color={dark} fontSize='24px' mb='24px'>
                        Fall Risk Assessment Level 1 {props.name && <>for {props.name}</>}
                    </ModalHeader>
                    <ModalBody>
                        <Button leftIcon='arrow-back' onClick={onClose} marginBottom="40px">Go Back</Button>
                        <Heading fontSize="20px" mb="16px" color='blue.500'>Fall History</Heading>
                        <Field.Radio form={form} id={FALL} />
                        <Heading fontSize="20px" mb="16px" mt="40px" color='blue.500'>Function: ADL Status</Heading>
                        <Field.Radio form={form} id={ADL} />
                        <Heading fontSize="20px" mb="16px" mt="40px" color='blue.500'>Balance</Heading>
                        <Field.Radio form={form} id={BALANCE} />
                        <Box marginTop="40px" />
                        <Text fontWeight="bold" color="red.500">Total Risk Score: 3</Text>
                        <Text fontWeight="bold" color="red.500">Grade: HIGH RISK</Text>
                    </ModalBody>
                    <ModalFooter>
                        <Button marginBottom='12px' variantColor="blue" mr={3} onClick={onSubmit}>Submit</Button>
                        <Button variant="ghost" onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}