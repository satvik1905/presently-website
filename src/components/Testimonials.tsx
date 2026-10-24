import ScrollReveal from "./ScrollReveal";
import { LinkButton } from "./Button";

const testimonials = [
  {
    quote:
      "What initially began as a solution to meet risk management requirements quickly evolved into something much more valuable. Presently has become an integral part of our daily operations, allowing us to track student attendance, monitor time spent in class, manage student flow, and keep parents informed through automated check-in and check-out notifications—all in one place. What has impressed us most is the responsiveness of the Presently team. Our feedback hasn't simply been collected—it's been heard, evaluated, and translated into meaningful improvements that address real challenges we encounter during class.\n\nThis experience gave us the confidence to embrace a platform that could genuinely enhance our center operations. Perhaps the most rewarding part of our Alpha Testing experience was the opportunity to connect 10 fellow Kumon instructors with Presently's Pilot Program. Having instructors with different center operations, experiences, and perspectives collectively test and refine the same platform has been particularly valuable. With another 50 instructors being invited to participate, there is an even greater opportunity for Presently to benefit from the collective insights of those using it every day.",
    name: "Stuti Desai",
    title: "Kumon of Carmel, ICPC Member 2026",
    initials: "SD",
  },
  {
    quote:
      "Working with the Presently team has been a wonderful experience. Their platform has helped us improve classroom organization, monitor student attendance, and manage our daily operations more efficiently. We appreciate the team's responsiveness, willingness to listen to feedback, and commitment to making improvements that support our needs. It has been a pleasure working with a team that truly values its customers. Thank you for your continued support!",
    name: "Bijal Patel",
    title: "Kumon of Victorville, Current ICPC Member",
    initials: "BP",
  },
  {
    quote:
      "My experience with Presently has been wonderful! The system is easy to use, and even our youngest students had no trouble checking in and out. What impressed me most was Rik and Sid driving all the way from Monterey to San Jose to personally help me get everything set up, especially since technology isn't my strong suit. Whenever I have a question or suggestion, they respond almost immediately and genuinely take the time to help. It's refreshing to work with people who not only know their craft but truly care about the people using their system. I'm so grateful for their support and highly recommend Presently!",
    name: "Chieko Otsuka",
    title: "Kumon of San Jose-West",
    initials: "CO",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20">
      <div className="wrap">
        {/* Header */}
        <div className="flex items-start justify-between mb-12">
          <div className="flex items-start gap-4">
            {/* Arrow icon */}
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              className="mt-1 shrink-0"
            >
              <path
                d="M12 28L28 12"
                stroke="#2563EB"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <path
                d="M16 12H28V24"
                stroke="#2563EB"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div>
              <h2 className="!text-[clamp(24px,3vw,34px)] !my-0 !max-w-none font-semibold tracking-tight text-[#101828]">
                Our Success Stories:
              </h2>
              <span className="text-[clamp(24px,3vw,34px)] font-semibold tracking-tight text-[#2563EB]">
                How We Helped Kumon Centers Thrive
              </span>
            </div>
          </div>
          <LinkButton href="/partner" className="shrink-0 mt-2">Get Powered</LinkButton>
        </div>

        {/* Featured Testimonial */}
        <ScrollReveal className="rounded-2xl bg-[linear-gradient(180deg,#EBF1FF_0%,#D4E0FC_40%,#C7D6FA_100%)] p-10 max-[800px]:p-7">
          <div className="grid grid-cols-[1fr_auto] gap-10 max-[800px]:grid-cols-1">
            <div>
              <svg
                width="40"
                height="30"
                viewBox="0 0 40 30"
                fill="none"
                className="mb-6"
              >
                <path
                  d="M10.5 0C4.7 0 0 4.48 0 10c0 5.52 4.7 10 10.5 10 0 0-1.05 10-10.5 10h3.15C14.7 30 21 23.28 21 15V10C21 4.48 16.3 0 10.5 0ZM29.5 0C23.7 0 19 4.48 19 10c0 5.52 4.7 10 10.5 10 0 0-1.05 10-10.5 10h3.15C33.7 30 40 23.28 40 15V10C40 4.48 35.3 0 29.5 0Z"
                  fill="#2563EB"
                />
              </svg>
              {testimonials[0].quote.split("\n\n").map((para, i) => (
                <p
                  key={i}
                  className="text-[15px] leading-relaxed text-[#101828] italic mb-4 last:mb-0"
                >
                  {para}
                </p>
              ))}
            </div>
            <div className="flex flex-col justify-end">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2563EB]/10 text-xs font-semibold text-[#2563EB]">
                  {testimonials[0].initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#101828]">{testimonials[0].name}</p>
                  <p className="text-xs text-[#5B6472]">{testimonials[0].title}</p>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Remaining Testimonial Cards */}
        <div className="grid grid-cols-2 gap-6 mt-6 max-[800px]:grid-cols-1">
          {testimonials.slice(1).map((t) => (
            <ScrollReveal
              key={t.name}
              className="flex flex-col justify-between rounded-2xl bg-[linear-gradient(180deg,#EBF1FF_0%,#D4E0FC_40%,#C7D6FA_100%)] p-8 min-h-[240px]"
            >
              <div>
                <svg
                  width="40"
                  height="30"
                  viewBox="0 0 40 30"
                  fill="none"
                  className="mb-8"
                >
                  <path
                    d="M10.5 0C4.7 0 0 4.48 0 10c0 5.52 4.7 10 10.5 10 0 0-1.05 10-10.5 10h3.15C14.7 30 21 23.28 21 15V10C21 4.48 16.3 0 10.5 0ZM29.5 0C23.7 0 19 4.48 19 10c0 5.52 4.7 10 10.5 10 0 0-1.05 10-10.5 10h3.15C33.7 30 40 23.28 40 15V10C40 4.48 35.3 0 29.5 0Z"
                    fill="#2563EB"
                  />
                </svg>
                <p className="text-[15px] leading-relaxed text-[#101828] italic">
                  {t.quote}
                </p>
              </div>
              <div className="mt-8 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2563EB]/10 text-xs font-semibold text-[#2563EB]">
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#101828]">{t.name}</p>
                  <p className="text-xs text-[#5B6472]">{t.title}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
