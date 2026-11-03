export function AnnouncementBar() {
  return (
    <div
      className="bg-gradient-to-r from-[#591B2B] via-[#762C43] to-[#591B2B] text-[#FFF9F0] py-2.5 px-4 text-center text-xs font-semibold tracking-wider uppercase border-b border-[#D3AA57]/40 shadow-sm"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2.5 text-[11px] sm:text-xs">
        <span className="w-1.5 h-1.5 rounded-full bg-[#D3AA57]" />
        <span className="text-[#F3E0A2] font-bold tracking-[0.2em]">
          DISCOVER BEAUTIFUL COLLECTIONS AT SAI GOLD COVERING • MALUMICHAMPATTI
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-[#D3AA57]" />
      </div>
    </div>
  );
}

export default AnnouncementBar;
