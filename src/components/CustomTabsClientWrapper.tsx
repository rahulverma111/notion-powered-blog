"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // or from "next/router" if < 13
import CustomTabs from "@/components/CustomTabs";
import BlogPost from "@/components/BlogPost";
import { Author, Post } from "@/lib/types";
import { HorizontalBorder } from "@/components/HorizontalBorder";
import { AuthorCardLarge } from "./AuthorCard";
import Loader from "./Loader";
import Link from "next/link";

interface Props {
  posts: Post[];
  authors: Author[];
}

export default function CustomTabsClientWrapper({ posts, authors }: Props) {
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handlePostClick = (id: string) => {
    setLoading(true);
    router.push(`/${id}`);
  };
  return (
    <>
      <CustomTabs
        outerWrapperClass=""
        tabsData={[
          { title: "New-in", component: "" },
          { title: "Writers", component: "" },
        ]}
        activeIndex={activeTab}
        setActiveIndex={setActiveTab}
      />

      {activeTab === 1 ? (
        <div className="flex flex-col gap-y-5">
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
                  {index < posts.length - 1 && (
                    <HorizontalBorder styles="m-3" />
                  )}
                </div>
              );
            })}
        </div>
      ) : (
        <div className="flex flex-col gap-y-5">
          {posts.map((post: Post) => (
            <Link key={post.id} href={`/${post.id}`} className="p-4">
              <BlogPost
                title={post.title}
                // description={post.excerpt}
                description={post?.excerpt}
                authorName={post?.author?.name}
                authorAvatarUrl={post?.author?.image}
                publishedDate={post?.date ?? post?.date.split("T")[0]}
                imageUrl={
                  post?.coverImage ??
                  "https://fastly.picsum.photos/id/237/536/354.jpg?hmac=i0yVXW1ORpyCZpQ-CknuyV-jbtU7_x9EBQVhvT5aRr0"
                }
              />
              {posts.indexOf(post) !== posts.length - 1 && <HorizontalBorder />}
            </Link>
            // </div>
          ))}
        </div>
      )}
    </>
  );
}
