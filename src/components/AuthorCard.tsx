import React from "react";
import { Label } from "./ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface AuthorCardProps {
  heading: string;
  subheading: string;
  imageUrl: string;
  blogCount: number;
}

export default function AuthorCard({
  heading = "Rahul verma",
}: // subheading = "Writing is my passion which gives me wings to fly!",
// imageUrl = "",
// blogCount = 312,
AuthorCardProps) {
  return (
    <div>
      <Label htmlFor="heading">{heading}</Label>
      <Label htmlFor="subheading">{heading}</Label>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback></AvatarFallback>
      </Avatar>
    </div>
  );
}
