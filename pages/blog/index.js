import { meta as allPosts } from "../blog/*.mdx";
import { customHeading, Wrapper } from "../../components";
import PageLink from "../../components/PageLink";

const H1 = customHeading(1);
const H2 = customHeading(2);

export default function Index({ allPosts }) {
  return (
    <Wrapper>
      <H1>Blog Index</H1>
      {allPosts.map(({ title, slug }) => (
        <H2 as="li" key={slug}>
          <PageLink href={slug}>{title}</PageLink>
        </H2>
      ))}
    </Wrapper>
  );
}

export async function getStaticProps() {
  return {
    props: { allPosts },
  };
}
