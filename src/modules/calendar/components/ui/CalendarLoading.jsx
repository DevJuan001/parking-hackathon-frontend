import Skeleton from "@/globals/components/ui/Skeleton";

export default function CalendarLoading() {
  return (
    <div className="w-full h-[90%] grid grid-cols-7 grid-rows-[50px_repeat(6,1fr)] mt-18 gap-2">
      {Array.from({ length: 7 }).map((_, index) => (
        <Skeleton
          key={index}
          width="100%"
          height="100%"
          backgroundColor={"#F3EEF5"}
          darkModeBackgroundColor={"#101012"}
          shineColor="#C5C1C7"
          darkModeShineColor="#1e1e1e"
          borderRadius={"16px"}
        />
      ))}

      {Array.from({ length: 40 }).map((_, index) => (
        <Skeleton
          key={index}
          width="100%"
          height="100%"
          backgroundColor={"#F3EEF5"}
          darkModeBackgroundColor={"#101012"}
          shineColor="#C5C1C7"
          darkModeShineColor="#1e1e1e"
          borderRadius={"24px"}
        />
      ))}
    </div>
  );
}
