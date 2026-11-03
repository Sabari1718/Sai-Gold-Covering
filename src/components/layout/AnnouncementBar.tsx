export function AnnouncementBar() {
  return (
    <div
      className="bg-gradient-to-r from-[#591B2B] via-[#762C43] to-[#591B2B] text-[#FFF9F0] py-2 sm:py-2.5 px-3 sm:px-4 text-center border-b border-[#D3AA57]/40 shadow-sm"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-[10px] sm:text-xs font-semibold uppercase tracking-wider">
        <span className="w-1.5 h-1.5 rounded-full bg-[#D3AA57] shrink-0" />
        <span className="text-[#F3E0A2] font-bold tracking-[0.1em] sm:tracking-[0.2em] whitespace-nowrap overflow-hidden text-ellipsis">
          <span className="sm:hidden">✨ Sai Gold Covering • Malumichampatti ✨</span>
          <span className="hidden sm:inline">DISCOVER BEAUTIFUL COLLECTIONS AT SAI GOLD COVERING • MALUMICHAMPATTI</span>
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-[#D3AA57] shrink-0 hidden sm:inline-block" />
      </div>
    </div>
  );
}

export default AnnouncementBar;
