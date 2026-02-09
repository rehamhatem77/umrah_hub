import { Link } from "@inertiajs/react";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div
      dir="rtl"
      className="min-h-screen flex items-center justify-center bg-[#fafafa] px-6"
    >
      <div className="text-center max-w-md">

        {/* 404 */}
        <motion.h1
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="text-[120px] font-extrabold text-[var(--app-primary)] leading-none"
        >
          404
        </motion.h1>

        {/* Title */}
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-2xl font-bold text-gray-800 mt-4"
        >
          الصفحة غير موجودة
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-500 mt-3 leading-relaxed"
        >
          يبدو أنك دخلت على رابط غير صحيح أو أن الصفحة تم حذفها.
        </motion.p>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 flex gap-4 justify-center"
        >
          <Link
            href="/"
            className="px-6 py-3 rounded-full bg-[var(--app-primary)] text-white font-semibold shadow-sm hover:opacity-90 transition"
          >
            الصفحة الرئيسية
          </Link>

          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 rounded-full border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition"
          >
            رجوع
          </button>
        </motion.div>
      </div>
    </div>
  );
}
