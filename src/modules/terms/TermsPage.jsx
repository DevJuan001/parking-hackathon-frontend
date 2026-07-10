import Icon from "@/globals/components/ui/Icon";

export default function TermsPage() {
  return (
    <section className="w-screen h-full flex items-center justify-center">
      <div className="w-4xl mt-3">
        <a
          href="/"
          className="w-fit flex items-center px-4 py-2 gap-2 rounded-3xl border border-[#E4E2E5]
          focus:animate-click-effect
          dark:text-white"
        >
          <Icon name={"arrow_back"} size={20} />

          <span className="text-sm">Volver</span>
        </a>
      </div>
    </section>
  );
}
