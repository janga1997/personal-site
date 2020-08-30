import {
  ThemeProvider,
  CSSReset,
  Heading,
  Text,
  Grid,
  Link,
  Flex,
  Box,
  Stack,
} from "@chakra-ui/core";
import { theme } from "@chakra-ui/core";

import { MDXProvider } from "@mdx-js/react";
import ResumeItem from "../components/ResumeItem";
import PageLink from "../components/PageLink";

const sizes = ["xs", "sm", "lg", "xl", "2xl", "3xl"].reverse();
const H = (level) => (props) => {
  return (
    <Stack
      isInline
      marginY={10 / level}
      justifyContent="space-between"
      flexDirection={["column-reverse", "row", "row"]}
      spacing={[20, 20, 20]}
    >
      <Heading
        size={sizes[level]}
        {...props}
        as={`h${level}`}
        backgroundImage="linear-gradient(0deg, #ffeeda 100%,transparent 50%)"
      >
        {props.children}
      </Heading>
      {level === 1 && (
        <Stack
          marginY={2}
          isInline
          spacing={5}
          alignItems="center"
          fontSize={sizes[0]}
        >
          <PageLink href="/">Home</PageLink>
          <PageLink href="/blog/first_one">Blog</PageLink>
          <PageLink href="/tools">Tools</PageLink>
        </Stack>
      )}
    </Stack>
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
  a: PageLink,
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
