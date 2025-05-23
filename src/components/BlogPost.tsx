import { H1 } from "./Heading";
import { D2, D3 } from "./Description";
import { AuthorProfile } from "./AuthorCard";
import Image from "next/image";

type BlogPostProps = {
  title: string;
  description: string;
  authorName: string | undefined;
  authorAvatarUrl: string | undefined | null;
  publishedDate: string | undefined;
  imageUrl: string | undefined | null;
};

export default function BlogPost({
  title,
  description,
  authorName,
  authorAvatarUrl,
  publishedDate,
  imageUrl,
}: BlogPostProps) {
  return (
    <div className="flex hover:cursor-pointer transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-md hover:border-gray-300  flex-col-reverse md:flex-row items-start gap-6 p-6 bg-white dark:bg-card">
      <div className="flex-1">
        <div className="pb-4">
          <AuthorProfile
            authorName={authorName}
            imageUrl={authorAvatarUrl ? authorAvatarUrl : ""}
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <H1>{title}</H1>
          <D2 styles="text-sm md:text-base">{description}</D2>
          <D3>{publishedDate}</D3>
        </div>
      </div>

      <div className="w-full md:w-48 h-[170px]">
        <Image
          src={imageUrl ? imageUrl : ""}
          alt={title}
          className="w-full h-full object-cover"
          width={200}
          height={200}
        />
      </div>
    </div>
  );
}
