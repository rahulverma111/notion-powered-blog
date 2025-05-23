import BlogPost from "@/components/BlogPost";
import AuthorCard from "../components/AuthorCard";
export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-(family-name:--font-geist-sans)">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1>This is Home!!!</h1>
        <BlogPost
          title="How to Build Scalable Systems"
          description="Learn the principles and patterns to build scalable backend systems with real-world examples."
          authorName="Rakshith"
          authorAvatarUrl="/avatars/rakshith.jpg"
          publishedDate="May 23, 2025"
          imageUrl="https://fastly.picsum.photos/id/237/536/354.jpg?hmac=i0yVXW1ORpyCZpQ-CknuyV-jbtU7_x9EBQVhvT5aRr0"
        />
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
