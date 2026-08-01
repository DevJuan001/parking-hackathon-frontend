import { useState, useCallback } from "react";

export const useInnerModal = () => {
  const [innerModal, setInnerModal] = useState({
    type: null,
    trigger: { element: null, rect: null },
    data: null,
  });

  const openInnerModal = useCallback((type, e = null, data = null) => {
    const triggerData = e?.currentTarget
      ? {
          element: e.currentTarget,
          rect: e.currentTarget.getBoundingClientRect(),
        }
      : { element: null, rect: null };

    setInnerModal({ type, trigger: triggerData, data });
  }, []);

  const closeInnerModal = useCallback(() => {
    setInnerModal({
      type: null,
      trigger: { element: null, rect: null },
      data: null,
    });
  }, []);

  return {
    innerType: innerModal.type,
    innerTrigger: innerModal.trigger,
    innerData: innerModal.data,
    openInnerModal,
    closeInnerModal,
  };
};
