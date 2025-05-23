"use client";

import { useState } from "react";
import Link from "next/link";
import CustomTabs from "@/components/CustomTabs";
import BlogPost from "@/components/BlogPost";
import { Post } from "@/lib/types";
import { HorizontalBorder } from "@/components/HorizontalBorder";

interface Props {
  posts: Post[];
}

export default function CustomTabsClientWrapper({ posts }: Props) {
  const [activeTab, setActiveTab] = useState(0);

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

      {activeTab === 1 ? <h1 className="text-2xl font-bold">Writer</h1> : <></>}
    </>
  );
}
