// Hooks
import { useCurrentUser } from "@hooks/useCurrentUser";
import { useCompleteOnBoarding } from "@/modules/on-boarding/hooks/useCompleteOnBoarding";
import { useOnboardingSections } from "@/modules/on-boarding/hooks/useOnboardingSections";
// Componentes
import ProgressBar from "@/modules/on-boarding/components/ui/ProgressBar";
import UserInfoSection from "@/modules/on-boarding/components/ui/UserInfoSection";
import ParkingNameSection from "@/modules/on-boarding/components/ui/ParkingNameSection";
import ParkingScheduleInfo from "@/modules/on-boarding/components/ui/ParkingScheduleInfo";
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
          fieldError={fieldError}
          handleChange={handleChange}
          continueButtonOnClick={handleContinue("userInfo", "parkingName", 50)}
        />
      )}

      {activeSection === "parkingName" && (
        <ParkingNameSection
          form={form}
          fieldError={fieldError}
          handleChange={handleChange}
          continueButtonOnClick={handleContinue(
            "parkingName",
            "parkingLocation",
            75,
          )}
          returnButtonOnClick={handleReturn("userInfo", 25)}
        />
      )}

      {activeSection === "parkingLocation" && (
        <ParkingLocationSection
          form={form}
          fieldError={fieldError}
          handleChange={handleChange}
          continueButtonOnClick={handleContinue(
            "parkingLocation",
            "parkingSchedule",
            100,
          )}
          returnButtonOnClick={handleReturn("parkingName", 50)}
        />
      )}

      {activeSection === "parkingSchedule" && (
        <ParkingScheduleInfo
          form={form}
          error={error}
          loading={loading}
          fieldError={fieldError}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          returnButtonOnClick={handleReturn("parkingLocation", 75)}
        />
      )}
    </section>
  );
}
