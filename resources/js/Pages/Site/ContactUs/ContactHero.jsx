export default function ContactHero() {
  return (
    <section className="w-full bg-[#f5efe54d] py-24 px-6">
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-6">

        <span className="inline-block rounded-full bg-[#c5a0591a] px-6 py-2 text-sm font-medium text-[#3a5f3b] border border-[#c5a05933]">
          نحن هنا لخدمتكم
        </span>

        <h1 className="text-[#111813] text-5xl md:text-6xl font-medium">
          تواصل معنا
        </h1>

        <p className="text-[#6f6a63] text-lg md:text-xl leading-relaxed max-w-2xl">
          نسعد بالإجابة على استفساراتكم ومساعدتكم في تخطيط رحلتكم المباركة.
          فريقنا متاح على مدار الساعة لخدمتكم.
        </p>

      </div>
    </section>
  );
}
