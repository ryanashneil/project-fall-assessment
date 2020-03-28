import React from 'react';
import styled from '@emotion/styled';

const SegmentWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background: ${(props: IProps) => props.background || 'transparent'};
    height: ${(props: IProps) => props.height ? `${props.height}px` : 'auto'};
    padding: 0 20px;
    padding-top: ${(props: IProps) => props.paddingTop ? `${props.paddingTop}px` : '0'};
    padding-bottom: ${(props: IProps) => props.paddingBottom ? `${props.paddingBottom}px` : '0'};
    border-bottom: ${(props: IProps) => props.borderBottom && '1px solid #E5EAF1'};
`;

const SegmentContainer = styled.div`
    width: 100%;
    max-width: ${(props: IProps) => props.width ? `${props.width}px` : '700px'};
`;

interface IProps extends React.Props<{}> {
    background?: string;
    height?: number;
    width?: number;
    paddingTop?: number;
    paddingBottom?: number;
    borderBottom?: boolean;
}

export default (props: IProps): JSX.Element => (
    <SegmentWrapper borderBottom={props.borderBottom} height={props.height} background={props.background} paddingTop={props.paddingTop} paddingBottom={props.paddingBottom}>
        <SegmentContainer width={props.width}>{props.children}</SegmentContainer>
    </SegmentWrapper>
);