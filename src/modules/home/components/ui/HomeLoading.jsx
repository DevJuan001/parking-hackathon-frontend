import Skeleton from "@/globals/components/ui/Skeleton";

export default function HomeLoading() {
  return (
    <div className="w-full h-full grid grid-cols-2 grid-rows-2 gap-5">
      <Skeleton
        height="100%"
        backgroundColor={"#F3EEF5"}
        darkModeBackgroundColor={"#101012"}
        shineColor="#C5C1C7"
        darkModeShineColor="#1e1e1e"
        borderRadius={"50px"}
        className={"row-span-2"}
      />

      <Skeleton
        height="100%"
        backgroundColor={"#F3EEF5"}
        darkModeBackgroundColor={"#101012"}
        shineColor="#C5C1C7"
        darkModeShineColor="#1e1e1e"
        borderRadius={"50px"}
      />

      <Skeleton
        height="100%"
        backgroundColor={"#F3EEF5"}
        darkModeBackgroundColor={"#101012"}
        shineColor="#C5C1C7"
        darkModeShineColor="#1e1e1e"
        borderRadius={"50px"}
      />
    </div>
  );
}
