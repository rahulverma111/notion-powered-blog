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

export const revalidate = 3600; // Revalidate every hour

export async function generateStaticParams() {
  const { authors } = await getAuthors({ pageSize: 100 });
  return authors.map((author) => ({
    slug: author.id,
  }));
}

type Props = {
  params: { slug: string };
};

export default async function AuthorPage({ params }: Props) {
  try {
    const author = await getAuthorDetails(params.slug);
    if (!author) {
      notFound();
    }

    const { posts } = await getAuthorPosts(params.slug);

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-12">
          <div className="flex items-center gap-6 mb-6">
            {author.image && (
              <div className="relative w-24 h-24 rounded-full overflow-hidden">
                <Image
                  src={author.image}
                  alt={author.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div>
              <h1 className="text-3xl font-bold mb-2">{author.name}</h1>
              {author.email && <p className="text-gray-600">{author.email}</p>}
            </div>
          </div>
          {author.bio && <p className="text-lg text-gray-700">{author.bio}</p>}
        </div>

        <div className="grid gap-6">
          <h2 className="text-2xl font-semibold mb-4">
            Posts by {author.name}
          </h2>
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/${post.id}`}
              className="border p-4 rounded-lg hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
              {post.excerpt && (
                <p className="text-gray-600 mb-3">{post.excerpt}</p>
              )}
              <div className="flex gap-2">
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
  } catch (error) {
    console.error("Error fetching author:", error);
    notFound();
  }
}
