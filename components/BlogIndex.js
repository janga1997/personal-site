import { getAllPosts } from "../lib/api";

export default function BlogIndex({ allPosts }) {
  return <div>{allPosts}</div>;
}

export async function getStaticProps() {
  const allPosts = getAllPosts([
    "title",
    "date",
    "slug",
    "author",
    "coverImage",
    "excerpt",
  ]);

  return {
    props: { allPosts },
  };
}
