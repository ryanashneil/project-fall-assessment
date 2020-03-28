import React from 'react';
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Heading, Flex, Box } from '@chakra-ui/core';
import { color } from 'src/styles/tokens';
import { useStopwatch } from 'src/hooks/useStopwatch';
import StopWatchButton from 'src/components/Stopwatch/Button';

interface IModal extends React.Props<{}> {
    title: string;
    onSubmit: (secs: number) => void;
}

export default (props: IModal) => {

    const { isOpen, onOpen, onClose } = useDisclosure();

    const {
        isRunning,
        elapsedTime,
        startTimer,
        stopTimer,
        resetTimer
    } = useStopwatch();

    const { light, dark } = color.blue;

    const onSubmit = (): void => {
        props.onSubmit(Number(elapsedTime));
        resetTimer();
        onClose();
    }

    const closeStopWatch = (): void => {
        resetTimer();
        onClose();
    }

    const handleStartStop = () => {
        isRunning ? stopTimer() : startTimer();
    };

    return (
        <Box border='1px solid #E5EAF1' borderRadius='4px' padding='20px' margin='40px 0'>
            <Button leftIcon='time' variantColor='teal' onClick={onOpen} minWidth="none" marginBottom='24px'>
                Use a timer for this section
            </Button>
            {props.children}
            <Modal isOpen={isOpen} onClose={closeStopWatch} size='400px' closeOnOverlayClick={false}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader background={light} color={dark} fontSize='24px' mb='24px'>
                        {props.title}
                    </ModalHeader>
                    <ModalBody display='flex' flexDir='column' alignItems='center'>
                        <Heading fontSize='48px' marginBottom='40px'>{elapsedTime}s</Heading>
                        <Flex marginBottom='40px'>
                            <StopWatchButton disabled={elapsedTime === "0.0"} onClick={resetTimer}>
                                Reset
                            </StopWatchButton>
                            <Box mr='40px' />
                            <StopWatchButton status={isRunning ? "running" : "stopped"} onClick={handleStartStop}>
                                {isRunning ? "Stop" : "Start"}
                            </StopWatchButton>
                        </Flex>
                    </ModalBody>
                    <ModalFooter>
                        <Button variantColor='blue' onClick={onSubmit} mb='12px'>Use timing</Button>
                        <Button variant="ghost" onClick={closeStopWatch} mb='12px' ml={3}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
}