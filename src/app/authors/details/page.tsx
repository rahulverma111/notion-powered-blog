import { AuthorCardCompact } from "@/components/AuthorCard";
import BlogPost from "@/components/BlogPost";
import { D1 } from "@/components/Description";
import { H1 } from "@/components/Heading";

export default function Page() {
  const authorDetails = {
    authorName: "Avi Rajput",
    description: "Writing is my passion which gives me wings to fly!",
  };

  const HorizontalBorder = () => {
    return <div className="w-full h-0.5 bg-gray-300"></div>;
  };

  return (
    <>
      <div className="max-w-[200px] sm:max-w-sm md:max-w-lg lg:max-w-4xl mx-auto mb-6">
        <div className="w-full flex flex-col items-center space-y-3 my-8 ">
          <div className="h-[200px] w-[200px] rounded-full overflow-hidden bg-gray-600">
            {/* <img
              src="https://picsum.photos/id/237/200/300"
              className="w-full h-full object-cover"
              alt="Rounded"
            /> */}
          </div>

          <H1 styles="">{authorDetails?.authorName}</H1>
          <D1 styles="text-center">{authorDetails?.description}</D1>
        </div>
        <HorizontalBorder />
        <div>
          <H1 styles="my-4">Latest Articles by Rahul</H1>
          <div className="flex flex-col space-y-4">
            <BlogPost
              publishedDate={`Published on 23 May, 2025`}
              authorName="Rahul Verma"
              authorAvatarUrl="https://picsum.photos/id/237/200/300"
              imageUrl="https://picsum.photos/id/237/200/300"
              title="ChatGPT is shockingly bad at poker"
              description="I’m impressed by large language models. So why can't they get the basics of poker right?"
            />{" "}
            <BlogPost
              publishedDate={`Published on 23 May, 2025`}
              authorName="Rahul Verma"
              authorAvatarUrl="https://picsum.photos/id/237/200/300"
              imageUrl="https://picsum.photos/id/237/200/300"
              title="ChatGPT is shockingly bad at poker"
              description="I’m impressed by large language models. So why can't they get the basics of poker right?"
            />{" "}
            <BlogPost
              publishedDate={`Published on 23 May, 2025`}
              authorName="Rahul Verma"
              authorAvatarUrl="https://picsum.photos/id/237/200/300"
              imageUrl="https://picsum.photos/id/237/200/300"
              title="ChatGPT is shockingly bad at poker"
              description="I’m impressed by large language models. So why can't they get the basics of poker right?"
            />
            <BlogPost
              publishedDate={`Published on 23 May, 2025`}
              authorName="Rahul Verma"
              authorAvatarUrl="https://picsum.photos/id/237/200/300"
              imageUrl="https://picsum.photos/id/237/200/300"
              title="ChatGPT is shockingly bad at poker"
              description="I’m impressed by large language models. So why can't they get the basics of poker right?"
            />
          </div>
        </div>

        <div className="space-y-2 mt-20">
          <H1>More Authors</H1>

          <div className="grid grid-cols-1 sm:grid-cols-2 mt-8">
            <AuthorCardCompact
              heading="Dummy"
              subheading="fgh"
              imageUrl=""
              blogCount={1}
            />
            <AuthorCardCompact
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
