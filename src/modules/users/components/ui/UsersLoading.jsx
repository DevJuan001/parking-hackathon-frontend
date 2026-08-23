import Skeleton from "@components/ui/Skeleton";

export default function UsersLoading() {
  return (
    <div className="h-full w-full flex flex-col gap-4 mt-20">
      <div className="h-[12.5%] flex gap-4 items-center">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton
            key={index}
            height="100%"
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
