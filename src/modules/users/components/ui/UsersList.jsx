// Hooks
import { useInfiniteScroll } from "@hooks/useInfiniteScroll";
// Constantes
import { userStatus } from "@/modules/users/constants/userStatus";
// Componentes
import Icon from "@components/ui/Icon";
import Avatar from "@components/ui/Avatar";
import Skeleton from "@components/ui/Skeleton";

export default function UsersList({
  users,
  loading,
  openModal,
  hasNextPage,
  fetchNextPage,
  isFetchingNextPage,
}) {
  const { getItemRef } = useInfiniteScroll({
    items: users,
    hasNextPage,
    fetchNextPage,
  });
  const noUsers = users.length === 0 && !loading;
  const isFirstLoad = users.length === 0 && loading;

  return (
    <section className="w-full h-full flex flex-col gap-2 overflow-hidden overflow-y-auto">
      {noUsers && (
        <div
          className="h-full w-full flex flex-col items-center justify-center gap-2 rounded-3xl text-[#75777E] bg-[#f5f3f6] font-dmsans
          dark:bg-[#101012] dark:text-[#7E8088]"
        >
          <Icon name={"border_clear"} size={70} />

          <span className="text-xl font-medium text-center">
            No se encontraron usuarios
          </span>
        </div>
      )}

      {isFirstLoad ? (
        <Skeleton
          width="100%"
          height="100%"
          backgroundColor={"#F3EEF5"}
          darkModeBackgroundColor={"#101012"}
          shineColor="#C5C1C7"
          darkModeShineColor="#1e1e1e"
        />
      ) : (
        !noUsers &&
        users.map((user, index) => (
          <div
            role="button"
            key={user.id}
            ref={getItemRef(index)}
            onClick={(e) => openModal(user, "editUser", e.currentTarget)}
            className="w-full flex items-center justify-between p-4 gap-2 rounded-4xl bg-[#F5F3F6]
            hover:bg-[#efedf0]
            dark:bg-[#101012] dark:text-[#E4E2E5] dark:hover:bg-[#202022]"
          >
            <div className="flex items-center gap-5">
              <Avatar user={user} />

              <div className="flex flex-col">
                <span className="font-medium">
                  {user.name} {user.first_surname}
                </span>

                <span
                  className="text-sm text-[#75777E]
                  dark:text-[#7E8088]"
                >
                  {user.role_name}
                </span>
              </div>
            </div>

            <div
              className={`flex items-center py-1 px-2 gap-1 rounded-full font-medium ${userStatus[user.status]?.styles}`}
            >
              <Icon
                name={userStatus[user.status]?.icon}
                size={12}
                fill={userStatus[user.status]?.fill}
              />

              <span>{userStatus[user.status]?.text}</span>
            </div>
          </div>
        ))
      )}

      {isFetchingNextPage && (
        <Skeleton
          width="100%"
          height="100%"
          backgroundColor={"#F3EEF5"}
          darkModeBackgroundColor={"#101012"}
          shineColor="#C5C1C7"
          darkModeShineColor="#1e1e1e"
        />
      )}
    </section>
  );
}
