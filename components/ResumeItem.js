import { Text, Grid, SimpleGrid } from "@chakra-ui/core";

export default function ResumeItem({ range, children }) {
  return (
    <Grid
      as="li"
      templateColumns={["1fr", "3fr 1fr", "3fr 1fr"]}
      fontSize="2xl"
      marginY={2}
    >
      {children.length === 1 ? children : <div>{children}</div>}
      <Text
        as="em"
        fontSize="xl"
        justifySelf={["start", "end", "end"]}
        marginY={[0, 5, 5]}
        marginX={[0, 5, 5]}
      >
        {range}
      </Text>
    </Grid>
  );
}
