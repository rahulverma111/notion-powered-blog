import { H1, H2 } from "./Heading";
import { D2, D3 } from "./Description";
import { AuthorProfile } from "./AuthorCard";

type BlogPostProps = {
  title: string;
  description: string;
  authorName: string;
  authorAvatarUrl: string;
  publishedDate: string;
  imageUrl: string;
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
    <div className="flex flex-col-reverse md:flex-row items-start gap-6 p-6 bg-white dark:bg-card">
      <div className="flex-1 gap-y-3">
        <div className="flex items-center gap-3 mb-4">
          <AuthorProfile authorName={authorName} imageUrl={authorAvatarUrl} />
        </div>
        <H1>{title}</H1>
        <D2>{description}</D2>
        <D3>{publishedDate}</D3>
      </div>

      {/* Right: Blog Image */}
      <div className="w-full md:w-48">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-auto rounded-xl object-cover"
        />
      </div>
    </div>
  );
}
