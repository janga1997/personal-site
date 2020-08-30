import {
  ThemeProvider,
  CSSReset,
  Heading,
  Text,
  Stack,
  Grid,
  Box,
  Link,
} from "@chakra-ui/core";
import { theme } from "@chakra-ui/core";

import { MDXProvider } from "@mdx-js/react";
import ResumeItem from "../components/ResumeItem";

const sizes = ["xs", "sm", "lg", "xl", "2xl", "3xl"].reverse();
const H = (level) => (props) => {
  const titleProps =
    level === 1
      ? {
          justifySelf: "center",
        }
      : {};
  return (
    <Heading
      marginY={10 / level}
      backgroundImage="linear-gradient(0deg, #ffeeda 100%,transparent 50%)"
      as={`h${level}`}
      size={sizes[level]}
      {...props}
      {...titleProps}
    >
      {props.children}
    </Heading>
  );
};

const components = {
  wrapper: (props) => (
    <Grid
      backgroundColor="#fafafa"
      paddingX={[5, 50, 100]}
      paddingY={[0, 10, 50]}
      column={1}
      spacing={6}
    >
      {props.children}
    </Grid>
  ),
  h1: H(1),
  h2: H(2),
  h3: H(3),
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
  a: (props) => (
    <Link
      {...props}
      backgroundImage="linear-gradient(0deg, #f6e7f9 100%,transparent 50%)"
    >
      {props.children}
    </Link>
  ),
};

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      <MDXProvider components={components}>
        <Component {...pageProps} />
      </MDXProvider>
    </ThemeProvider>
  );
}

export default MyApp;
