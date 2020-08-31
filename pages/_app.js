import {
  ThemeProvider,
  CSSReset,
  Heading,
  Text,
  Grid,
  Stack,
} from "@chakra-ui/core";
import { theme } from "@chakra-ui/core";

import { MDXProvider } from "@mdx-js/react";
import ResumeItem from "../components/ResumeItem";
import PageLink from "../components/PageLink";
import { customHeading, Wrapper } from "../components";

const components = {
  wrapper: Wrapper,
  h1: customHeading(1),
  h2: customHeading(2),
  h3: customHeading(3),
  p: (props) => (
    <Text fontSize="2xl" marginY={[3, 5, 5]}>
      {props.children}
    </Text>
  ),
  em: (props) => (
    <Text as="em" fontSize="xl">
      {props.children}
    </Text>
  ),
  strong: (props) => (
    <Text
      as="strong"
      fontSize="inherit"
      backgroundImage="linear-gradient(0deg, #d2f7f2 100%,transparent 50%)"
    >
      {props.children}
    </Text>
  ),
  li: ResumeItem,
  a: PageLink,
};

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <MDXProvider components={components}>
        <CSSReset />
        <Component {...pageProps} />
      </MDXProvider>
    </ThemeProvider>
  );
}

export default MyApp;
