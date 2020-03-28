import { Global, css } from '@emotion/core';

const globalStyles = css`
    body {
        margin: 0;
        padding: 0;
        background: white;
        height: 100%;
    }
    h1 {
        font-size: 32px;
        font-weight: 600;
        margin: 0;
    }
    h2 {
        font-size: 20px;
        font-weight: 400;
        margin: 0;
    }
    input[type='text'] {
        /* Remove First */
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
    }
    input[type='number'] {
        /* Remove First */
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
    }
`;

export default (): JSX.Element => <Global styles={globalStyles} />;
