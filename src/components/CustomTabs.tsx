"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";

interface CustomTabsProps {
  outerWrapperClass?: string;
  tabsData: {
    title: string;
    component: React.ReactNode;
  }[];
  activeIndex: number;
  setActiveIndex: (index: number) => void;
}

export default function CustomTabs({
  tabsData,
  outerWrapperClass,
  activeIndex,
  setActiveIndex,
}: CustomTabsProps) {
  const router = useRouter();

  return (
    <div className={`${outerWrapperClass}`}>
      <div className="space-x-4 border-b border-black mb-4 pl-2">
        {tabsData.map((tab, index) => (
          <button
            key={index}
            onClick={() => {
              setActiveIndex(index);
            }}
            className={cn(
              "relative flex-1 text-md font-medium py-3",
              activeIndex === index ? "font-semibold" : "",
              "transition-colors cursor-pointer"
            )}
          >
            {tab.title}
            {activeIndex === index && (
              <motion.div
                layoutId="underline"
                className="absolute left-0 right-0 -bottom-[1px] h-[4px] bg-black "
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
