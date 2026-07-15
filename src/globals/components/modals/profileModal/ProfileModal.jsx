// Hooks
import { useState } from "react";
import { useInnerModal } from "@hooks/useInnerModal";
import { useCurrentUser } from "@hooks/useCurrentUser";
// Components
import Icon from "@components/ui/Icon";
import LiquidGlass from "@components/ui/LiquidGlass";
import GeneralContent from "@modals/profileModal/GeneralContent";
import AppearanceContent from "@modals/profileModal/AppearanceContent";
import SubscriptionContent from "@modals/profileModal/SubscriptionContent";
// Modals
import Modal from "@modals/Modal";
import EditInfoModal from "@modals/profileModal/EditInfoModal";
import ChangePasswordModal from "@modals/profileModal/ChangePasswordModal";

export default function ProfileModal({ triggerRef, onCloseModal }) {
  const { user } = useCurrentUser();
  const [activeSection, setActiveSection] = useState("general");
  const { innerTrigger, innerType, openInnerModal, closeInnerModal } =
    useInnerModal();

  return (
    <Modal
      isOpen={true}
      type={"user"}
      title={"Configuración"}
      location="center"
      triggerRef={triggerRef}
      onClose={onCloseModal}
    >
      <section
        className="h-full flex flex-col-reverse items-center justify-between gap-4
        md:grid md:grid-cols-[150px_1fr]"
      >
        <aside
          className="h-[15%] w-full justify-self-end mt-3 font-dmsans border-gray-300
          md:h-full md:justify-self-start md:self-start
          dark:border-[#3a3d43]"
        >
          {/* Lista de opciones */}
          <ul
            className="flex justify-center gap-1
            md:flex-col md:justify-start"
          >
            <li
              onClick={() => setActiveSection("general")}
              className={`w-full flex flex-col items-center py-2.5 px-3 rounded-2xl gap-2 text-xs transition
                hover:cursor-pointer
                md:flex-row md:w-full md:text-sm
                ${
                  activeSection === "general"
                    ? `bg-[#F5F3F6] font-medium text-[#44474e]
                      dark:text-white dark:bg-[#202022] dark:hover:bg-[#28282b]`
                    : `text-[#68676786] hover:bg-[#efedf0]
                      dark:hover:bg-[#101012] dark:hover:text-[#ffffff8a]`
                }`}
            >
              <Icon name={"apps"} size={24} />

              <span>General</span>
            </li>

            <li
              onClick={() => setActiveSection("appearance")}
              className={`w-full flex flex-col items-center py-2.5 px-3 rounded-2xl gap-2 transition
              hover:bg-[#efedf0] hover:cursor-pointer
              md:flex-row md:pr-0 md:pl-3
              dark:hover:bg-[#202022]
              ${
                activeSection === "appearance"
                  ? `bg-[#F5F3F6] font-medium text-[#44474e]
                    dark:text-white dark:bg-[#202022] dark:hover:bg-[#28282b]`
                  : `text-[#68676786] hover:bg-[#efedf0]
                    dark:hover:bg-[#101012] dark:hover:text-[#ffffff8a]`
              }`}
            >
              <Icon
                name={"palette"}
                size={24}
                fill={activeSection === "appearance" ? true : false}
              />

              <span
                className="text-xs 
                md:text-sm"
              >
                Apariencia
              </span>
            </li>

            <li
              onClick={() => setActiveSection("subscription")}
              className={`w-full flex flex-col items-center py-2.5 px-3 rounded-2xl gap-2 transition
              hover:bg-[#efedf0] hover:cursor-pointer
              md:flex-row md:pr-0 md:pl-3
              dark:hover:bg-[#202022]
              ${
                activeSection === "subscription"
                  ? `bg-[#F5F3F6] font-medium text-[#44474e]
                    dark:text-white dark:bg-[#202022] dark:hover:bg-[#28282b]`
                  : `text-[#68676786] hover:bg-[#efedf0]
                    dark:hover:bg-[#101012] dark:hover:text-[#ffffff8a]`
              }`}
            >
              <Icon
                name={"savings"}
                size={24}
                fill={activeSection === "subscription" ? true : false}
              />

              <span
                className="text-xs 
                md:text-sm"
              >
                Suscripción
              </span>
            </li>
          </ul>
        </aside>

        <section
          className="relative h-[85%] w-full flex flex-col px-2 gap-2 animate-blur-up
          md:h-full
          dark:text-white"
        >
          <LiquidGlass
            onClick={onCloseModal}
            className="absolute w-10 max-h-10 mt-3 mr-1 self-end p-2 rounded-full
            hover:cursor-pointer hover:bg-[#49454f21]"
          >
            <Icon name={"close"} />
          </LiquidGlass>

          {/* Contenido de la sección seleccionada */}
          {activeSection === "general" && (
            <GeneralContent
              user={user}
              openInnerModal={openInnerModal}
              onEditClick={(e) => {
                openInnerModal("editInfo", e);
              }}
              onPasswordClick={(e) => {
                openInnerModal("changePassword", e);
              }}
            />
          )}

          {activeSection === "appearance" && <AppearanceContent />}

          {activeSection === "subscription" && <SubscriptionContent />}

          {/* Modales Internas */}
          {innerType === "editInfo" && (
            <EditInfoModal
              user={user}
              triggerRef={innerTrigger}
              isOpen={true}
              onClose={closeInnerModal}
            />
          )}

          {innerType === "changePassword" && (
            <ChangePasswordModal
              triggerRef={innerTrigger}
              isOpen={true}
              onClose={closeInnerModal}
            />
          )}
        </section>
      </section>
    </Modal>
  );
}
