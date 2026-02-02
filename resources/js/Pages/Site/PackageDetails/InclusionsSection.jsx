import { FiCheckCircle, FiCheck } from "react-icons/fi";
import { MdCancel, MdClose } from "react-icons/md";

export default function InclusionsSection({ included = [], excluded = [] }) {
 included = [
  "تذاكر الطيران (ذهاب وعودة) على الخطوط السعودية",
  "تأشيرة العمرة والتأمين الطبي",
  "الاستقبال والتوديع في المطار",
  "جميع التنقلات الداخلية بباصات حديثة",
  "وجبتي الإفطار والسحور يومياً",
];

 excluded = [
  "المصاريف الشخصية والهدايا",
  "خدمات الغسيل والكي في الفندق",
  "أي وجبات إضافية غير مذكورة",
];  

return (
    <div
      className="grid md:grid-cols-2 gap-8 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm"
      id="inclusions"
    >
      {/* Included */}
      <div>
        <h3 className="text-lg font-bold font-heading text-text-dark mb-4 flex items-center gap-2">
           <FiCheckCircle className="text-accent-green text-xl" />
          يشمل السعر
        </h3>

        <ul className="space-y-3">
          {included.map((item, index) => (
            <li
              key={index}
              className="flex items-start gap-3 text-sm text-text-dark"
            >
              <FiCheck className="text-accent-green mt-0.5 shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Excluded */}
      <div>
        <h3 className="text-lg font-bold font-heading text-text-dark mb-4 flex items-center gap-2">
         <MdCancel className="text-red-400 text-xl" />
          لا يشمل السعر
        </h3>

        <ul className="space-y-3">
          {excluded.map((item, index) => (
            <li
              key={index}
              className="flex items-start gap-3 text-sm text-text-muted"
            >
               <MdClose className="text-red-300 mt-0.5 shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
