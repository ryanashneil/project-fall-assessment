import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import EmptyState from "../EmptyState";
import SpinnerCenter from "../Spinner/SpinnerCenter";

interface IList<T> {
    spacing?: number;
    emptyState: [string, string];
    getItems: () => Promise<T[]>;
    buildEachItem: (item: T) => void;
}

interface ISpace {
    marginBottom: number;
}

const ListWithSpace = styled.div`
    > * {
        margin-bottom: ${(props: ISpace) => `${props.marginBottom}px`};
    }
`;

const ListSpinner = () => <SpinnerCenter margin={"24px 0 0 0"} />;

export default <T extends {}>(props: IList<T>) => {
    const [dataList, setDataList] = useState<T[]>([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => void fetchData(), []);

    const fetchData = async () => {
        setLoading(true);
        setDataList(await props.getItems());
        setLoading(false);
    };

    if (isLoading) {
        return <ListSpinner />;
    }

    if (!dataList.length) {
        return (
            <EmptyState
                message={props.emptyState[0]}
                imagePath={props.emptyState[1]}
            />
        );
    }

    return (
        <ListWithSpace marginBottom={props.spacing || 16}>
            {dataList.map(props.buildEachItem)}
        </ListWithSpace>
    );
};
