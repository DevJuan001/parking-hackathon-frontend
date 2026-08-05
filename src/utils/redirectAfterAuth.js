export function redirectAfterAuth(navigate, freshData) {
  if (freshData.onboarding_completed === false) {
    navigate("/on-boarding");
    return;
  }

  if (freshData.data?.[0]?.role === "Maquina") {
    navigate("/check-in");
    return;
  }

  navigate("/home");
}
