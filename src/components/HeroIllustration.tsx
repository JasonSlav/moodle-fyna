export function HeroIllustration() {
  return (
    <div className="relative z-10 flex w-full max-w-sm flex-col items-center gap-5">
      <div className="relative aspect-square w-full max-w-xs">
        {/* Placeholder ilustrasi.
            Ganti konten ini dengan <Image src="..." fill className="object-contain" />
            saat aset ilustrasi asli tersedia — struktur container tidak berubah. */}
        <svg
          viewBox="0 0 200 200"
          className="h-full w-full"
          role="img"
          aria-label="Ilustrasi Bumi dan lingkungan"
        >
          <circle cx="100" cy="100" r="70" fill="#E8F4F8" stroke="#0A364A" strokeWidth="4" />
          <circle cx="100" cy="100" r="70" fill="none" stroke="#0A364A" strokeWidth="2" opacity="0.3" />
          <path d="M100 30 A70 70 0 0 0 100 170 A70 70 0 0 0 100 30 Z M100 30 A70 70 0 0 1 100 170" fill="#0F3D4C" />
          <path d="M100 30 A70 70 0 0 0 100 170 Z M100 30 A70 70 0 0 1 100 170" fill="#2E7D32" />
          <circle cx="148" cy="46" r="18" fill="#F7A823" />
          <circle cx="148" cy="46" r="26" fill="none" stroke="#F39C12" strokeWidth="3" opacity="0.5" />
          <path d="M78 120 C90 108 96 112 100 118 C106 108 116 106 128 120 C116 128 92 128 78 120 Z" fill="#4CAF50" />
          <path d="M60 96 C64 90 72 90 76 96" stroke="#2E7D32" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M138 120 C142 114 150 114 154 120" stroke="#2E7D32" strokeWidth="3" fill="none" strokeLinecap="round" />
        </svg>
      </div>
      <p className="rounded-full bg-white/70 px-4 py-1.5 text-sm font-semibold text-navy">
        Lingkungan · Energi · Masa Depan
      </p>
    </div>
  );
}
