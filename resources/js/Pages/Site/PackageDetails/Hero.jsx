export default function Hero( ) {
 
 
  return (
   <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[400px] md:h-[500px]">
  {/* Main Image */}
  <div className="md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-2xl">
    <div
      className="w-full h-full bg-center bg-cover transition-transform duration-700 group-hover:scale-105"
      data-alt="Pilgrims circumambulating the Kaaba in Mecca showing spiritual atmosphere"
      style={{
        backgroundImage:
          'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB4cnwv51Hp2BvT4Hor6Yz4Os9BpisDvy5fWbfiu4KVw0vfzi-fJtkqyLMUjX1B5c4wSMkF_10bX33pgTM83qUbdZYudyFRqdhBC7WBDpmvjNat3FT_Y5QQHJ4FsZzonXpAQVgm_z5WZ59pq962TydztN_Jlg1vVZRrivgG-HomUoIor6wTasJg2sDbEwV6xScCaWy71xT09LZp7aHjBKdwyfnzkLJ_qvL5lae4kGypU0uhqDk0J_1bMP9SXhVb7P_HtuC5DRJmZ-s")'
      }}
    ></div>
    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
    <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-text-dark flex items-center gap-1">
      <span className="material-symbols-outlined text-sm">photo_camera</span>{" "}
      مشاهدة الكل (١٢)
    </div>
  </div>
  {/* Secondary Images */}
  <div className="relative group overflow-hidden rounded-2xl hidden md:block">
    <div
      className="w-full h-full bg-center bg-cover transition-transform duration-700 group-hover:scale-105"
      data-alt="Interior view of a luxury hotel room in Mecca with view of Haram"
      style={{
        backgroundImage:
          'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB6RAG0VQMa28BkH8IvINBCBw-mHCApy6-8Ii8iiCg72AhBojTLi0Qf5KYDYQuMT0qc2x0rt_M1z7exgsun8n0K7K5zowuD09NDJNb6kt_ibdjKmDkm86_zjI_nGjrtM8xH7-FaKamDLdRuB2pLAOGi4gUoonDBxcinTJjt6dMvWMlJytRy_C5gbIsn_q3N5OyjV-NSm64aLr3rejZmGrAM3VOeEqVEzG_A6WUUes1II6T6CPqJN7y1wnRbbv1QwQycu5UnHhiriOc")'
      }}
    ></div>
  </div>
  <div className="relative group overflow-hidden rounded-2xl hidden md:block">
    <div
      className="w-full h-full bg-center bg-cover transition-transform duration-700 group-hover:scale-105"
      data-alt="Green dome of Prophet's Mosque in Medina"
      style={{
        backgroundImage:
          'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDXk_GIq_WyodMk1M3bwuvSTZpJ9uYo2uhswS460eGD397PvMkqxbelRIBu22919DzV2iga_vco_kl-TwfQDwFk5Ceku1YnsKxZ3lJTlvaUO3RNC2B0HGL4vuuah8GfTlCs6pg_-jplo0GsxcyPfdD-BBAyIdvYcey-0pVcOv_1Q9X_f0f_Tg7_OI2rKIEhD8-n9l9Lvn69H7QmWE-1j-qwyuho3Hghs7pPATsot755xRbyqWphd8DISPidRdopuwxaIhpiWi7f2Dw")'
      }}
    ></div>
  </div>
  <div className="relative group overflow-hidden rounded-2xl hidden md:block">
    <div
      className="w-full h-full bg-center bg-cover transition-transform duration-700 group-hover:scale-105"
      data-alt="Luxury bus transportation for Umrah pilgrims"
      style={{
        backgroundImage:
          'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDT1HHaPNJBGH-qdS18e5fG3qPqf2bRemFh8DpEwhrzKCsznRIlzAusJPJx-_Eaqx_7jUQ8Jl7LxqufiyD1nVPBe0rOXNMJeuKLPUKn97kEQQmU_rhKCErLkj7SC3W5sWU_mSxlu1EuQSbOIkQbYatcPHgoOYN-ItdeDZQY6obnRptz8F5Yjondrkzu17mfGgmZ0D23UWr7IueC2-1E99Lfc_j6dEgSPOXFMFrt6FMDViI8iG7vzhgf2u2LR4161e36l6KNxXuz3Lw")'
      }}
    ></div>
  </div>
  <div className="relative group overflow-hidden rounded-2xl hidden md:block">
    <div
      className="w-full h-full bg-center bg-cover transition-transform duration-700 group-hover:scale-105"
      data-alt="Detailed close up of Islamic architecture and calligraphy"
      style={{
        backgroundImage:
          'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC9oUEOWvsDee7ttgn7VyPUL672WzeWjCsASSz9p1XOOJQ6Dwfp_-oQgP76k_4LTFb-HwUiaLx5KltlgItwE19sVNnM37aQOrHOcbQRQbx-U5rnCJzCDdrupJ99vGArz5-9DPq2B7mRoLeu2uU9USFQAJGz6FYZdc4JfbnvQnf98s0dv90K9313kAlWYlvfxfuEEaifzdf7NBJal61rX8u-0wGju4vudkg_a-PpHQG--99tcSHOzB7gTF9FA-3TL-wZabDXr-n7yoU")'
      }}
    ></div>
    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
      <span className="text-white font-bold text-lg">+٨ صور</span>
    </div>
  </div>
</div>

  );
}
