import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import Theme from 'styles/global';

export default ({ Component, pageProps }) => (
    <ThemeProvider>
        <CSSReset />
        <Theme />
        <Component {...pageProps} />
    </ThemeProvider>
);