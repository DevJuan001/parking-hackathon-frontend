// Hooks
import { useState } from "react";
import { useCreateEntry } from "@/modules/check-in/hooks/useCreateEntry";
// Componentes
import CreateEntrySection from "@/modules/check-in/components/ui/CreateEntrySection";
import SuccessEntrySection from "@/modules/check-in/components/ui/SuccessEntrySection";

export default function CheckInPage() {
  const [activeSection, setActiveSection] = useState("createEntry");
  const {
    entryData,
    setEntryData,
    message,
    loading,
    error,
    handleChange,
    handleSubmit,
  } = useCreateEntry(setActiveSection);

  return (
    <section className="w-screen h-screen flex flex-col items-center justify-between p-6 font-dmsans bg-noise">
      {activeSection === "createEntry" && (
        <CreateEntrySection
          entryData={entryData}
          loading={loading}
          error={error}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      )}

      {activeSection === "successEntry" && (
        <SuccessEntrySection
          setActiveSection={setActiveSection}
          message={message}
          setEntryData={setEntryData}
        />
      )}
    </section>
  );
}
