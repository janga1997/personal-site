import { Heading, Stack, Grid } from "@chakra-ui/core";
import PageLink from "./PageLink";

const sizes = ["xs", "sm", "lg", "xl", "2xl", "3xl"].reverse();
export const customHeading = (level) => (props) => {
  return (
    <Stack
      isInline
      marginY={10 / level}
      alignItems={["start", "center", "center"]}
      justifyContent={["center", "space-between", "space-between"]}
      justifyContent={["start", "space-between", "space-between"]}
      flexDirection={["column-reverse", "row", "row"]}
      spacing={[0, 20, 20]}
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
          marginBottom={[3, 0, 0]}
          isInline
          spacing={5}
          fontSize={sizes[0]}
        >
          <PageLink href="/">Home</PageLink>
          <PageLink href="/blog">Blog</PageLink>
          <PageLink href="/tools">Tools</PageLink>
        </Stack>
      )}
    </Stack>
  );
};

export const Wrapper = (props) => (
  <Grid
    backgroundColor="#fafafa"
    paddingX={[5, 50, 100]}
    paddingY={[0, 10, 50]}
    column={1}
    spacing={6}
  >
    {props.children}
  </Grid>
);
