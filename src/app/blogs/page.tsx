import BlogPost from "@/components/BlogPost";
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
					<Link key={post.id} href={`/blogs/${post.id}`}>
						<BlogPost
							title={post.title}
							description={post.excerpt}
							authorName="Rakshith"
							authorAvatarUrl="/avatars/rakshith.jpg"
							publishedDate="May 23, 2025"
							imageUrl="https://fastly.picsum.photos/id/237/536/354.jpg?hmac=i0yVXW1ORpyCZpQ-CknuyV-jbtU7_x9EBQVhvT5aRr0"
						/>
					</Link>
				))}
			</div>
		</div>
	);
}
