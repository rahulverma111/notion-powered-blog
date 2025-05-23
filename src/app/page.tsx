import CustomTabsClientWrapper from "@/components/CustomTabsClientWrapper";
import { getPosts } from "@/lib/notion";

export default async function Home() {
	const { posts } = await getPosts({ pageSize: 10 });
	return (
		<main>
			<CustomTabsClientWrapper posts={posts} />
		</main>
	);
}
