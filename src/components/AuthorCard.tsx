import React from "react";
import { Label } from "./ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { H1 } from "./Heading";
import Subheading from "./Subheading";

interface AuthorCardProps {
  heading: string;
  subheading: string;
  imageUrl: string;
  blogCount: number;
}

export default function AuthorCard({
  heading = "Rahul verma",
  subheading = "Writing is my passion which gives me wings to fly!",
  imageUrl = "",
  blogCount = 312,
}: AuthorCardProps) {
  return (
    <div>
      <H1>{heading}</H1>
      <Subheading headerText={subheading} />
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback></AvatarFallback>
      </Avatar>
    </div>
  );
}
