import NewAssessment from "src/composite/Modal/NewAssessment"
import Segment from "src/components/Segment";
import { color } from 'src/styles/tokens';
import { Flex, Text, Input, InputGroup, InputLeftElement, Icon } from "@chakra-ui/core";
import Record from "src/components/Record";
import { useState, useEffect } from "react";
import Loader from "src/components/Loader";
import { ISenior } from 'src/db/interface';
import { getAllSeniors } from 'src/db/api';
import EmptyState from "src/components/EmptyState";
import moment from 'moment';


export default (): JSX.Element => {
    const [filter, setFilter] = useState<string | undefined>(undefined);
    const [isLoading, setLoading] = useState(true);
    const [seniors, setSeniors] = useState<ISenior[]>([]);
    
    useEffect(() => void fetchData(), []);

    const updateFilter = (event: any) => {
        setFilter(event.target.value);
    }
    
    const fetchData = async () => {
        setLoading(true);
        setSeniors(await getAllSeniors());
        setLoading(false);
    }
        
    return (
        <div>
            <Loader show={isLoading} />
            <Segment background={color.blue.light}>
                <Flex padding="24px 0" justifyContent="space-between" alignItems="center">
                    <Text color={color.blue.dark} fontWeight="bold" fontSize="20px"> Community Fall Prevention Programme</Text>
                    <NewAssessment onSubmit={fetchData} />
                </Flex>
            </Segment>
            <Segment paddingTop={40}>
                <InputGroup>
                    <InputLeftElement children={<Icon name="search" color="gray.300" />} />
                    <Input type="text" placeholder="Search Records" onChange={updateFilter} />
                </InputGroup>
            </Segment>
            <Segment paddingTop={16}>
                {!seniors.length && <EmptyState imagePath='/images/queue.png' message='No assessment found!' />}
                {seniors.length > 0
                    && !seniors.filter((senior: ISenior) => (!filter || senior.name.toLowerCase().includes(filter.toLowerCase()))).length
                    && <EmptyState imagePath='/images/search.png' message='No search results!' />}
                {seniors
                    .filter((senior: ISenior) => (!filter || senior.name.toLowerCase().includes(filter.toLowerCase())))
                    .map((senior: ISenior) => <Record senior={senior} date={moment().format('DD MMM YYYY')} />)}
            </Segment>
        </div>
    )
};