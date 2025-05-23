import { getPostDetails } from "@/lib/notion";
import { notFound } from "next/navigation";

export const revalidate = 3600; // Revalidate every hour

export default async function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  try {
    console.log("params==>", params.slug);
    const post = await getPostDetails(params.slug);

    if (!post) {
      notFound();
    }

    return (
      <article className="container mx-auto px-4 py-8">
        {post.coverImage && (
          <div className="mb-8">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-[400px] object-cover rounded-lg"
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
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    );
  } catch (error) {
    console.error("Error fetching post:", error);
    notFound();
  }
}
