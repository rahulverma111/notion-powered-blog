import CustomTabs from "@/components/CustomTabs";

export default function Authors() {
  return (
    <div className="">
      <CustomTabs
        outerWrapperClass={""}
        tabsData={[
          { title: "New-in", component: "" },
          { title: "Writers", component: "" },
        ]}
      />
    </div>
  );
}
