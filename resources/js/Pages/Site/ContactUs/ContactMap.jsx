import { motion } from "framer-motion";
export default function ContactMap() {
  return (

    <motion.div
    
    href="https://www.google.com/maps?q=Mecca+Saudi+Arabia"
      target="_blank"
      whileHover={{ scale: 1.02 }}
      className="relative h-56 w-full rounded-2xl overflow-hidden block cursor-pointer"
    >
    




  
    <a
      href="https://www.google.com/maps?q=Mecca+Saudi+Arabia"
      target="_blank"
      rel="noopener noreferrer"
      className="relative h-56 w-full rounded-2xl overflow-hidden block"
    >

      <img
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_-5W6Tpu5Np7qDYLcMwofVMzzTMeObqcpC1C92nzafagKJmhaWa4RBpNPaS5kwFQ7pZPNzD25U3BEVGSPEhfe17TfR6u6HvCTB1bMvOPOXJYaL5T0hxPHW5Szi6gbKNMN1Q-WwKO36D3ScHjYmQdgB_64lZZxqtBErEXLkKU3PZ4ydDKQzRiwTTCWLcMqBRqKEHyngPngyFBdDSAYxPVajl-qRN7-19UQFxSCl4mFMp9hTh3H96G7UtzOPCFAAJnQ35utFPfjmqA"
        className="w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black/40" />

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-white px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
          <span className="text-red-600 text-lg">📍</span>
          <span className="text-sm font-medium text-[#111813]">
            مقرنا الرئيسي
          </span>
        </div>
      </div>

    </a>

      </motion.div>
  );
}
