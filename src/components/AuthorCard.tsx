import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { H2 } from "./Heading";
import { SH2 } from "./Subheading";
import { D3 } from "./Description";
import Link from "next/link";

interface AuthorCardProps {
  heading: string;
  subheading?: string;
  imageUrl: string;
  blogCount?: number;
  uuid: string;
}

interface AuthorProfileProps {
  authorName: string | undefined;
  imageUrl: string | undefined;
}

const AuthorCardCompact: React.FC<AuthorCardProps> = ({
  heading = "Rahul verma",
  subheading = "Writing is my passion which gives me wings to fly!",
  imageUrl = "",
  blogCount = 126,
  uuid,
}: AuthorCardProps) => {
  return (
    <Link href={`authors/${uuid}`} className="flex gap-4 items-start">
      <div>
        <Avatar className="w-10 lg:w-16 h-10 lg:h-16">
          <AvatarImage src={imageUrl || "https://github.com/shadcn.png"} />
          <AvatarFallback></AvatarFallback>
        </Avatar>
      </div>
      <div>
        <H2 styles={"text-base lg:text-xl capitalize"}>{heading}</H2>
        <SH2 styles={"text-xs lg:text-lg capitalize"}>{subheading}</SH2>
        <SH2
          styles={"text-xs lg:text-sm capitalize"}
        >{`Published ${"  "} ${blogCount} blogs`}</SH2>
      </div>
    </Link>
  );
};

const AuthorCardLarge: React.FC<AuthorCardProps> = ({
  heading = "Rahul verma",
  subheading = "Writing is my passion which gives me wings to fly!",
  imageUrl = "",
  blogCount = 126,
  uuid,
}: AuthorCardProps) => {
  return (
    <Link href={`authors/${uuid}`} className="flex gap-4 items-start p-3">
      <div className="pt-2">
        <Avatar className="w-10 h-10">
          <AvatarImage src={imageUrl || "https://github.com/shadcn.png"} />
          <AvatarFallback></AvatarFallback>
        </Avatar>
      </div>
      <div className="flex flex-col gap-y-2">
        <div>
          <H2>{heading}</H2>
          <SH2>{subheading}</SH2>
        </div>
        <D3>{`Published ${"  "} ${blogCount} blogs`}</D3>
      </div>
    </Link>
  );
};

const AuthorProfile: React.FC<AuthorProfileProps> = ({
  authorName = "Rahul verma",
  imageUrl = "",
}: AuthorProfileProps) => {
  return (
    <div className="flex gap-4 items-start">
      <div className="flex gap-4 items-center">
        <Avatar className="w-10 h-10">
          <AvatarImage src={imageUrl || "https://github.com/shadcn.png"} />
          <AvatarFallback></AvatarFallback>
        </Avatar>
        <SH2>{authorName}</SH2>
      </div>
    </div>
  );
};

export { AuthorCardCompact, AuthorCardLarge, AuthorProfile };
