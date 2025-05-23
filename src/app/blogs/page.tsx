import CustomTabs from "@/components/CustomTabs";

export default function Blogs() {
  const tabsData = [
    {
      title: "New-in",
      component: (
        <>
          <p className="bg-green-300">New writers</p>
        </>
      ),
    },
    {
      title: "Writers",
      component: (
        <>
          <p>writers</p>
        </>
      ),
    },
  ];
  return (
    <>
      <CustomTabs outerWrapperClass="mx-24" tabsData={tabsData} />
    </>
  );
}
