import NavLink from "@/Components/NavLink";

export default function HomeHeader() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b">
      <div className="relative flex items-center px-6 lg:px-40 py-4">

       
        <div className="flex items-center gap-2 font-semibold z-10">
          <img
            src="/public/favicon.ico"
            alt="Umrah Hub"
            className="w-6 h-6"
          />
          <span className="text-lg text-[var(--app-primary)]">
            Umrah Hub
          </span>
        </div>

        <nav className="absolute left-1/2 -translate-x-1/2 hidden lg:flex gap-10 text-sm font-medium text-gray-700">
          <NavLink href="/">الرئيسية</NavLink>
          <NavLink href="/packages">الباقات</NavLink>
          <NavLink href="/about">من نحن</NavLink>
          <NavLink href="/contact">اتصل بنا</NavLink>
        </nav>

      </div>
    </header>
  );
}
