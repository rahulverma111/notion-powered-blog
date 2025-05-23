"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // or from "next/router" if < 13
import CustomTabs from "@/components/CustomTabs";
import BlogPost from "@/components/BlogPost";
import { Post } from "@/lib/types";
import { HorizontalBorder } from "@/components/HorizontalBorder";
import Loader from "./Loader";

interface Props {
	posts: Post[];
}

export default function CustomTabsClientWrapper({ posts }: Props) {
	const [activeTab, setActiveTab] = useState(0);
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const handlePostClick = (id: string) => {
		setLoading(true);
		router.push(`/${id}`);
	};

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
			) : loading ? (
				<Loader />
			) : (
				<div className="flex flex-col">
					{posts.map((post: Post) => {
						const istDate = new Date(post.date).toLocaleString("en-IN", {
							timeZone: "Asia/Kolkata",
							year: "numeric",
							month: "short",
							day: "numeric",
							hour: "numeric",
							minute: "2-digit",
							hour12: true,
						});
						return (
							<div
								key={post.id}
								className="p-4 cursor-pointer"
								onClick={() => handlePostClick(post.id)}
							>
								<BlogPost
									title={post.title}
									// description={post.excerpt}
									description="Learn the principles and patterns to build scalable backend systems with real-world examples."
									// authorName="Rakshith"
									authorName={post.author?.name}
									// authorAvatarUrl="/avatars/rakshith.jpg"
									authorAvatarUrl={post.author?.image}
									// publishedDate="May 23, 2025"
									publishedDate={`Published at: ${istDate}`}
									imageUrl={
										post.coverImage ??
										"https://fastly.picsum.photos/id/237/536/354.jpg?hmac=i0yVXW1ORpyCZpQ-CknuyV-jbtU7_x9EBQVhvT5aRr0"
									}
								/>
								{posts.indexOf(post) !== posts.length - 1 && (
									<HorizontalBorder />
								)}
							</div>
						);
					})}
				</div>
			)}
		</>
	);
}
