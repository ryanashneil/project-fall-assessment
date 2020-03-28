import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import Theme from 'src/styles/global';

export default ({ Component, pageProps }) => (
    <ThemeProvider>
        <CSSReset />
        <Theme />
        <Component {...pageProps} />
    </ThemeProvider>
);