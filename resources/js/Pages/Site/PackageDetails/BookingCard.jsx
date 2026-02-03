 
import { FaCalendarAlt, FaArrowLeft, FaWhatsapp, FaShareAlt, FaHeart, FaHeadset, FaArrowRight } from "react-icons/fa";


export default function BookingCard({data }) {
 
  return (
 <div className="sticky top-24 flex flex-col gap-4">

  {/* Booking Card */}
  <div className="bg-white rounded-2xl p-6 shadow-lg border  text-black border-primary/50">
    
    {/* Price */}
    <div className="flex items-end justify-between mb-2">
      <span className="text-text-muted text-sm">يبدأ السعر من</span>
      <div className="text-right">
        <span className="text-3xl font-bold font-heading text-text-dark">
          ٤,٥٠٠
        </span>
        <span className="text-sm font-medium text-text-muted"> ر.س / شخص</span>
      </div>
    </div>

    {/* Date */}
    <div className="bg-primary/30 p-3 rounded-lg flex gap-3 items-center mb-6 border border-primary">
      <FaCalendarAlt className="text-accent-green text-lg" />
      <div className="flex flex-col">
        <span className="text-xs text-text-muted font-bold">
          تاريخ الرحلة القادمة
        </span>
        <span className="text-sm font-bold text-text-dark">
          ٢٠ رمضان - ٣٠ رمضان
        </span>
      </div>
    </div>

    {/* Buttons */}
    <div className="flex flex-col gap-3">
      <button className="btn--primary w-full h-12 bg-accent-green hover:bg-accent-green/90 text-white font-bold rounded-lg transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg">
        <span>احجز الآن</span>
        <FaArrowLeft className="text-sm rtl:rotate-180" />
      </button>

      <button className="btn--secondary w-full h-12 bg-white border border-accent-green text-accent-green font-bold rounded-lg transition-colors flex items-center justify-center gap-2 hover:bg-green-50">
        <FaWhatsapp />
        <span>تواصل عبر واتساب</span>
      </button>
    </div>

    {/* Share / Save */}
    <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-center gap-6">
      <button className="flex items-center gap-1 text-sm text-text-muted hover:text-text-dark transition-colors">
        <FaShareAlt />
        مشاركة
      </button>
      <button className="flex items-center gap-1 text-sm text-text-muted hover:text-text-dark transition-colors">
        <FaHeart />
        حفظ
      </button>
    </div>
  </div>

  {/* Need Help Card */}
  <div className="bg-primary rounded-xl p-5 border border-accent-gold/20 relative overflow-hidden
"
style={{background:"#f5efe5"}}>
    <div className="relative z-10">
      <h4 className="font-heading font-bold text-lg text-text-dark mb-1">
        هل تحتاج مساعدة؟
      </h4>
      <p className="text-sm text-text-muted mb-3">
        فريقنا جاهز للرد على استفساراتك على مدار الساعة.
      </p>
      <a
        className="text-accent-green font-bold text-sm flex items-center gap-1 hover:underline"
        href="#"
      >
        تواصل معنا
        <FaArrowRight className="text-sm rtl:rotate-180" />
      </a>
    </div>

    {/* Background Icon */}
    <FaHeadset style={{opacity:"0.05"}} className="absolute -bottom-6 -left-6 text-accent-gold/10 text-[120px]" />
  </div>

</div>

  );
}
