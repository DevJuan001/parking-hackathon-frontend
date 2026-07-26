import Skeleton from "@components/ui/Skeleton";

export default function FinanceLoading({ inside }) {
  return (
    <div
      className={`w-full grid grid-cols-1 grid-rows-[150px_150px_150px_300px] gap-3  font-dmsans
      ${inside ? "h-[90%]" : "h-full mt-18 mb-5"}
      md:grid-cols-3 md:grid-rows-5
      dark:text-[#E4E2E5]`}
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
        className="col-span-2 row-span-4"
      />

      <Skeleton
        width="100%"
        height="100%"
        backgroundColor={"#F3EEF5"}
        darkModeBackgroundColor={"#101012"}
        shineColor="#C5C1C7"
        darkModeShineColor="#1e1e1e"
        borderRadius={"32px"}
        className="row-span-4"
      />
    </div>
  );
}
