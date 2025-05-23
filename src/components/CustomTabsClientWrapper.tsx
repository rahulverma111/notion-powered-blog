"use client";

import { useState } from "react";
import Link from "next/link";
import CustomTabs from "@/components/CustomTabs";
import BlogPost from "@/components/BlogPost";
import { Post } from "@/lib/types";
import { HorizontalBorder } from "@/components/HorizontalBorder";

interface Props {
	posts: Post[];
}

export default function CustomTabsClientWrapper({ posts }: Props) {
	const [activeTab, setActiveTab] = useState(0);

	return (
		<>
			<CustomTabs
				outerWrapperClass=""
				tabsData={[
					{ title: "New-in", component: "" },
					{ title: "Writers", component: "" },
				]}
				activeIndex={activeTab}
				setActiveIndex={setActiveTab}
			/>

			{activeTab === 1 ? (
				<h1 className="text-2xl font-bold">Writer</h1>
			) : (
				<div className="flex flex-col gap-y-5">
					{posts.map((post: Post) => (
						<Link key={post.id} href={`/${post.id}`} className="p-4">
							<BlogPost
								title={post.title}
								// description={post.excerpt}
								description="Learn the principles and patterns to build scalable backend systems with real-world examples."
								authorName="Rakshith"
								authorAvatarUrl="/avatars/rakshith.jpg"
								publishedDate="May 23, 2025"
								imageUrl="https://fastly.picsum.photos/id/237/536/354.jpg?hmac=i0yVXW1ORpyCZpQ-CknuyV-jbtU7_x9EBQVhvT5aRr0"
							/>
							{posts.indexOf(post) !== posts.length - 1 && <HorizontalBorder />}
						</Link>
						// </div>
					))}
				</div>
			)}
		</>
	);
}
