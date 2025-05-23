import { AuthorCardCompact } from "@/components/AuthorCard";
import BlogPost from "@/components/BlogPost";
import { D1 } from "@/components/Description";
import { H1 } from "@/components/Heading";
import { HorizontalBorder } from "@/components/HorizontalBorder";
// import { getPosts } from "@/lib/notion";
import { getAuthorDetails, getAuthorPosts } from "@/lib/notion";
import { log } from "console";
import { notFound } from "next/navigation";

// export async function generateStaticParams() {
//   // eslint-disable-next-line
//   // const posts: any = await getPosts({ pageSize: 10 });
//   // // eslint-disable-next-line
//   // return posts.posts.map((post: { id: string }) => ({
//   //   slug: post.id,
//   // }));
// }

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // const [authorPosts, setAuthorPosts] = useState<any[]>([]);
  const { slug } = await params;
  const author = await getAuthorDetails(slug);
  console.log("author", author);

  let authorPosts: any[] = [];
  if (author) {
    const aPosts = await getAuthorPosts(author?.id);
    console.log("authorPosts==>", aPosts.posts);
    // setAuthorPosts(aPosts);
    authorPosts = aPosts.posts;
  }

  if (!author) {
    notFound();
  }

  // const authorDetails = {
  //   authorName: "Avi Rajput",
  //   description: "Writing is my passion which gives me wings to fly!",
  // };

  return (
    <>
      <div className="max-w-full px-6   lg:max-w-4xl lg:mx-auto mb-6">
        <div className="w-full flex flex-col items-center space-y-3 my-8 ">
          <div className="h-[200px] w-[200px] rounded-full overflow-hidden bg-gray-600">
            <img
              src={author?.image}
              className="w-full h-full object-cover"
              alt="Rounded"
            />
          </div>

          <H1 styles="">{author?.name}</H1>
          <D1 styles="text-center">{author?.bio}</D1>
        </div>
        <HorizontalBorder />
        <div>
          {/* <H1 styles="my-4">Latest Articles by {author?.name}</H1> */}
          <div className="flex flex-col space-y-4">
            {authorPosts.length > 0 &&
              authorPosts.map((post) => (
                <BlogPost
                  publishedDate={post.date ?? post.date.split("T")[0]}
                  authorName={author?.name}
                  authorAvatarUrl={author?.image}
                  imageUrl={post?.coverImage ?? "https://fastly.picsum.photos/id/237/536/354.jpg?hmac=i0yVXW1ORpyCZpQ-CknuyV-jbtU7_x9EBQVhvT5aRr0"}
                  title={post?.title}
                  description={post?.excerpt}
                />
              ))}
            
            {/* <HorizontalBorder /> */} */}
          </div>
        </div>

        <div className="space-y-2 mt-20">
          <H1>More Authors</H1>

          <div className="grid grid-cols-1 space-y-4 sm:space-y-0 sm:grid-cols-2 mt-8">
            <AuthorCardCompact
              uuid=""
              heading="Dummy"
              subheading="fgh"
              imageUrl=""
              blogCount={1}
            />
            <AuthorCardCompact
              uuid=""
              heading="Dummy"
              subheading="fgh"
              imageUrl=""
              blogCount={1}
            />
          </div>
        </div>
      </div>
    </>
  );
}
