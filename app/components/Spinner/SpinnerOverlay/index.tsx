import { ModalOverlay } from "@chakra-ui/core";
import Spinner from "..";

export default () => {
    return (
        <ModalOverlay
            display="flex"
            justifyContent="center"
            alignItems="center"
            zIndex={900000}
        >
            <Spinner />
        </ModalOverlay>
    );
};
