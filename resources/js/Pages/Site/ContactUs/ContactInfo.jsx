
import { motion } from "framer-motion";
import {
  FiMapPin,
  FiPhoneCall,
  FiMail,
  FiInstagram,
  FiX,
  FiFacebook
} from "react-icons/fi";
import ContactMap from "./ContactMap";

export function ContactInfoSidebar({data}) {

  const contactTitle = data?.contact_title || "بيانات التواصل";
  // const contactAddress = data?.contact_address || "شارع إبراهيم الخليل، مكة المكرمة المملكة العربية السعودية";
  const workingHours = data?.working_hours || "يومياً من ٨ ص – ١٠ م";
  const contactEmail = data?.contact_email || "لا توجد بيانات";
  const contactPhone = data?.contact_phone || "لا توجد بيانات";
  const contactLocation = data?.contact_location ;

  const instaLink = data?.insta_link || "https://www.instagram.com";
  const fbLink = data?.fb_link || "https://www.facebook.com";
  const xLink = data?.x_link || "https://www.x.com";

  return (
    <motion.div
      className="lg:col-span-5 flex flex-col gap-8"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        visible: { transition: { staggerChildren: 0.15 } }
      }}
    >

      <div className="bg-[#fbf8f4] rounded-2xl p-8 border border-[#e8ddcc] shadow-sm">

        <h3 className="text-lg font-medium text-[#111813] mb-8 text-right"> {contactTitle}</h3>

        <div className="flex flex-col gap-6">
          {/* <InfoItem icon={<FiMapPin />} title="العنوان">
           {contactAddress}
          </InfoItem> */}

          <InfoItem icon={<FiPhoneCall />} title="خدمة العملاء">
            <span dir="ltr" className="block text-right">
              {contactPhone}
            </span>
            <span className="text-sm text-[#8a847b]">
             {workingHours}
            </span>
          </InfoItem>

          <InfoItem icon={<FiMail />} title="البريد الإلكتروني">
          {contactEmail}
          </InfoItem>
        </div>

        <div className="my-8 h-px bg-[#e5d8c5]" />

        <div className="flex flex-col gap-4 items-center">
          <span className="text-sm font-medium text-[#111813]">
            تابعنا على منصات التواصل
          </span>

          <div className="flex gap-3">
            <SocialButton icon={<FiInstagram />} link={instaLink} />
            <SocialButton icon={<FiX />} link={xLink}/>
            <SocialButton icon={<FiFacebook />} link={fbLink}/>
          </div>
        </div>
      </div>

      <ContactMap location={contactLocation}/>
    </motion.div>
  );
}


function InfoItem({ icon, title, children }) {
  return (
    <motion.div
      whileHover={{ x: -4 }}
      transition={{ duration: 0.25 }}
      className="flex items-start gap-4"
    >
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
    </motion.div>
  );
}

function SocialButton({ icon ,link}) {
  return (
     <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="h-9 w-9 rounded-full bg-white border border-[#1f4d2b] flex items-center justify-center text-[#1f4d2b] cursor-pointer hover:bg-[#1f4d2b] hover:text-white transition"
    >
      {icon}
    </a>
  );
}
