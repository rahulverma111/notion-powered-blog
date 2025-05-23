import { getPostDetails, getPosts } from "@/lib/notion";
import Image from "next/image";
import { notFound } from "next/navigation";

export const revalidate = 3600; // Revalidate every hour

export async function generateStaticParams() {
  const posts = await getPosts({ pageSize: 10 });
  return posts.posts.map((post: { id: string }) => ({
    slug: post.id,
  }));
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  try {
    const { slug } = await params;
    const post = await getPostDetails(slug);

    if (!post) {
      notFound();
    }

    return (
      <article className="container py-8 px-16">
        {post.coverImage && (
          <div className="mb-8 border shadow-md rounded-lg">
            <Image
              src={post.coverImage}
              alt={post.title}
              className="w-full object-contain rounded-lg"
              width={200}
              height={200}
            />
          </div>
        )}

        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

        <div className="flex gap-4 mb-8">
          <time className="text-gray-600">
            {new Date(post.date).toLocaleDateString()}
          </time>
          {post.tags.length > 0 && (
            <div className="flex gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {post.excerpt && (
          <p className="text-xl text-gray-600 mb-8">{post.excerpt}</p>
        )}

        <div
          className="prose prose-lg dark:prose-invert mt-4"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    );
  } catch (error) {
    console.error("Error fetching post:", error);
    notFound();
  }
}
