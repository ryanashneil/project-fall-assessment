import { Box, Text, Tag, Flex, Button } from '@chakra-ui/core';
import Router from 'next/router';
import { color } from 'src/styles/tokens';
import { ISenior } from 'src/db/interface';

interface IProps {
    senior: ISenior
    date: string;
}

interface IToken {
    score: number;
}

const FallRiskToken = (props: IToken) => {
    return <Text marginTop='2px'>Fall Risk {props.score}</Text>;
};

export default (props: IProps) => {
    const goToFP2 = async () => {
        await Router.push(`/fall-prevention-assessment?id=${props.senior.key}`);
    };

    let Action = (
        <Button onClick={goToFP2} variantColor='blue'>
            Start FP2
        </Button>
    );

    if (props.senior.score === 0) {
        Action = <Tag>FP2 not required</Tag>;
    } else if (props.senior.fp2Completed) {
        Action = <Button variantColor='teal'>Completed FP2</Button>;
    }

    return (
        <Flex
            borderBottom='1px solid #E5EAF1'
            padding='24px 0'
            direction={['column', 'column', 'row']}
            alignItems={['flex-start', 'flex-start', 'center']}
            justifyContent='space-between'
        >
            <Box>
                <Text fontSize='20px' fontWeight='bold' color={color.blue.dark}>
                    {props.senior.name}
                </Text>
                <FallRiskToken score={props.senior.score} />
                <Text
                    fontSize='14px'
                    color='gray.400'
                    marginTop='16px'
                    marginBottom={['16px', '16px', '0px']}
                >
                    Assessed on {props.date}
                </Text>
            </Box>
            {Action}
        </Flex>
    );
};
