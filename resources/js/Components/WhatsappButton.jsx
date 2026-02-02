import { FaWhatsapp } from "react-icons/fa";
import { usePage } from "@inertiajs/react";

export default function WhatsAppButton() {
    const { footer } = usePage().props;

    if (!footer?.contact_phone) return null;
    const phone = footer?.contact_phone.replace(/\s+/g, "");

    return (
        <a
            href={`https://wa.me/${phone}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="
        fixed bottom-6 right-6 z-50
        w-16 h-16
        bg-[#25D366]
        rounded-full
        flex items-center justify-center
        text-white text-3xl
        shadow-xl
        animate-whatsapp
        hover:scale-110
        transition-transform duration-300
      "
        >
            <FaWhatsapp />
        </a>
    );
}
