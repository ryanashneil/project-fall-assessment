import { Flex, Image, Text } from "@chakra-ui/core";

interface IEmpty {
    message: string;
    imagePath: string;
}

export default (props: IEmpty) => (
    <Flex justifyContent="center" direction="column" alignItems="center">
        <Image maxWidth="400px" src={props.imagePath} />
        <Text fontSize="20px" marginTop="24px" fontWeight="medium">
            {props.message}
        </Text>
    </Flex>
);
