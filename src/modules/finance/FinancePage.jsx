import TopSection from "@/globals/components/ui/TopSection";

export default function FinancePage() {
  return (
    <main className="w-full h-full">
      <TopSection sectionName={"Finanzas"} exportButtonOnClick={() => alert()} />
    </main>
  );
}
