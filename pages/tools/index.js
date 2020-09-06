import { meta as allTools } from "./*.jsx";
import { customHeading, Wrapper } from "../../components";
import PageLink from "../../components/PageLink";

const H1 = customHeading(1);
const H2 = customHeading(2);

export default function ToolsIndex({ allTools }) {
  return (
    <Wrapper>
      <H1>Tools Index</H1>
      {allTools.map(({ title, slug }) => (
        <H2 as="li" key={slug}>
          <PageLink href={slug}>{title}</PageLink>
        </H2>
      ))}
    </Wrapper>
  );
}

export async function getStaticProps() {
  return {
    props: { allTools },
  };
}
