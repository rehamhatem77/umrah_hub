import { MdFlight, MdHotel, MdDirectionsBus, MdRestaurant } from "react-icons/md";

const facilities = [
  { icon: MdFlight, label: "تذاكر طيران" },
  { icon: MdHotel, label: "فنادق ٥ نجوم" },
  { icon: MdDirectionsBus, label: "نقل VIP" },
  { icon: MdRestaurant, label: "إفطار وسحور" },
];

export default function OverviewSection() {
  return (
    <div className="flex flex-col gap-4" id="overview">
      <h3 className="text-2xl font-bold font-heading text-text-dark">
        نظرة عامة
      </h3>
      <p className="text-text-muted leading-relaxed text-lg">
        استمتع بروحانية العشر الأواخر في مكة المكرمة مع باقة مصممة خصيصاً لراحتك.
        تشمل هذه الباقة إقامة فاخرة قريبة من الحرم المكي، وتنقيلات خاصة بأحدث
        الباصات، مع مرشدين ذوي خبرة لمساعدتك في أداء المناسك بكل يسر وسهولة. تجربة
        لا تُنسى تجمع بين الروحانية والرفاهية.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
        {facilities.map((facility, index) => {
          const IconComponent = facility.icon;
          return (
            <div
              key={index}
              className="p-4 facility--item bg-primary rounded-xl flex flex-col items-center justify-center text-center gap-2"
            >
              <IconComponent className="text-accent-green text-3xl" />
              <span className="font-bold text-sm text-text-dark">
                {facility.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
