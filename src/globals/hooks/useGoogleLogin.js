import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { googleLoginService } from "@/globals/services/googleLoginService";
import { getCurrentUserService } from "@/globals/services/getCurrentUserService";

export function useGoogleLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const triggerRef = useRef(null);
  const popupRef = useRef(null);
  const oauthStateRef = useRef(null);
  const exchangingRef = useRef(false);
  const openInnerModalRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const showError = useCallback((message) => {
    const errorMessage =
      message || "No se pudo completar la autenticación con Google.";
    const openInnerModal = openInnerModalRef.current;
    const triggerButton = triggerRef.current;

    setLoading(false);
    exchangingRef.current = false;
    popupRef.current = null;
    oauthStateRef.current = null;

    if (typeof openInnerModal === "function") {
      openInnerModal(
        "googleError",
        { currentTarget: triggerButton },
        errorMessage,
      );
    }

    openInnerModalRef.current = null;
    triggerRef.current = null;
  }, []);

  const handleGoogleCode = useCallback(
    async (code) => {
      if (!code || exchangingRef.current) return;

      exchangingRef.current = true;
      setLoading(true);

      try {
        const response = await googleLoginService(code);

        if (response?.error) {
          showError(response.error);
          return;
        }

        const freshData = await queryClient.fetchQuery({
          queryKey: ["currentUser"],
          queryFn: getCurrentUserService,
        });

        if (freshData.onboarding_completed === false) {
          navigate("/on-boarding");
        } else if (freshData.data?.[0]?.role === "Cliente") {
          navigate("/check-in");
        } else {
          navigate("/home");
        }
      } catch {
        showError(
          "No se pudo completar la autenticación con Google. Intentá nuevamente más tarde.",
        );
      } finally {
        setLoading(false);
        exchangingRef.current = false;
      }
    },
    [navigate, queryClient, showError],
  );

  function handleGoogleLogin(event, openInnerModal) {
    if (!event?.currentTarget || typeof openInnerModal !== "function") return;

    triggerRef.current = event.currentTarget;
    openInnerModalRef.current = openInnerModal;
    popupRef.current = null;

    const state = window.crypto.randomUUID();
    oauthStateRef.current = state;

    const googleUrl = new URL(
      "https://accounts.google.com/o/oauth2/v2/auth",
    );

    googleUrl.search = new URLSearchParams({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      redirect_uri: import.meta.env.VITE_GOOGLE_REDIRECT_URL,
      response_type: "code",
      scope: "openid email profile",
      access_type: "offline",
      prompt: "select_account",
      state,
    }).toString();

    const popup = window.open(
      googleUrl.toString(),
      "google-oauth",
      "popup,width=500,height=600",
    );

    if (!popup) {
      showError("El navegador bloqueó la ventana de Google.");
      return;
    }

    popupRef.current = popup;
  }

  useEffect(() => {
    const onMessage = (event) => {
      if (event.origin !== window.location.origin) return;
      if (event.source !== popupRef.current) return;

      const data = event.data;
      if (data?.state !== oauthStateRef.current) return;

      popupRef.current = null;
      oauthStateRef.current = null;

      if (data.type === "google-oauth-code") {
        handleGoogleCode(data.code);
      } else if (data.type === "google-oauth-error") {
        showError(data.error);
      }
    };

    window.addEventListener("message", onMessage);

    return () => window.removeEventListener("message", onMessage);
  }, [handleGoogleCode, showError]);

  return { handleGoogleLogin, loading };
}
