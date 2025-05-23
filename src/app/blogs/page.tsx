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

export default async function Blogs() {
  const { props } = await getStaticProps();
  const { posts } = props;

  console.log("posts==>", posts);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Blog Posts</h1>
      <div className="grid gap-6">
        {posts.map((post: Post) => (
          <Link
            key={post.id}
            href={`/blogs/${post.id}`}
            className="border p-4 rounded-lg hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold">{post.title}</h2>
            {post.excerpt && (
              <p className="text-gray-600 mt-2">{post.excerpt}</p>
            )}
            <div className="flex gap-2 mt-4">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
