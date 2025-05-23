import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { H2 } from "./Heading";
import Subheading from "./Subheading";

interface AuthorCardProps {
  heading: string;
  subheading: string;
  imageUrl: string;
  blogCount: number;
}

const AuthorCardCompact: React.FC<AuthorCardProps> = ({
  heading = "Rahul verma",
  subheading = "Writing is my passion which gives me wings to fly!",
  imageUrl = "",
  blogCount = 126,
}: AuthorCardProps) => {
  return (
    <div className="flex gap-4 items-start">
      <div>
        <Avatar className="w-10 lg:w-16 h-10 lg:h-16">
          <AvatarImage src={imageUrl || "https://github.com/shadcn.png"} />
          <AvatarFallback></AvatarFallback>
        </Avatar>
      </div>
      <div>
        <H2 styles={"text-base lg:text-xl capitalize"}>{heading}</H2>
        <Subheading
          styles={"text-xs lg:text-lg capitalize"}
          headerText={subheading}
        />
        <Subheading
          styles={"text-xs lg:text-sm capitalize"}
          headerText={`Published ${"  "} ${blogCount} blogs`}
        />
      </div>
    </div>
  );
};

const AuthorCardLarge: React.FC<AuthorCardProps> = ({
  heading = "Rahul verma",
  subheading = "Writing is my passion which gives me wings to fly!",
  imageUrl = "",
  blogCount = 126,
}: AuthorCardProps) => {
  return (
    <div className="flex gap-4 items-start">
      <div>
        <Avatar className="w-20 h-20">
          <AvatarImage src={imageUrl || "https://github.com/shadcn.png"} />
          <AvatarFallback></AvatarFallback>
        </Avatar>
      </div>
      <div>
        <H2 styles={"text-base lg:text-2xl capitalize"}>{heading}</H2>
        <Subheading
          styles={"text-xs lg:text-lg capitalize"}
          headerText={subheading}
        />
        <Subheading
          styles={"text-xs lg:text-sm capitalize"}
          headerText={`Published ${"  "} ${blogCount} blogs`}
        />
      </div>
    </div>
  );
};

export { AuthorCardCompact, AuthorCardLarge };
