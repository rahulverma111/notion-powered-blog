import { getPosts } from "@/lib/notion";
import { Post } from "@/lib/types";

export const revalidate = 3600; // Revalidate every hour

async function getStaticProps() {
  const { posts } = await getPosts({ pageSize: 10 });
  return {
    props: {
      posts,
    },
  };
}

export default async function Blogs() {
  const { props } = await getStaticProps();
  const { posts } = props;

  console.log("posts==>", posts);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Blog Posts</h1>
      <div className="grid gap-6">
        {posts.map((post: Post) => (
          <div key={post.id} className="border p-4 rounded-lg">
            <h2 className="text-xl font-semibold">{post.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
