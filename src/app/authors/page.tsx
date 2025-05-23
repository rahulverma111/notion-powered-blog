import { AuthorCardLarge } from "@/components/AuthorCard";
import { HorizontalBorder } from "@/components/HorizontalBorder";
import { getAuthors } from "@/lib/notion";

async function getStaticProps() {
  const { authors } = await getAuthors({ pageSize: 100 });
  return {
    params: { authors },
  };
}

export default async function AuthorsList() {
  const { params } = await getStaticProps();
  const { authors } = params;

  console.log("authors here", authors);

  return (
    <>
      {authors &&
        authors?.length > 0 &&
        authors.map((item, index) => {
          return (
            <div key={index}>
              <AuthorCardLarge
                uuid={item?.id}
                heading={item?.name}
                subheading={item?.bio}
                imageUrl={item?.image}
                blogCount={item?.posts?.length}
              />
              <HorizontalBorder styles="m-3" />
            </div>
          );
        })}
    </>
  );
}
