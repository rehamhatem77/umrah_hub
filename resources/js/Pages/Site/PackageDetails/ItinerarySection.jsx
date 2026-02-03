export default function ItinerarySection({ program }) {

 
  const itinerary = program ? parseProgram(program) :

    [
      {
        title: "اليوم ١: الوصول إلى جدة والتوجه لمكة",
        description:
          "الاستقبال في مطار الملك عبد العزيز بجدة بواسطة مندوبينا، ثم الانتقال عبر باصات VIP مكيفة إلى الفندق في مكة المكرمة لتسليم الغرف والاستراحة.",
        color: "bg-accent-green",
      },
      {
        title: "اليوم ٢: أداء مناسك العمرة",
        description:
          "التوجه إلى الحرم المكي لأداء مناسك العمرة جماعةً بإشراف مرشد ديني متخصص لشرح المناسك والدعاء.",
        color: "bg-accent-gold",
      },
      {
        title: "اليوم ٣ - ٧: التفرغ للعبادة في مكة",
        description:
          "أيام حرة للصلاة في الحرم المكي والاعتكاف، مع توفر وجبات الإفطار والسحور في الفندق.",
        color: "bg-gray-300",
      },
      {
        title: "اليوم ٨: المغادرة إلى المدينة المنورة",
        description:
          "السفر صباحاً بقطار الحرمين السريع إلى المدينة المنورة، والوصول للفندق القريب من المسجد النبوي.",
        color: "bg-gray-300",
      },
      {
        title: "اليوم ١٠: المغادرة",
        description:
          "التوجه إلى مطار المدينة المنورة للعودة إلى الديار بسلامة الله.",
        color: "bg-gray-300",
      },
    ];

function parseProgram(programHtml) {
  if (!programHtml) return [];

  const parser = new DOMParser();
  const doc = parser.parseFromString(programHtml, "text/html");
  const paragraphs = Array.from(doc.querySelectorAll("p"));

  const days = [];
  let currentDay = null;
  let tempTitle = null;

  paragraphs.forEach((p) => {
    const text = p.textContent.trim();
    if (!text) return;

    // اليوم
    if (/^اليوم\s+[\p{N}]+/u.test(text)) {
      currentDay = {
        title: text,
        dayTitle: "عنوان غير متوفر",
        description: "الوصف غير متوفر",
        color: "bg-gray-300",
      };
      days.push(currentDay);
      tempTitle = true; // next paragraph will be dayTitle
    } else if (currentDay && tempTitle) {
      // first paragraph after "اليوم X" → day title
      currentDay.dayTitle = text !== "عنوان اليوم:" ? text : "عنوان غير متوفر";
      tempTitle = false; // next paragraph will be description
    } else if (currentDay && !tempTitle) {
      // next paragraph → description
      currentDay.description = text !== "الوصف:" ? text : "الوصف غير متوفر";
    }
  });

  if (days.length) days[0].color = "bg-accent-green";
  if (days.length > 1) days[1].color = "bg-accent-gold";

  // Merge dayTitle into title if you want
  days.forEach(d => {
    d.title = `${d.title}: ${d.dayTitle}`;
  });

  return days;
}





  return (
    <div className="flex flex-col gap-6  text-black" id="itinerary">
      <h3 className="text-2xl font-bold font-heading text-text-dark">
        خط سير الرحلة
      </h3>

      <div className="relative border-r border-dashed border-gray-300 mr-3">
        {itinerary.map((day, index) => (
          <div
            key={index}
            className={`relative pr-8 ${index !== itinerary.length - 1 ? "mb-10" : ""
              }`}
          >
            {/* Timeline Dot */}
            <div
              className={`absolute -right-[7px] top-1 w-3.5 h-3.5 rounded-full ring-4 ring-white ${day.color}`}
            />

            {/* Title */}
            <h4 className="text-lg font-bold text-text-dark mb-2">
              {day.title}
            </h4>

            {/* Description */}
            <p className="text-text-muted leading-relaxed">
              {day.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}





