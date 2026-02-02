import { motion } from "framer-motion";
import { FiUser, FiMail, FiPhone, FiSend } from "react-icons/fi";
import Select from "react-select";
import { useState } from "react";
import toast from "react-hot-toast";
import { useForm } from "@inertiajs/react";

export function ContactForm() {
  const form = useForm({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const fadeUp = {
    hidden: { opacity: 0, y: 32 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const subjectOptions = [
    {  label: "حجز باقة عمرة" },
    { label: "استفسار عام" },
    {label: "دعم فني" },
  ];

  const selectStyles = {
    control: (base, state) => ({
      ...base,
      minHeight: "44px",
      borderRadius: "10px",
      borderColor: errors.subject
        ? "#ef4444"
        : state.isFocused
        ? "var(--app-primary)"
        : "#d1d5db",
      boxShadow: state.isFocused ? "0 0 0 2px rgba(15,61,46,.12)" : "none",
      cursor: "default",
      "&:hover": {
        borderColor: state.isFocused ? "var(--app-primary)" : "#9ca3af",
      },
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
        ? "var(--app-primary)"
        : state.isFocused
        ? "rgba(15,61,46,0.08)"
        : "#fff",
      color: state.isSelected ? "#fff" : "#333",
    }),
  };

  const validate = () => {
    const newErrors = {};
    if (!form.data.name.trim()) newErrors.name = "الاسم مطلوب";
    if (!form.data.email.trim()) newErrors.email = "البريد الإلكتروني مطلوب";
    else if (!/\S+@\S+\.\S+/.test(form.data.email))
      newErrors.email = "البريد الإلكتروني غير صالح";
    if (!form.data.message.trim()) newErrors.message = "الرسالة مطلوبة";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    form.post(route("contact.store"), {
       preserveScroll: true, 
      onSuccess: () => {
        toast.success("تم إرسال رسالتك بنجاح");
        form.reset();
        setErrors({});
      },
      onError: (serverErrors) => {
        setErrors(serverErrors);
        toast.error("يرجى تصحيح الأخطاء في النموذج");
      },
      onFinish: () => setLoading(false),
    });
  };

  return (
    <motion.div
      className="lg:col-span-7"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-2xl p-8 border border-[#e6e6e6] shadow-sm hover:shadow-md"
      >
        <h3 className="text-xl font-medium text-[#111813] mb-8 text-right">
          أرسل لنا رسالة
        </h3>

        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <Input
            label="الاسم الكامل"
            icon={<FiUser />}
            placeholder="أدخل اسمك الكريم"
            name="name"
            value={form.data.name}
            onChange={(e) => form.setData("name", e.target.value)}
            error={errors.name}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="البريد الإلكتروني"
              icon={<FiMail />}
              placeholder="example@email.com"
              dir="ltr"
              name="email"
              value={form.data.email}
              onChange={(e) => form.setData("email", e.target.value)}
              error={errors.email}
            />
            <Input
              label="رقم الجوال"
              icon={<FiPhone />}
              placeholder="+966 5x xxx xxxx"
              dir="ltr"
              name="phone"
              value={form.data.phone}
              onChange={(e) => form.setData("phone", e.target.value)}
              error={errors.phone}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-[#111813]">الموضوع</label>
            <Select
              options={subjectOptions}
              placeholder="اختر موضوع الرسالة"
              styles={selectStyles}
              isSearchable={false}
              className="mt-2 text-sm"
              classNamePrefix="react-select"
              menuPlacement="auto"
              isRtl
              onChange={(option) => form.setData("subject", option?.label || "")}
              value={
                subjectOptions.find((opt) => opt.label === form.data.subject) || null
              }
            />
            {errors.subject && (
              <p className="text-red-500 text-xs mt-1">{errors.subject}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-[#111813]">الرسالة</label>
            <textarea
              className={`w-full min-h-[140px] mt-2 rounded-lg border p-4 text-sm resize-none text-black
                focus:border-[#1f4d2b] focus:ring-2 focus:ring-[#1f4d2b]/20 transition-all
                ${errors.message ? "border-red-500" : "border-[#e3e3e3]"}`}
              placeholder="اكتب رسالتك هنا..."
              name="message"
              value={form.data.message}
              onChange={(e) => form.setData("message", e.target.value)}
            />
            {errors.message && (
              <p className="text-red-500 text-xs mt-1">{errors.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="h-12 rounded-lg bg-[#1f4d2b] text-white text-sm font-medium flex items-center justify-center gap-2 hover:bg-[#163b22] transition disabled:opacity-50"
          >
            {loading ? "جارٍ الإرسال..." : "إرسال الرسالة"}
            <FiSend />
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}

function Input({ label, icon, error, ...props }) {
  return (
    <div>
      <label className="text-sm font-medium text-[#111813]">{label}</label>
      <div className="relative mt-2 group">
        <input
          {...props}
          className={`w-full h-12 text-black rounded-lg px-10 text-sm
            focus:border-[#1f4d2b] focus:ring-2 focus:ring-[#1f4d2b]/20 transition-all
            ${error ? "border-red-500" : "border-[#e3e3e3]"}`}
        />
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af] group-focus-within:text-[#1f4d2b] transition">
          {icon}
        </span>
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
