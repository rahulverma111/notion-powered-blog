import AuthorCard from "@/components/AuthorCard";
import Description from "@/components/Description";
import Heading from "@/components/Heading";

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
      <div className="w-full flex flex-col items-center space-y-3 mt-8">
        <div className="h-[200px] w-[200px] rounded-full overflow-hidden bg-gray-600">
          <img
            src="https://picsum.photos/id/237/200/300"
            className="w-full h-full object-cover"
            alt="Rounded"
          />
        </div>

        <Heading headerText={authorDetails?.authorName} styles="" />
        <Description
          descriptionText={authorDetails?.description}
          styles="text-gray-600"
        />
        <HorizontalBorder />
        <AuthorCard heading="Dummy" subheading="fgh" imageUrl="" />
      </div>
    </>
  );
}
