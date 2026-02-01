
import { motion } from "framer-motion";
import {
  FiMapPin,
  FiPhoneCall,
  FiMail,
  FiInstagram,
  FiX
} from "react-icons/fi";
import ContactMap from "./ContactMap";

export function ContactInfoSidebar() {
  return (
    <motion.div
      className="lg:col-span-5 flex flex-col gap-8"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1, duration: 0.6 }}
    >

      <div className="bg-[#fbf8f4] rounded-2xl p-8 border border-[#e8ddcc] shadow-sm">

        <h3 className="text-lg font-medium text-[#111813] mb-8 text-right">
          بيانات التواصل
        </h3>

        <div className="flex flex-col gap-6">
          <InfoItem icon={<FiMapPin />} title="العنوان">
            شارع إبراهيم الخليل، مكة المكرمة
            <br />
            المملكة العربية السعودية
          </InfoItem>

          <InfoItem icon={<FiPhoneCall />} title="خدمة العملاء">
            <span dir="ltr" className="block text-right">
              +966 12 345 6789
            </span>
            <span className="text-sm text-[#8a847b]">
              يومياً من ٨ ص – ١٠ م
            </span>
          </InfoItem>

          <InfoItem icon={<FiMail />} title="البريد الإلكتروني">
            info@umrahhub.com
          </InfoItem>
        </div>

        <div className="my-8 h-px bg-[#e5d8c5]" />

        <div className="flex flex-col gap-4 items-center">
          <span className="text-sm font-medium text-[#111813]">
            تابعنا على منصات التواصل
          </span>

          <div className="flex gap-3">
            <SocialButton icon={<FiInstagram />} />
            <SocialButton icon={<FiX />} />
          </div>
        </div>
      </div>

      <ContactMap />
    </motion.div>
  );
}


function InfoItem({ icon, title, children }) {
  return (
    <div className="flex items-start gap-4">
      <div className="h-10 w-10 flex items-center justify-center rounded-full bg-white border border-[#1f4d2b] text-[#1f4d2b]">
        {icon}
      </div>

      <div className="flex flex-col gap-1 text-right">
        <span className="text-sm font-medium text-[#111813]">
          {title}
        </span>
        <div className="text-sm text-[#6f6a63] leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
}

function SocialButton({ icon }) {
  return (
    <div className="h-9 w-9 rounded-full bg-white border border-[#1f4d2b]
    flex items-center justify-center text-[#1f4d2b] cursor-pointer hover:bg-[#1f4d2b] hover:text-white transition">
      {icon}
    </div>
  );
}
