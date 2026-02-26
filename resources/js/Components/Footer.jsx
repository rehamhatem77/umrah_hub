import {
    FaInstagram,
    FaTwitter,
    FaFacebookF,
    FaMapMarkerAlt,
    FaPhoneAlt,
    FaEnvelope,
} from "react-icons/fa";

export default function Footer({ footer, services }) {
    // if (!footer) return null;

    const socialLinks = [
        { icon: <FaFacebookF />, url: footer?.fb_link || "" },
        { icon: <FaInstagram />, url: footer?.insta_link || "" },
        { icon: <FaTwitter />, url: footer?.x_link || "" },
    ];

    return (
        <footer
            className="text-white pt-14 transform-gpu"
            style={{ backgroundColor: "var(--app-primary)" }}
        >
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                <div className="relative">
                    <img
                        src="/whitelogo.png"
                        alt="Umrah Hub"
                        style={{ width: "130px", height: "auto" }}
                    />

                    <p className="text-sm leading-relaxed text-white/80 mb-6">
                        {footer?.footer_desc ||
                            "منصة متخصصة في تقديم خدمات العمرة المتكاملة..."}
                    </p>

                    <div className="flex gap-3">
                        {socialLinks.map(
                            (social, i) =>
                                social.url && (
                                    <a
                                        key={i}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-9 h-9 rounded-full border border-white/30
                      flex items-center justify-center text-white/80
                      hover:bg-white hover:text-[var(--app-primary)]
                      transition"
                                    >
                                        {social.icon}
                                    </a>
                                ),
                        )}
                    </div>
                </div>

                <div>
                    <h3 className="font-semibold mb-5 text-lg">روابط سريعة</h3>
                    <ul className="space-y-3 text-sm text-white/80">
                        {footer?.quick_links?.map((link, i) => (
                            <li key={i}>{link}</li>
                        )) || (
                            <>
                                <ul className="space-y-3 text-sm text-white/80">
                                    <li>
                                        <a
                                            href="/"
                                            className="hover:text-white transition"
                                        >
                                            الرئيسية
                                        </a>
                                    </li>

                                    <li>
                                        <a
                                            href="/packages"
                                            className="hover:text-white transition"
                                        >
                                            الباقات
                                        </a>
                                    </li>

                                    <li>
                                        <a
                                            href="/about"
                                            className="hover:text-white transition"
                                        >
                                            من نحن
                                        </a>
                                    </li>

                                    <li>
                                        <a
                                            href="/contact"
                                            className="hover:text-white transition"
                                        >
                                            اتصل بنا
                                        </a>
                                    </li>
                                </ul>
                            </>
                        )}
                    </ul>
                </div>
                {services?.length > 0 && (
                    <div>
                        <h3 className="font-semibold mb-5 text-lg">خدماتنا</h3>
                        <ul className="space-y-3 text-sm text-white/80">
                            {services.map((service, i) => (
                                <li key={i}>{service.name}</li>
                            ))}
                        </ul>
                    </div>
                )}

                <div>
                    <h3 className="font-semibold mb-5 text-lg">تواصل معنا</h3>
                    <ul className="space-y-4 text-sm text-white/80">
                        {/* {footer?.contact_address && (
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="mt-1 text-white/60" />
                <span>{footer?.contact_address || ""}</span>
              </li>
            )} */}
                        {footer?.contact_phone && (
                            <li className="flex items-center gap-3">
                                <FaPhoneAlt className="text-white/60" />
                                <span dir="ltr">
                                    {footer?.contact_phone || ""}
                                </span>
                            </li>
                        )}
                        {footer?.contact_email && (
                            <li className="flex items-center gap-3">
                                <FaEnvelope className="text-white/60" />
                                <a
                                    href={`mailto:${footer?.contact_email || ""}?subject=تواصل مع Umrah Hub`}
                                    className="hover:text-white transition"
                                >
                                    {footer?.contact_email || ""}
                                </a>
                            </li>
                        )}
                    </ul>
                </div>
            </div>

            <div className="mt-14 border-t border-white/10 py-6 text-center text-sm text-white/60">
                جميع الحقوق محفوظة © Umrah Hub 2026
            </div>
        </footer>
    );
}
