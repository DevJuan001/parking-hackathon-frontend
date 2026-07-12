import Skeleton from "@components/ui/Skeleton";

export default function UsersLoading() {
  return (
    <div className="h-full w-full flex flex-col gap-4 mt-[72px]">
      <div className="h-[11%] flex gap-4 items-center">
        <Skeleton
          height="100%"
          backgroundColor={"#F3EEF5"}
          darkModeBackgroundColor={"#101012"}
          shineColor="#C5C1C7"
          darkModeShineColor="#1e1e1e"
          borderRadius={"20px"}
        />

        <Skeleton
          height="100%"
          backgroundColor={"#F3EEF5"}
          darkModeBackgroundColor={"#101012"}
          shineColor="#C5C1C7"
          darkModeShineColor="#1e1e1e"
          borderRadius={"20px"}
        />

        <Skeleton
          height="100%"
          backgroundColor={"#F3EEF5"}
          darkModeBackgroundColor={"#101012"}
          shineColor="#C5C1C7"
          darkModeShineColor="#1e1e1e"
          borderRadius={"20px"}
        />

        <Skeleton
          height="100%"
          backgroundColor={"#F3EEF5"}
          darkModeBackgroundColor={"#101012"}
          shineColor="#C5C1C7"
          darkModeShineColor="#1e1e1e"
          borderRadius={"20px"}
        />
      </div>

      <Skeleton
        height="85%"
        backgroundColor={"#F3EEF5"}
        darkModeBackgroundColor={"#101012"}
        shineColor="#C5C1C7"
        darkModeShineColor="#1e1e1e"
        borderRadius={"20px"}
      />
    </div>
  );
}
