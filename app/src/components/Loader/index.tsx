import { ModalOverlay, Spinner } from '@chakra-ui/core';

interface ILoader {
    show?: boolean;
}

export default (props: ILoader): JSX.Element => {

    if (!props.show) {
        return <div />
    }

    return (
        <ModalOverlay
            display='flex'
            justifyContent='center'
            alignItems='center'
            zIndex={9000}>
            <Spinner
                marginTop="24px"
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl" />
        </ModalOverlay>
    );
}