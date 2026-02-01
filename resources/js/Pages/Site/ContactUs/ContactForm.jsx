import { motion } from "framer-motion";
import { FiUser, FiMail, FiPhone, FiSend } from "react-icons/fi";

export function ContactForm() {
  return (
    <motion.div
      className="lg:col-span-7"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="bg-white rounded-2xl p-8 border border-[#e6e6e6] shadow-sm">

        <h3 className="text-xl font-medium text-[#111813] mb-8 text-right">
          أرسل لنا رسالة
        </h3>

        <form className="flex flex-col gap-6">

          <Input label="الاسم الكامل" icon={<FiUser />} placeholder="أدخل اسمك الكريم" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="البريد الإلكتروني"
              icon={<FiMail />}
              placeholder="example@email.com"
              dir="ltr"
            />
            <Input
              label="رقم الجوال"
              icon={<FiPhone />}
              placeholder="+966 5x xxx xxxx"
              dir="ltr"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-[#111813]">
              الموضوع
            </label>
            <select className="w-full h-12 mt-2 rounded-lg border border-[#e3e3e3] px-4 text-sm text-[#6b7280]">
              <option>اختر موضوع الرسالة</option>
              <option>حجز باقة عمرة</option>
              <option>استفسار عام</option>
              <option>دعم فني</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-[#111813]">
              الرسالة
            </label>
            <textarea
              className="w-full min-h-[140px] mt-2 rounded-lg border border-[#e3e3e3] p-4 text-sm resize-none"
              placeholder="اكتب رسالتك هنا..."
            />
          </div>

          <button className="h-12 rounded-lg bg-[#1f4d2b] text-white text-sm font-medium flex items-center justify-center gap-2 hover:bg-[#163b22] transition">
            إرسال الرسالة
            <FiSend />
          </button>

        </form>
      </div>
    </motion.div>
  );
}

function Input({ label, icon, ...props }) {
  return (
    <div>
      <label className="text-sm font-medium text-[#111813]">
        {label}
      </label>
      <div className="relative mt-2">
        <input
          {...props}
          className="w-full h-12 rounded-lg border border-[#e3e3e3] px-10 text-sm"
        />
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af]">
          {icon}
        </span>
      </div>
    </div>
  );
}
