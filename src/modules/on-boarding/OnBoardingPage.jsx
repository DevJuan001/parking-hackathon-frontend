// Hooks
import { useCurrentUser } from "@hooks/useCurrentUser";
import { useCompleteOnBoarding } from "@/modules/on-boarding/hooks/useCompleteOnBoarding";
import { useOnboardingSections } from "@/modules/on-boarding/hooks/useOnboardingSections";
// Componentes
import ProgressBar from "@/modules/on-boarding/components/ui/ProgressBar";
import UserInfoSection from "@/modules/on-boarding/components/ui/UserInfoSection";
import ParkingNameSection from "@/modules/on-boarding/components/ui/ParkingNameSection";
import ParkingLocationSection from "@/modules/on-boarding/components/ui/ParkingLocationSection";

export default function OnBoardingPage() {
  const { user } = useCurrentUser();
  const {
    form,
    loading,
    error,
    fieldError,
    handleChange,
    handleSubmit,
    validateSection,
  } = useCompleteOnBoarding(user);

  const { activeSection, progress, handleContinue, handleReturn } =
    useOnboardingSections(validateSection);

  return (
    <section className="w-screen h-screen flex flex-col items-center font-dmsans">
      <ProgressBar progress={progress} />

      {activeSection === "userInfo" && (
        <UserInfoSection
          form={form}
          handleChange={handleChange}
          fieldError={fieldError}
          continueButtonOnClick={handleContinue("userInfo", "parkingName", 66)}
        />
      )}

      {activeSection === "parkingName" && (
        <ParkingNameSection
          form={form}
          handleChange={handleChange}
          fieldError={fieldError}
          continueButtonOnClick={handleContinue(
            "parkingName",
            "parkingLocation",
            100,
          )}
          returnButtonOnClick={handleReturn("userInfo", 33)}
        />
      )}

      {activeSection === "parkingLocation" && (
        <ParkingLocationSection
          form={form}
          loading={loading}
          error={error}
          handleChange={handleChange}
          fieldError={fieldError}
          handleSubmit={handleSubmit}
          returnButtonOnClick={handleReturn("parkingName", 66)}
        />
      )}
    </section>
  );
}
