import Segment from "components/Segment";
import { color } from 'styles/tokens';
import Router, { useRouter } from 'next/router';
import { Button, Flex, Text, Box, Heading, Link, Icon, AvatarGroup, Avatar } from "@chakra-ui/core";
import { IFormSchema, useForm, Field } from "hooks/useForm";
import { updateSeniorFP2, getSenior } from 'db/api';
import { useState, useEffect } from 'react';
import { ISenior } from 'db/interface';
import Timer from "composite/Modal/Timer";

const BP_LYING = 'bpLying';
const BP_SITTING = 'bpSitting';
const PULSE = 'pulse';
const AMT = 'AMT';
const HEIGHT = 'height';
const WEIGHT = 'weight';
const OSTEOPOROTIC = 'osteoporotic';
const HIP = 'hip';
const LOG_MAR = 'LogMAR';
const STEREOSCOPIC = 'stereoscopic';
const CONTRAST = 'contrast';
const SIDE_BY_SIDE = 'sideBySide';
const SEMI_TANDEM = 'semiTandem';
const TANDEM = 'tandem';
const FOUR_METERS = 'meters';
const GAIT_SPEED = 'gaitSpeed';
const CHAIR_STAND = 'chairStand';
const CHAIR_STAND_REPEAT = 'chairStandRepeat';
const CHAIR_STAND_TIME = 'chairStandTime';
const ELIGIBLE = 'eligible';
const ZONE = 'zone';

const schema: IFormSchema = {
    [BP_LYING]: { name: 'BP (Lying)', type: 'number' },
    [BP_SITTING]: { name: 'BP (Sitting/Standing)', type: 'number' },
    [PULSE]: { name: 'Pulse', type: 'number' },
    [AMT]: { name: 'AMT (out of 10)', type: 'number' },
    [HEIGHT]: { name: 'Height (cm)', type: 'number' },
    [WEIGHT]: { name: 'Weight (kg)', type: 'number' },
    [OSTEOPOROTIC]: { name: '% Risk for Major Osteoporotic Fractures', type: 'number' },
    [HIP]: { name: '% Risk for Hip Fractures', type: 'number' },
    [LOG_MAR]: {
        name: 'LogMAR Vision', type: 'radio', items: [
            { label: 'Pass', value: 'pass' },
            { label: 'Fail', value: 'fail' },
        ]
    },
    [STEREOSCOPIC]: {
        name: 'Stereoscopic Vision', type: 'radio', items: [
            { label: 'Pass', value: 'pass' },
            { label: 'Fail', value: 'fail' },
        ]
    },
    [CONTRAST]: {
        name: 'Contrast Sensitivity', type: 'radio', items: [
            { label: 'Pass', value: 'pass' },
            { label: 'Fail', value: 'fail' },
        ]
    },
    [SIDE_BY_SIDE]: {
        name: '1A) Side-by-Side Stand',
        helpText: 'Feet together side-by-side for 10 seconds and hold the position',
        type: 'radio',
        items: [
            { label: '10s', value: '2' },
            { label: '< 10s', value: '1' },
            { label: 'Unable', value: '0' }
        ]
    },
    [SEMI_TANDEM]: {
        name: '1B) Semi-Tandem Stand',
        helpText: 'Heel of one foot against side of big toe of the other for 10 seconds',
        type: 'radio',
        items: [
            { label: '10s', value: '2' },
            { label: '< 10s', value: '1' },
            { label: 'Unable', value: '0' }
        ]
    },
    [TANDEM]: {
        name: '1C) Tandem Stand',
        helpText: 'Feet aligned heel to toe for 10 seconds and hold the position',
        type: 'radio',
        items: [
            { label: '10s', value: '3' },
            { label: '3s - 9.99s', value: '2' },
            { label: '< 3s', value: '1' },
            { label: 'Unable', value: '0' }
        ]
    },
    [FOUR_METERS]: {
        name: '2A) Measure the time required to walk 4 meters at a normal pace',
        type: 'radio',
        items: [
            { label: '< 4.82s', value: '4' },
            { label: '4.82s - 6.20s', value: '3' },
            { label: '6.21s - 8.70s', value: '2' },
            { label: '> 8.70s', value: '1' },
            { label: 'Requires Assistance', value: '0' }
        ]
    },
    [GAIT_SPEED]: { name: '2B) Gait Speed (m/sec)', type: 'number' },
    [CHAIR_STAND]: {
        name: '3A) Single Chair Stand Test: Pre-test',
        helpText: 'Participant must fold his/her arms across his/her chest and try to stand up once from a chair',
        type: 'radio',
        items: [
            { label: 'Able', value: 'able' },
            { label: 'Unable', value: 'unable' },
        ]
    },
    [CHAIR_STAND_REPEAT]: {
        name: '3B) Repeated Chair Stand Test',
        helpText: 'Measure the time required to perform five (5) rises from a chair to an upright position as fast as possible without the use of arms.',
        type: 'radio',
        items: [
            { label: '< 11.19s', value: '4' },
            { label: '11.20s - 13.69s', value: '3' },
            { label: '13.70s - 16.69s', value: '2' },
            { label: '16.70s - 59s', value: '1' },
            { label: '> 60s', value: '0' }
        ]
    },
    [CHAIR_STAND_TIME]: { name: '3C) Exact Time Taken (s)', type: 'number' },
    [ELIGIBLE]: { name: '', type: 'checkbox', items: [{ label: 'Eligible to be referred', value: 'eligible' }] },
    [ZONE]: {
        name: 'Zone',
        placeholder: 'Select Zone',
        type: 'select',
        items: [
            { label: 'Bukit Merah', value: 'Bukit Merah' },
            { label: 'Tampines', value: 'Tampines' },
            { label: 'Simei', value: 'Simei' },
            { label: 'Pasir Ris', value: 'Pasir Ris' },
            { label: 'Bedok', value: 'Bedok' },
            { label: 'Eunos', value: 'Eunos' },
            { label: 'Paya Lebar', value: 'Paya Lebar' },
            { label: 'Sembawang', value: 'Sembawang' },
            { label: 'Jurong', value: 'Jurong' }
        ]
    },

}


export default () => {

    const form = useForm(schema);
    const [BMI, setBMI] = useState([0, '(Not Applicable)'])
    const [senior, setSenior] = useState<ISenior | undefined>(undefined);
    const { id } = useRouter().query;

    useEffect(() => void loadData(), [id])

    const loadData = async () => {
        setSenior(await getSenior(id as string));
    }

    const goBackToHome = async () => {
        await Router.push('/');
    }

    const submit = async () => {
        await updateSeniorFP2(id as string, true);
        await Router.push('/');
    }

    const time1A = (seconds: number) => {
        if (seconds >= 10) {
            form.applyMultipleValues({ [SIDE_BY_SIDE]: '2' });
        }
        else if (seconds < 10) {
            form.applyMultipleValues({ [SIDE_BY_SIDE]: '1' });
        }
    }

    const time1B = (seconds: number) => {
        if (seconds >= 10) {
            form.applyMultipleValues({ [SEMI_TANDEM]: '2' });
        }
        else if (seconds < 10) {
            form.applyMultipleValues({ [SEMI_TANDEM]: '1' });
        }
    }

    const time1C = (seconds: number) => {
        if (seconds >= 10) {
            form.applyMultipleValues({ [TANDEM]: '3' });
        }
        else if (seconds >= 3 && seconds < 10) {
            form.applyMultipleValues({ [TANDEM]: '2' });
        }
        else if (seconds < 3) {
            form.applyMultipleValues({ [TANDEM]: '1' });
        }
    }

    const calcBMI = () => {
        const weight = form.getValue(WEIGHT);
        const height = form.getValue(HEIGHT);

        console.log('weight', weight);
        console.log('height', height);

        if (!weight || !height) {
            setBMI([0, '(Not Applicable)']);
        }
        else {
            const val = (Number(weight) / ((Number(height) / 100) * (Number(height) / 100)));
            setBMI([val.toFixed(1), val > 25 ? '(UNHEALTHY)' : '(NORMAL)']);
        }
    }

    const time2 = (seconds: number) => {
        if (seconds < 4.82) {
            form.applyMultipleValues({
                [FOUR_METERS]: '4',
                [GAIT_SPEED]: String(seconds / 4)
            });
        }
        else if (seconds >= 4.82 && seconds < 6.2) {
            form.applyMultipleValues({
                [FOUR_METERS]: '3',
                [GAIT_SPEED]: String(seconds / 4)
            });
        }
        else if (seconds >= 6.2 && seconds < 8.7) {
            form.applyMultipleValues({
                [FOUR_METERS]: '2',
                [GAIT_SPEED]: String(seconds / 4)
            });
        }
        else if (seconds >= 8.7) {
            form.applyMultipleValues({
                [FOUR_METERS]: '1',
                [GAIT_SPEED]: String(seconds / 4)
            });
        }
    }

    const time3 = (seconds: number) => {
        if (seconds < 11.19) {
            form.applyMultipleValues({
                [CHAIR_STAND]: 'able',
                [CHAIR_STAND_REPEAT]: '4',
                [CHAIR_STAND_TIME]: String(seconds)
            });
        }
        else if (seconds >= 11.20 && seconds < 13.69) {
            form.applyMultipleValues({
                [CHAIR_STAND]: 'able',
                [CHAIR_STAND_REPEAT]: '3',
                [CHAIR_STAND_TIME]: String(seconds)
            });
        }
        else if (seconds >= 13.70 && seconds < 16.69) {
            form.applyMultipleValues({
                [CHAIR_STAND]: 'able',
                [CHAIR_STAND_REPEAT]: '2',
                [CHAIR_STAND_TIME]: String(seconds)
            });
        }
        else if (seconds >= 16.70 && seconds < 60) {
            form.applyMultipleValues({
                [CHAIR_STAND]: 'able',
                [CHAIR_STAND_REPEAT]: '1',
                [CHAIR_STAND_TIME]: String(seconds)
            });
        }
        else if (seconds >= 60) {
            form.applyMultipleValues({
                [CHAIR_STAND]: 'able',
                [CHAIR_STAND_REPEAT]: '0',
                [CHAIR_STAND_TIME]: String(seconds)
            });
        }
    }


    if (!senior) {
        return <div />;
    }

    return (
        <div>
            <Box position='fixed' width='100%' zIndex={5}>
                <Segment background={color.blue.light}>
                    <Box padding="24px 0">
                        <Text color={color.blue.dark} fontWeight="bold" fontSize="20px">Fall Risk Assessment Level 2</Text>
                        <Text color={color.blue.dark} fontSize="16px">{senior.name} (S1234567A)</Text>
                    </Box>
                </Segment>
            </Box>
            <Segment paddingTop={20} paddingBottom={30} borderBottom={true}>
                <Box marginTop="160px" />
                <Button marginBottom="40px" leftIcon='arrow-back' onClick={goBackToHome}>Back to home</Button>
                <Heading fontSize="20px" mb="24px" color='blue.500'>Postural Blood Pressure</Heading>
                <Flex>
                    <Field.Input form={form} id={BP_LYING} width="100px" />
                    <Box width="24px" />
                    <Field.Input form={form} id={BP_SITTING} width="100px" />
                </Flex>
                <Flex>
                    <Field.Input form={form} id={PULSE} width="100px" />
                    <Box width="24px" />
                    <Field.Input form={form} id={AMT} width="100px" />
                </Flex>
            </Segment>
            <Segment paddingTop={40} paddingBottom={30} borderBottom={true}>
                <Heading fontSize="20px" mb="24px" color='blue.500'>Height, Weight & BMI</Heading>
                <Flex>
                    <Field.Input form={form} id={HEIGHT} width="100px" onChange={calcBMI} />
                    <Box width="24px" />
                    <Field.Input form={form} id={WEIGHT} width="100px" onChange={calcBMI} />
                </Flex>
                <Heading fontSize="16px" marginBottom="24px">BMI: {BMI[0]} {BMI[1]}</Heading>
            </Segment>
            <Segment paddingTop={40} paddingBottom={30} borderBottom={true}>
                <Heading fontSize="20px" mb="8px" color='blue.500'>Fracture Risk Assessment</Heading>
                <Link color='blue.500' textDecoration="underline" href='https://www.sheffield.ac.uk/FRAX/tool.aspx?country=35' isExternal={true}>
                    https://www.sheffield.ac.uk/FRAX/tool.aspx?country=35 <Icon name="external-link" mx="2px" />
                </Link>
                <Box mb="24px" />
                <Field.Input form={form} id={OSTEOPOROTIC} width='60px' />
                <Field.Input form={form} id={HIP} width='60px' />
            </Segment>
            <Segment paddingTop={40} paddingBottom={30} borderBottom={true}>
                <Heading fontSize="20px" mb="24px" color='blue.500'>Vision Function Tests</Heading>
                <Field.Radio form={form} id={LOG_MAR} />
                <Field.Radio form={form} id={STEREOSCOPIC} />
                <Field.Radio form={form} id={CONTRAST} />
            </Segment>
            <Segment paddingTop={40} paddingBottom={30} borderBottom={true}>
                <Heading fontSize="20px" mb="24px" color='blue.500'>Short Physical Performance Battery — SPPB</Heading>
                <Heading fontSize="16px" mb="16px" color='blue.500'>Balance Test</Heading>
                <Timer title='Balance Test: Side-by-side Stand' onSubmit={time1A}>
                    <Field.Radio form={form} id={SIDE_BY_SIDE} />
                    <Heading fontSize="14px" mb="16px" fontWeight='light'>*Note: If unable to do 1A, please proceed to Test 2 - Gait Speed Test</Heading>
                </Timer>
                <Timer title='Balance Test: Semi-Tandem Stand' onSubmit={time1B}>
                    <Field.Radio form={form} id={SEMI_TANDEM} />
                </Timer>
                <Timer title='Balance Test: Tandem Stand' onSubmit={time1C}>
                    <Field.Radio form={form} id={TANDEM} />
                </Timer>
                <Heading fontSize="16px" mb="16px" color='blue.500'>Gait Speed Test</Heading>
                <Timer title='Gait Speed' onSubmit={time2}>
                    <Field.Radio form={form} id={FOUR_METERS} />
                    <Field.Input form={form} id={GAIT_SPEED} width='100px' />
                </Timer>
                <Heading fontSize="16px" mb="16px" color='blue.500'>Chair Stand Test</Heading>
                <Timer title='Repeated Chair Stand Test' onSubmit={time3}>
                    <Field.Radio form={form} id={CHAIR_STAND} />
                    <Field.Radio form={form} id={CHAIR_STAND_REPEAT} />
                    <Field.Input form={form} id={CHAIR_STAND_TIME} width='100px' />
                </Timer>
            </Segment>
            <Segment paddingTop={40} paddingBottom={30} borderBottom={true}>
                <Flex>
                    <Heading fontSize="24px" mb="24px" color='blue.500'>Total Score: </Heading>
                    <Heading fontSize="24px" mb="24px" color='red.500' ml="12px">3 (FAIL)</Heading>
                </Flex>
            </Segment>
            <Segment paddingTop={40} paddingBottom={30}>
                <Heading fontSize="20px" color='blue.500'>Community Nurse Counselling & Referral</Heading>
                <Field.Checkbox form={form} id={ELIGIBLE} />
                <Field.Select form={form} id={ZONE} width='200px' />
                <Button variantColor='blue' marginTop='24px' onClick={submit}>Save and Exit</Button>
            </Segment>
        </div >
    )
};