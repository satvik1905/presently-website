export default function Footer() {
  return (
    <footer className="bg-[#0F1219] text-white/60">
      <div className="max-w-[1120px] mx-auto flex justify-between items-start gap-10 py-14 max-[600px]:flex-col max-[600px]:gap-8">
        <div className="flex flex-col gap-3">
          <a
            className="flex items-center gap-[9px] font-bold text-[19px] text-white/90 hover:text-white"
            href="/"
          >
            <img
              src="/logo.png"
              alt="Presently"
              width={28}
              height={28}
              className="rounded-full"
            />
            Presently
          </a>
          <p className="text-[14px] leading-[1.5] text-[#FDFDFD]">
            Know who&rsquo;s here.
            <br />
            Know who&rsquo;s ready.
          </p>
        </div>

        <div className="flex gap-16 max-[600px]:gap-10">
          <div className="flex flex-col gap-2.5">
            <a href="#how" className="text-[14px] text-[#B1B5C3] transition-colors hover:text-white">How it works</a>
            <a href="/see-it-in-action" className="text-[14px] text-[#B1B5C3] transition-colors hover:text-white">See it in action</a>
            <a href="#demo" className="text-[14px] text-[#B1B5C3] transition-colors hover:text-white">Demo</a>
            <a href="/partner" className="text-[14px] text-[#B1B5C3] transition-colors hover:text-white">Pricing</a>
          </div>
          <div className="flex flex-col gap-2.5">
            <a href="/partner" className="text-[14px] text-[#B1B5C3] transition-colors hover:text-white">Partner</a>
            <a href="#demo" className="text-[14px] text-[#B1B5C3] transition-colors hover:text-white">Contact</a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/[0.08]">
        <div className="max-w-[1120px] mx-auto flex justify-center items-center py-4 text-[13px] text-white/70">
          <span>
            &copy; 2026 Presently. All rights reserved.
            &ensp;&middot;&ensp;
            <a href="/privacy" className="hover:text-white transition-colors">Privacy</a>
            &ensp;&middot;&ensp;
            <a href="/terms" className="hover:text-white transition-colors">Terms</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
