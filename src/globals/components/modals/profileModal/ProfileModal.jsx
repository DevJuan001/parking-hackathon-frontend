// Hooks
import { useState } from "react";
import { useInnerModal } from "@hooks/useInnerModal";
import { useCurrentUser } from "@hooks/useCurrentUser";
// Constantes
import { items } from "@constants/profileModalItems";
// Components
import Icon from "@components/ui/Icon";
import LiquidGlass from "@components/ui/LiquidGlass";
import GeneralContent from "@modals/profileModal/GeneralContent";
import AppearanceContent from "@modals/profileModal/AppearanceContent";
import SubscriptionContent from "@modals/profileModal/SubscriptionContent";
// Modals
import Modal from "@modals/Modal";
import EditInfoModal from "@modals/profileModal/EditInfoModal";
import ParkingInfoContent from "@modals/profileModal/ParkingInfoContent";
import ChangePasswordModal from "@modals/profileModal/ChangePasswordModal";

export default function ProfileModal({ triggerRef, onCloseModal }) {
  const { user, hasRole } = useCurrentUser();
  const [activeSection, setActiveSection] = useState("General");
  const { innerTrigger, innerType, openInnerModal, closeInnerModal } =
    useInnerModal();

  return (
    <Modal
      disableHeader
      isOpen={true}
      type={"user"}
      title={"Configuración"}
      location="center"
      triggerRef={triggerRef}
      onClose={onCloseModal}
    >
      <section
        className="h-full flex flex-col-reverse items-center justify-between gap-4
        md:grid md:grid-cols-[180px_1fr]"
      >
        <aside
          className="h-[15%] w-full justify-self-end p-1 font-dmsans border-gray-300
          md:h-full md:justify-self-start md:self-start
          dark:border-[#3a3d43]"
        >
          <ul
            className="flex justify-center gap-1
            md:flex-col md:justify-start"
          >
            {items
              ?.filter((item) => hasRole(item?.roles))
              .map((item, index) => (
                <li
                  key={index}
                  onClick={() => setActiveSection(item?.name)}
                  className={`w-full flex flex-col items-center py-2.5 px-3 rounded-2xl gap-2 text-xs transition
                hover:cursor-pointer
                md:flex-row md:w-full md:text-sm
                ${
                  activeSection === item?.name
                    ? `bg-[#F5F3F6] font-medium text-[#44474e]
                      dark:text-white dark:bg-[#202022] dark:hover:bg-[#28282b]`
                    : `text-[#68676786] hover:bg-[#efedf0]
                      dark:hover:bg-[#101012] dark:hover:text-[#ffffff8a]`
                }`}
                >
                  <Icon
                    name={item?.icon}
                    size={24}
                    fill={activeSection === item?.name ? true : false}
                    animateFill
                  />

                  <span>{item?.name}</span>
                </li>
              ))}
          </ul>
        </aside>

        <section
          className="relative h-full w-full flex flex-col gap-2 animate-blur-up overflow-hidden overflow-y-auto
          md:h-full
          dark:text-white"
        >
          {activeSection !== "Suscripción" && (
            <div
              className="h-fit flex items-center justify-between p-2
              md:hidden"
            >
              <span className="text-lg font-medium font-dmsans">
                Configuración
              </span>

              <LiquidGlass
                onClick={onCloseModal}
                className="flex h-11 p-2.5 rounded-full
              hover:cursor-pointer hover:bg-[#49454f21]"
              >
                <Icon name={"close"} />
              </LiquidGlass>
            </div>
          )}

          {/* Contenido de la sección seleccionada */}
          {activeSection === "General" && (
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

          {activeSection === "Parking" && <ParkingInfoContent />}

          {activeSection === "Apariencia" && <AppearanceContent />}

          {activeSection === "Suscripción" && <SubscriptionContent />}

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
