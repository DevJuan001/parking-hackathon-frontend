// Hooks
import { useCompleteOnBoarding } from "@/modules/on-boarding/hooks/useCompleteOnBoarding";
import { useOnboardingSections } from "@/modules/on-boarding/hooks/useOnboardingSections";
// Componentes
import ProgressBar from "@/modules/on-boarding/components/ui/ProgressBar";
import UserInfoSection from "@/modules/on-boarding/components/ui/UserInfoSection";
import ParkingNameSection from "@/modules/on-boarding/components/ui/ParkingNameSection";
import ParkingLocationSection from "@/modules/on-boarding/components/ui/ParkingLocationSection";

export default function OnBoardingPage() {
  const {
    form,
    loading,
    error,
    fieldError,
    handleChange,
    handleSubmit,
    validateSection,
  } = useCompleteOnBoarding();

  const { activeSection, progress, handleContinue, handleReturn } =
    useOnboardingSections(validateSection);

  return (
    <section className="w-screen h-screen flex flex-col items-center font-dmsans">
      <ProgressBar progress={progress} />

      <UserInfoSection
        activeSection={activeSection}
        form={form}
        handleChange={handleChange}
        fieldError={fieldError}
        continueButtonOnClick={handleContinue("userInfo", "parkingName", 200)}
      />

      <ParkingNameSection
        activeSection={activeSection}
        form={form}
        handleChange={handleChange}
        fieldError={fieldError}
        continueButtonOnClick={handleContinue(
          "parkingName",
          "parkingLocation",
          300,
        )}
        returnButtonOnClick={handleReturn("userInfo", 100)}
      />

      <ParkingLocationSection
        activeSection={activeSection}
        form={form}
        loading={loading}
        error={error}
        handleChange={handleChange}
        fieldError={fieldError}
        handleSubmit={handleSubmit}
        returnButtonOnClick={handleReturn("parkingName", 200)}
      />
    </section>
  );
}
