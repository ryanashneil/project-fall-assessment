import { Flex } from "@chakra-ui/core";
import Spinner from "..";

interface ISpinner {
    margin?: string;
}

export default (props: ISpinner) => {
    return (
        <Flex justifyContent="center" margin={props.margin || "0"}>
            <Spinner />
        </Flex>
    );
};
