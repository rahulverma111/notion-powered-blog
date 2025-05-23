import BlogPost from "@/components/BlogPost";
import CustomTabs from "@/components/CustomTabs";
import { HorizontalBorder } from "@/components/HorizontalBorder";
import { getAuthors, getPosts } from "@/lib/notion";
import { Post } from "@/lib/types";
import Link from "next/link";

export const revalidate = 3600; // Revalidate every hour

async function getStaticProps() {
  const { posts } = await getPosts({ pageSize: 100 });
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
      <CustomTabs
        outerWrapperClass={""}
        tabsData={[
          { title: "New-in", component: <PostsComponent posts={posts} /> },
          { title: "Writers", component: "" },
        ]}
      />
      {/* {JSON.stringify(authors)}
      {JSON.stringify(posts)} */}
    </main>
  );
}

const PostsComponent: React.FC<{ posts: Post[] }> = ({ posts }) => {
  return (
    <div className="flex flex-col gap-y-5">
      {posts.map((post: Post) => (
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
          {posts.indexOf(post) !== posts.length - 1 && <HorizontalBorder />}
        </Link>
      ))}
    </div>
  );
};
