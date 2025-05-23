import { AuthorCardCompact, AuthorCardLarge } from "@/components/AuthorCard";
import { HorizontalBorder } from "@/components/HorizontalBorder";

export default async function AuthorsList() {
  const data = [
    {
      authorName: "Rakshith",
      imageUrl: "",
    },
    {
      authorName: "Rakshith",
      imageUrl: "",
    },
  ];

  return (
    <>
      {data.map((item, index) => {
        return (
          <>
            <AuthorCardLarge
              heading={item.authorName}
              subheading={"Writing is my passion which gives me wings to fly!"}
              imageUrl={item.imageUrl}
              blogCount={1}
            />
            <HorizontalBorder styles="m-3" />
          </>
        );
      })}
    </>
  );
}
