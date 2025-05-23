export async function generateStaticParams() {
  // const posts = await fetch("https://.../posts").then((res) => res.json());
  const posts = [{ slug: "233" }, { slug: "43" }];

  return posts.map((post: { slug: string }) => ({
    slug: post.slug,
  }));
}

export default function Blog() {
  return (
    <>
      <h2>This is single blog!!!</h2>
    </>
  );
}
