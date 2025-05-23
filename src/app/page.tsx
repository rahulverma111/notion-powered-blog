import CustomTabsClientWrapper from "@/components/CustomTabsClientWrapper";
import { getAuthors, getPosts } from "@/lib/notion";

export const revalidate = 3600; // Revalidate every hour

async function getStaticProps() {
  const { posts } = await getPosts({ pageSize: 100 });
  const { authors } = await getAuthors({ pageSize: 100 });

  console.log("posts==>", posts);

  return {
    props: {
      posts,
      authors,
    },
  };
}
export default async function Home() {
  const { props } = await getStaticProps();
  const { posts, authors } = props;

  return (
    <main>
      <CustomTabsClientWrapper posts={posts} authors={authors} />
    </main>
  );
}
