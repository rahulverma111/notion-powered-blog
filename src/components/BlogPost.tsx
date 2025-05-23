import { H1, H2 } from "./Heading";
import { D2, D3 } from "./Description";

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
    <div className="flex flex-col md:flex-row items-start gap-6 p-6 border rounded-2xl shadow-sm bg-white dark:bg-card">
      <div className="flex-1">
        {/* Need to replace with shadcn avatar */}
        <div className="flex items-center gap-3 mb-4">
          <img
            src={authorAvatarUrl}
            alt={authorName}
            className="w-10 h-10 rounded-full object-cover"
          />
          <p className="text-sm font-medium text-foreground">{authorName}</p>
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
