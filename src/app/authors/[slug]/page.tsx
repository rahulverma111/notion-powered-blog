import { AuthorCardCompact } from "@/components/AuthorCard";
import BlogPost from "@/components/BlogPost";
import { D1 } from "@/components/Description";
import { H1 } from "@/components/Heading";
import { HorizontalBorder } from "@/components/HorizontalBorder";
import { getAuthors, getAuthorDetails, getAuthorPosts } from "@/lib/notion";
import { log } from "console";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Post } from "@/lib/types";

export const revalidate = 3600; // Revalidate every hour

export async function generateStaticParams() {
  const { authors } = await getAuthors({ pageSize: 100 });
  return authors.map((author) => ({
    slug: author.id,
  }));
}

export default async function AuthorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  try {
    const { slug } = await params;
    const author = await getAuthorDetails(slug);

    if (!author) {
      notFound();
    }

    const { posts } = await getAuthorPosts(slug);

    return (
      <div className="container py-8 px-16">
        <div className="flex items-center gap-8 mb-12">
          {author.image && (
            <div className="w-32 h-32 relative rounded-full overflow-hidden">
              <Image
                src={author.image}
                alt={author.name}
                fill
                className="object-cover w-full"
              />
            </div>
          )}
          <div>
            <h1 className="text-4xl font-bold mb-2">{author.name}</h1>
            {author.bio && <p className="text-gray-600">{author.bio}</p>}
            {author.email && (
              <a
                href={`mailto:${author.email}`}
                className="text-blue-600 hover:underline mt-2 inline-block"
              >
                {author.email}
              </a>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-y-4">
          {posts.map((post: Post) => (
            <Link
              key={post.id}
              href={`/${post.id}`}
              className="group block bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              {post.coverImage && (
                <div className="relative h-48">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="w-full object-contain group-hover:scale-105 transition-transform duration-200"
                  />
                </div>
              )}
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                  {post.title}
                </h2>
                <time className="text-sm text-gray-500">
                  {new Date(post.date).toLocaleDateString()}
                </time>
                {post.excerpt && (
                  <p className="mt-2 text-gray-600 line-clamp-2">
                    {post.excerpt}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching author:", error);
    notFound();
  }
}
