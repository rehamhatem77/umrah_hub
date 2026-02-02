import Footer from "@/Components/Footer";
import WhatsAppButton from "@/Components/WhatsappButton";
import HomeHeader from "@/Pages/Site/Home/HomeHeader";
import { Head, usePage } from "@inertiajs/react";

export default function SiteLayout({ children, title }) {
  const { footer } = usePage().props;
  return (
    <>
      <Head title={title || "Umrah Hub"} />

      <div
        dir="rtl"
        className="bg-background-light dark:bg-background-dark text-[#111813] dark:text-white min-h-screen flex flex-col"
      >
        <HomeHeader />

        <main className="flex-grow">
          {children}
        </main>

        <Footer footer={footer}/>
          <WhatsAppButton />
      </div>
    </>
  );
}
