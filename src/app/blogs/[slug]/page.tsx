import { getPosts } from "@/lib/notion";

export async function generateStaticParams() {
  // eslint-disable-next-line
  const posts: any = await getPosts({ pageSize: 10 });

  // eslint-disable-next-line
  return posts.posts.map((post: { slug: string }) => ({
    slug: post.slug,
  }));
}
// eslint-disable-next-line
export default async function Blog({
  params,
}: {
  // eslint-disable-next-line
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <>
      <h2>This is single blog!!! - {slug}</h2>
    </>
  );
}
