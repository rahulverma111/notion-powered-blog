"use client";

import { getPosts } from "@/lib/notion";
import { Post } from "@/lib/types";
import { useEffect, useState } from "react";

export default async function Blogs() {
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    (async () => {
      const posts = await getPosts({ pageSize: 10 });
      console.log("POSTS==>", posts);
    })();
  });
  console.log(posts);
  return (
    <>
      <h1>This Is Blogs List!!!</h1>
    </>
  );
}
