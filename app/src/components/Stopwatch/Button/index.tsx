import React from "react";
import styled from "@emotion/styled";

interface IProps extends React.PropsWithChildren<{}> {
    status?: string;
    disabled?: boolean;
    onClick: () => void;
}

const getStatus = (status: string) => {
    switch (status) {
        case "running":
            return "red";
        case "stopped":
            return "green";
        default:
            return "#ccc";
    }
};

const StyledButton = styled.button`
  cursor: ${(props: IProps) => (props.disabled ? "not-allowed" : "pointer")};
  border: 0;
  appearance: none;
  border-radius: 50%;
  height: 100px;
  width: 100px;
  font-size: 1.5rem;
  text-align: center;
  background: ${(props: IProps) => getStatus(props.status)};
  color: ${(props: IProps) => (props.status ? "#fff" : "black")};
  transition: 0.25s ease;
  box-shadow: ${(props: IProps) => `0 0 0 3px #111, 0 0 0 6px ${getStatus(props.status)}`};
  opacity: ${(props: IProps) => (props.disabled ? ".5" : null)};
`;

export default (props: IProps) => (
    <StyledButton status={props.status} disabled={props.disabled} {...props}>
        {props.children}
    </StyledButton>
);
