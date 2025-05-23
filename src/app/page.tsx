import BlogPost from "@/components/BlogPost";
import CustomTabsClientWrapper from "@/components/CustomTabsClientWrapper";
import CustomTabs from "@/components/CustomTabs";
import { HorizontalBorder } from "@/components/HorizontalBorder";
import { getAuthors, getPosts } from "@/lib/notion";
import { Post } from "@/lib/types";
import Link from "next/link";
import PaginationComponent from "@/components/PaginationComponent";

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
      <PaginationComponent />
      <CustomTabsClientWrapper posts={posts} />
    </main>
  );
}
