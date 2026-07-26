import Skeleton from "@components/ui/Skeleton";

export default function FinanceLoading() {
  return (
    <div
      className="w-full h-full grid grid-cols-1 grid-rows-[150px_150px_150px_300px] gap-3 mt-18 font-dmsans
      md:grid-cols-3 md:grid-rows-5
      dark:text-[#E4E2E5]"
    >
      <Skeleton
        width="100%"
        height="100%"
        backgroundColor={"#F3EEF5"}
        darkModeBackgroundColor={"#101012"}
        shineColor="#C5C1C7"
        darkModeShineColor="#1e1e1e"
        borderRadius={"32px"}
      />

      <Skeleton 
        width="100%"
        height="100%"
        backgroundColor={"#F3EEF5"}
        darkModeBackgroundColor={"#101012"}
        shineColor="#C5C1C7"
        darkModeShineColor="#1e1e1e"
        borderRadius={"32px"}
      />

      <Skeleton
        width="100%"
        height="100%"
        backgroundColor={"#F3EEF5"}
        darkModeBackgroundColor={"#101012"}
        shineColor="#C5C1C7"
        darkModeShineColor="#1e1e1e"
        borderRadius={"32px"}
      />

      <Skeleton
        width="100%"
        height="100%"
        backgroundColor={"#F3EEF5"}
        darkModeBackgroundColor={"#101012"}
        shineColor="#C5C1C7"
        darkModeShineColor="#1e1e1e"
        borderRadius={"32px"}
        className="col-span-2 row-span-2"
      />

      <Skeleton
        width="100%"
        height="100%"
        backgroundColor={"#F3EEF5"}
        darkModeBackgroundColor={"#101012"}
        shineColor="#C5C1C7"
        darkModeShineColor="#1e1e1e"
        borderRadius={"32px"}
        className="row-span-2"
      />
    </div>
  );
}
