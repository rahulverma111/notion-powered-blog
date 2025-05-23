import { AuthorCardCompact } from "@/components/AuthorCard";

export default async function AuthorsList() {
  const data = [
    {
      authorName: "Rakshith",
      imageUrl: "",
    },
    {
      authorName: "Rashith",
      imageUrl: "",
    },
  ];

  return data.map((item) => {
    return (
      <AuthorCardCompact
        heading={item.authorName}
        subheading={"Subheading"}
        imageUrl={item.imageUrl}
        blogCount={1}
      />
    );
  });
}
