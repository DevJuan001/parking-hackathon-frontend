import Skeleton from "@components/ui/Skeleton";

export default function UsersLoading() {
  return (
    <div className="h-full w-full flex flex-col gap-4 mt-20">
      <div
        className="w-full h-fit flex flex-wrap items-center justify-center gap-2
        md:flex-nowrap"
      >
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton
            key={index}
            width="48%"
            height="100px"
            shineColor="#C5C1C7"
            borderRadius={"20px"}
            backgroundColor={"#F3EEF5"}
            darkModeShineColor="#1e1e1e"
            darkModeBackgroundColor={"#101012"}
          />
        ))}
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
