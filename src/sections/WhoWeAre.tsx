import legend from "../assets/legend-supermarket.jpeg";
import manjat from "../assets/manjat-farms.jpeg";
import limlim from "../assets/limlim.jpeg";
import profundis from "../assets/profundis-farms.jpeg";
import ifgreen from "../assets/ifgreen-foods.jpeg";

const partnerLogos = [
  { name: "Legend Supermarket", src: legend },
  { name: "Manjat Farms Limited", src: manjat },
  { name: "Limlim", src: limlim },
  { name: "Profundis Farms Nigeria Limited", src: profundis },
  { name: "IfGreen Foods", src: ifgreen },
];

// Scrolling logo strip: the list is shown twice and slid by exactly half its width, so the loop never jumps
const marqueeCss = `
@keyframes hopenest-marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
.hopenest-track { animation: hopenest-marquee 28s linear infinite; }
@media (hover: hover) {
  .hopenest-marquee:hover .hopenest-track { animation-play-state: paused; }
}
@media (prefers-reduced-motion: reduce) {
  .hopenest-track { animation: none; width: auto; flex-wrap: wrap; justify-content: center; row-gap: 1rem; }
  .hopenest-dup { display: none; }
}
`;

const socialPlatforms = [
  {
    name: "Facebook",
    href: "#",
    icon: (
      <path d="M13.2 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.5 1.6-1.5h1.7V3.9c-.8-.1-1.6-.2-2.5-.2-2.5 0-4.2 1.5-4.2 4.3V10H7v3h2.8v8h3.4Z" />
    ),
  },
  {
    name: "Instagram",
    href: "#",
    icon: (
      <>
        <rect
          x="3"
          y="3"
          width="18"
          height="18"
          rx="5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <circle
          cx="12"
          cy="12"
          r="4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <circle cx="17.5" cy="6.8" r="1.1" />
      </>
    ),
  },
  {
    name: "X",
    href: "#",
    icon: (
      <path d="M18.9 2.8h3.3L15 10.9l8.5 10.3h-6.7l-5.3-6.6-5.9 6.6H2.3l7.7-8.6L1.9 2.8h6.9l4.8 6.1 5.3-6.1Zm-1.2 16.5h1.8L8.7 4.6H6.8l10.9 14.7Z" />
    ),
  },
  {
    name: "YouTube",
    href: "#",
    icon: (
      <>
        <path
          d="M23 7.1a3 3 0 0 0-2.1-2.2C19 4.4 12 4.4 12 4.4s-7 0-8.9.5A3 3 0 0 0 1 7.1a31 31 0 0 0-.5 4.9A31 31 0 0 0 1 17a3 3 0 0 0 2.1 2.2c1.9.5 8.9.5 8.9.5s7 0 8.9-.5A3 3 0 0 0 23 17a31 31 0 0 0 .5-5 31 31 0 0 0-.5-4.9Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path d="m10 15.5 5.2-3.5L10 8.5v7Z" />
      </>
    ),
  },
  {
    name: "LinkedIn",
    href: "#",
    icon: (
      <path d="M20.4 3H3.6A.6.6 0 0 0 3 3.6v16.8a.6.6 0 0 0 .6.6h16.8a.6.6 0 0 0 .6-.6V3.6a.6.6 0 0 0-.6-.6ZM8.3 18H5.4V9.1h2.9V18ZM6.9 7.9a1.7 1.7 0 1 1 0-3.4 1.7 1.7 0 0 1 0 3.4ZM18 18h-2.9v-4.3c0-1 0-2.2-1.4-2.2s-1.6 1.1-1.6 2.1V18H9.2V9.1H12v1.2h.1c.4-.7 1.3-1.5 2.7-1.5 2.9 0 3.4 1.9 3.4 4.3V18Z" />
    ),
  },
];

const WhoWeAre = () => (
  <section
    id="who-we-are"
    aria-labelledby="who-we-are-heading"
    className="scroll-mt-12 overflow-x-clip bg-white px-4 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20"
  >
    <h2
      id="who-we-are-heading"
      className="text-center text-2xl font-bold uppercase leading-[1.08] text-primary-blue sm:text-3xl lg:text-4xl"
    >
      Who We Are
    </h2>

    {/*
      Mobile + tablet: one column (text, logos, then social card).
      Desktop (lg+): two columns, both the same height.
    */}
    <div className="mx-auto mt-8 grid max-w-7xl grid-cols-1 items-stretch gap-8 sm:mt-10 sm:gap-10 lg:grid-cols-[minmax(0,1.85fr)_minmax(18rem,1fr)] lg:gap-14 xl:gap-20">
      {/* Text + moving logo strip that fills the leftover space */}
      <div className="flex min-w-0 flex-col text-center lg:text-left">
        <h3 className="text-[clamp(1.05rem,4.5vw,1.75rem)] font-bold uppercase leading-[1.15] text-primary-blue">
          The George Hopenest Foundation
        </h3>
        <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-[#0d1b4c] sm:text-lg lg:mx-0 xl:text-xl">
          We listen to displaced and rural communities and to orphanage homes
          to understand local needs. We connect farmers and food businesses
          with organisations caring for children, helping food reach kitchens
          where it can support their nutritional needs. We also work with
          partners to help children continue their education and create
          practical skills-training opportunities for women and girls.
        </p>

        {/* Moving logo strip: grows to fill the space under the text on desktop */}
        <div className="mt-8 flex min-h-36 flex-1 flex-col justify-center rounded-2xl border border-primary-blue/10 bg-primary-blue/5 py-4 sm:min-h-40 sm:py-5">
          <style>{marqueeCss}</style>
          <p className="px-5 text-center text-xs font-bold uppercase tracking-wider text-primary-blue sm:text-sm lg:text-left">
            Our partners
          </p>

          <div
            className="hopenest-marquee mt-3 overflow-hidden sm:mt-4"
            style={{
              WebkitMaskImage:
                "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)",
              maskImage:
                "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)",
            }}
          >
            <div className="hopenest-track flex w-max items-center">
              {[...partnerLogos, ...partnerLogos].map(({ name, src }, i) => {
                const isCopy = i >= partnerLogos.length;
                return (
                  <div
                    key={`${name}-${i}`}
                    aria-hidden={isCopy || undefined}
                    className={`mr-4 flex h-16 w-28 shrink-0 items-center justify-center rounded-xl bg-white p-1.5 shadow-md transition-transform duration-300 hover:scale-105 sm:mr-5 sm:h-20 sm:w-36 sm:p-2 lg:h-24 lg:w-44 ${
                      isCopy ? "hopenest-dup" : ""
                    }`}
                  >
                    <img
                      src={src}
                      alt={isCopy ? "" : name}
                      className="h-full w-full object-contain"
                      loading="lazy"
                      draggable={false}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Social card: compact on phones, two columns on tablets, a list on desktop */}
      <div className="mx-auto w-full max-w-sm self-start rounded-3xl bg-primary-blue p-4 shadow-lg sm:max-w-2xl sm:p-5 lg:mx-0 lg:max-w-sm">
        <p className="px-2 text-lg font-bold text-white">Follow our work</p>
        <p className="mt-1 px-2 text-sm text-white/80">
          See where the food goes and who it feeds.
        </p>

        <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:flex lg:flex-col">
          {socialPlatforms.map(({ name, href, icon }) => (
            <li key={name}>
              <a
                href={href}
                aria-label={`Follow us on ${name}`}
                className="group flex min-h-12 items-center gap-4 rounded-2xl px-3 py-2 text-white transition-colors duration-200 hover:bg-white hover:text-primary-blue focus-visible:bg-white focus-visible:text-primary-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-green motion-reduce:transition-none sm:py-2.5"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/15 transition-colors duration-200 group-hover:bg-primary-blue/10 group-focus-visible:bg-primary-blue/10">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="currentColor"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {icon}
                  </svg>
                </span>
                <span className="text-base font-semibold">{name}</span>
                <svg
                  viewBox="0 0 24 24"
                  className="ml-auto h-4 w-4 -translate-x-1 opacity-0 transition duration-200 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 motion-reduce:transition-none"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);

export default WhoWeAre;