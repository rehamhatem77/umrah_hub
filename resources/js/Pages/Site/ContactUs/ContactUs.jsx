import SiteLayout from "@/Layouts/SiteLayout";
import { ContactInfoSidebar } from "./ContactInfo";
import { ContactForm } from "./ContactForm";
import ContactHero from "./ContactHero";

export default function ContactUs({contactUs}) {
    return (
        <SiteLayout title="Umrah Hub - تواصل معنا">
            <ContactHero data={contactUs}/>
            <div className=" row">
                <div className="w-full ">
                    <div className="flex justify-center">
                        <div className="w-full max-w-[1440px] px-4 md:px-10 lg:px-40">
                            <div className="flex flex-wrap gap-2 py-4">
                                <a
                                    className="text-gray-500 hover:text-primary text-sm font-medium leading-normal"
                                    href="/"
                                >
                                    الرئيسية
                                </a>
                                <span className="text-gray-400 text-sm font-medium leading-normal">
                                    /
                                </span>
                                <span className="text-[#111813] text-sm font-medium leading-normal">
                                    تواصل معنا 
                                </span>
                            </div>
                        </div>
                    </div>
                </div>



                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 pb-28 mt-16">

                    <ContactForm />
                    <ContactInfoSidebar data={contactUs} />

                </div>
            </div>


        </SiteLayout>
    );
}
