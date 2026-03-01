import { motion } from "framer-motion";
export default function ContactMap({location}) {
  const maplocation = location || "https://www.google.com/maps?q=Mecca+Saudi+Arabia";
  return (
    <motion.a
      href={maplocation}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.4 }}
      className="relative h-56 w-full rounded-2xl overflow-hidden block"
    >
      <motion.img
        whileHover={{ scale: 1.08 }}
        transition={{ duration: 0.6 }}
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_-5W6Tpu5Np7qDYLcMwofVMzzTMeObqcpC1C92nzafagKJmhaWa4RBpNPaS5kwFQ7pZPNzD25U3BEVGSPEhfe17TfR6u6HvCTB1bMvOPOXJYaL5T0hxPHW5Szi6gbKNMN1Q-WwKO36D3ScHjYmQdgB_64lZZxqtBErEXLkKU3PZ4ydDKQzRiwTTCWLcMqBRqKEHyngPngyFBdDSAYxPVajl-qRN7-19UQFxSCl4mFMp9hTh3H96G7UtzOPCFAAJnQ35utFPfjmqA"
        className="w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black/40" />

      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 1, y: 0 }}
       
          className="bg-white px-4 py-2 rounded-full flex items-center gap-2 shadow-lg"
        >
          <span className="text-red-600 text-lg">📍</span>
          <span className="text-sm font-medium text-[#111813]">
           مكة المكرمة، السعودية
          </span>
        </motion.div>
      </div>
    </motion.a>
  );
}

