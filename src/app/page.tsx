import BlogPost from "@/components/BlogPost";
import CustomTabs from "@/components/CustomTabs";
export default function Home() {
	return (
		<main>
			<div className="">
				<CustomTabs
					outerWrapperClass={""}
					tabsData={[
						{ title: "New-in", component: "" },
						{ title: "Writers", component: "" },
					]}
				/>
			</div>
			<BlogPost
				title="How to Build Scalable Systems"
				description="Learn the principles and patterns to build scalable backend systems with real-world examples."
				authorName="Rakshith"
				authorAvatarUrl="/avatars/rakshith.jpg"
				publishedDate="May 23, 2025"
				imageUrl="https://fastly.picsum.photos/id/237/536/354.jpg?hmac=i0yVXW1ORpyCZpQ-CknuyV-jbtU7_x9EBQVhvT5aRr0"
			/>
		</main>
	);
}
