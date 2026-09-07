import { LinkButton } from "./Button";
import HeroCarousel from "./HeroCarousel";

export default function Hero() {
  return (
    <section className="min-h-[calc(100vh-68px)] flex items-center py-12">
      <div className="max-w-[1120px] mx-auto grid grid-cols-[1.05fr_1fr] gap-14 items-center max-[920px]:grid-cols-1 max-[920px]:gap-10">
        <div>
          <span className="stamp">BUILT FOR THE WAY KUMON CENTERS RUN</span>
          <h1>
            Every student in your center, <em>accounted for.</em>
          </h1>
          <p className="text-[18px] text-[#5B6472] max-w-[46ch] mb-[30px]">
            Presently connects check-in, live student visibility, intelligent
            time tracking and parent communication in one simple system—so
            your team always knows who&rsquo;s here and who&rsquo;s ready.
          </p>
          <div className="flex gap-3 flex-wrap">
            <LinkButton href="/partner" size="lg">Get Powered</LinkButton>
            <LinkButton href="#demo" variant="ghost" size="lg">Request a demo</LinkButton>
          </div>
          <p className="mt-3.5 text-[13.5px] text-[#5B6472]">
            Web-based. Works on the iPad at your front desk. No new hardware.
          </p>
        </div>

        <HeroCarousel />
      </div>
    </section>
  );
}
