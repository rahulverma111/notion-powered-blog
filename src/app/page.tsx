import BlogPost from "@/components/BlogPost";
import CustomTabsClientWrapper from "@/components/CustomTabsClientWrapper";
import CustomTabs from "@/components/CustomTabs";
import CustomTabsClientWrapper from "@/components/CustomTabsClientWrapper";
import { HorizontalBorder } from "@/components/HorizontalBorder";
import { getAuthors, getPosts } from "@/lib/notion";
import { Post } from "@/lib/types";
import Link from "next/link";

export const revalidate = 3600; // Revalidate every hour

async function getStaticProps() {
  const { posts } = await getPosts({ pageSize: 10 });
  const { authors } = await getAuthors({ pageSize: 100 });

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
      <CustomTabsClientWrapper posts={posts} />
    </main>
  );
}
