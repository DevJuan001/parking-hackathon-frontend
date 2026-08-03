// Hooks
import { useState } from "react";
// Componentes
import Icon from "@components/ui/Icon";
import { QRCodeSVG } from "qrcode.react";

export default function ShareModal({
  link = "https://parking-hackathon-frontend.onrender.com/calendar",
}) {
  const [copied, setCopied] = useState(false);

  return (
    <div className="flex flex-col items-center gap-5 font-dmsans">
      <span className="font-semibold">Compartir</span>

      <span
        className="text-center text-[#75777E]
        dark:text-[#7E8088]"
      >
        Ofrece a tus clientes la comodidad de reservar su plaza antes de llegar
        y sorpréndelos con una experiencia de estacionamiento excepcional.
      </span>

      <QRCodeSVG
        value={link}
        size={256}
        imageSettings={{
          src: "parking-logo.svg",
          height: 64,
          width: 64,
          excavate: true,
        }}
      />

      <div
        className="h-fit w-full flex items-center justify-between bg-[#F5F3F6] rounded-4xl
        dark:bg-[#101012]"
      >
        <a
          href={`${link}`}
          className="w-full p-5 text-sm text-nowrap text-ellipsis overflow-hidden
          hover:text-blue-700 hover:underline
          dark:text-white"
        >
          {link}
        </a>

        <button
          onClick={() => setCopied(true)}
          className="h-full w-fit flex items-center gap-2 py-4 p-6 bg-black rounded-4xl text-sm text-white
          active:animate-click-effect
          dark:bg-white dark:text-black"
        >
          <Icon
            name={copied ? "check" : "content_copy"}
            className={
              copied
                ? "text-green-600"
                : `text-white
              dark:text-black`
            }
            size={20}
          />

          <span className="text-nowrap font-medium">
            {copied ? "Copiado" : "Copiar link"}
          </span>
        </button>
      </div>
    </div>
  );
}
