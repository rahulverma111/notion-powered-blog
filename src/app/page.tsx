import BlogPost from "@/components/BlogPost";
import CustomTabs from "@/components/CustomTabs";
import { getPosts } from "@/lib/notion";
import { Post } from "@/lib/types";
import Link from "next/link";

export const revalidate = 3600; // Revalidate every hour

async function getStaticProps() {
  const { posts } = await getPosts({ pageSize: 10 });
  return {
    props: {
      posts,
    },
  };
}
export default async function Home() {
  const { props } = await getStaticProps();
  const { posts } = props;

  return (
    <main>
      <CustomTabs
        outerWrapperClass={""}
        tabsData={[
          { title: "New-in", component: "" },
          { title: "Writers", component: "" },
        ]}
      />

      <div className="flex flex-col gap-y-5">
        {posts.map((post: Post) => (
          // <div className="p-4" key={post.id} onClick={handleBlogClick}>
          <Link key={post.id} href={`/${post.id}`} className="p-4">
            <BlogPost
              title={post.title}
              // description={post.excerpt}
              description="Learn the principles and patterns to build scalable backend systems with real-world examples."
              authorName="Rakshith"
              authorAvatarUrl="/avatars/rakshith.jpg"
              publishedDate="May 23, 2025"
              imageUrl="https://fastly.picsum.photos/id/237/536/354.jpg?hmac=i0yVXW1ORpyCZpQ-CknuyV-jbtU7_x9EBQVhvT5aRr0"
            />
          </Link>
          // </div>
        ))}
      </div>
    </main>
  );
}
