import {
  FaInstagram,
  FaTwitter,
  FaFacebookF,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer
      className="text-white pt-14 transform-gpu  " 
      style={{ backgroundColor: "var(--app-primary)" }}
    >
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
<div className="relative ">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            Umrah Hub
            <span className="w-6 h-6 rounded-full bg-white text-[var(--app-primary)] flex items-center justify-center text-sm">
              🕋
            </span>
          </h2>

          <p className="text-sm leading-relaxed text-white/80 mb-6">
            منصة متخصصة في تقديم خدمات العمرة المتكاملة، نسعى لتوفير تجربة
            روحانية ميسّرة ومريحة لضيوف الرحمن من جميع أنحاء العالم.
          </p>

          <div className="flex gap-3">
            {[<FaFacebookF />, <FaInstagram />, <FaTwitter />].map((icon, i) => (
              <a
                key={i}
                href="#"
                className="w-9 h-9 rounded-full border border-white/30
                flex items-center justify-center text-white/80
                hover:bg-white hover:text-[var(--app-primary)]
                transition"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>
        <div className="">
          <h3 className="font-semibold mb-5 text-lg">روابط سريعة</h3>
          <ul className="space-y-3 text-sm text-white/80">
            <li>الرئيسية</li>
            <li>الباقات</li>
            <li>من نحن</li>
            <li>اتصل بنا</li>
          </ul>
        </div>
        <div className="">
          <h3 className="font-semibold mb-5 text-lg">خدماتنا</h3>
          <ul className="space-y-3 text-sm text-white/80">
            <li>إصدار التأشيرات</li>
            <li>حجز الفنادق</li>
            <li>خدمات النقل VIP</li>
            <li>زيارة المزارات</li>
          </ul>
        </div>

        <div className="">
          <h3 className="font-semibold mb-5 text-lg">تواصل معنا</h3>
          <ul className="space-y-4 text-sm text-white/80">
            <li className="flex items-start gap-3">
              <FaMapMarkerAlt className="mt-1 text-white/60" />
              <span>
                شارع الملك عبدالعزيز، مكة المكرمة  
                <br /> المملكة العربية السعودية
              </span>
            </li>
            <li className="flex items-center gap-3">
              <FaPhoneAlt className="text-white/60" />
              <span>+966 12 345 6789</span>
            </li>
            <li className="flex items-center gap-3">
              <FaEnvelope className="text-white/60" />
              <span>info@umrahhub.com</span>
            </li>
          </ul>
        </div>

        
        

        
      </div>

      <div className="mt-14 border-t border-white/10 py-6 text-center text-sm text-white/60 ">
        جميع الحقوق محفوظة © Umrah Hub 2025
      </div>
    </footer>
  );
}
