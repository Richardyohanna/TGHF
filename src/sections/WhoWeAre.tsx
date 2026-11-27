const socialPlatforms = [
  {
    name: "Facebook",
    icon: (
      <path d="M13.2 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.5 1.6-1.5h1.7V3.9c-.8-.1-1.6-.2-2.5-.2-2.5 0-4.2 1.5-4.2 4.3V10H7v3h2.8v8h3.4Z" />
    ),
  },
  {
    name: "Instagram",
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
    icon: (
      <path d="M18.9 2.8h3.3L15 10.9l8.5 10.3h-6.7l-5.3-6.6-5.9 6.6H2.3l7.7-8.6L1.9 2.8h6.9l4.8 6.1 5.3-6.1Zm-1.2 16.5h1.8L8.7 4.6H6.8l10.9 14.7Z" />
    ),
  },
  {
    name: "YouTube",
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
    icon: (
      <path d="M20.4 3H3.6A.6.6 0 0 0 3 3.6v16.8a.6.6 0 0 0 .6.6h16.8a.6.6 0 0 0 .6-.6V3.6a.6.6 0 0 0-.6-.6ZM8.3 18H5.4V9.1h2.9V18ZM6.9 7.9a1.7 1.7 0 1 1 0-3.4 1.7 1.7 0 0 1 0 3.4ZM18 18h-2.9v-4.3c0-1 0-2.2-1.4-2.2s-1.6 1.1-1.6 2.1V18H9.2V9.1H12v1.2h.1c.4-.7 1.3-1.5 2.7-1.5 2.9 0 3.4 1.9 3.4 4.3V18Z" />
    ),
  },
];

const WhoWeAre = () => (
  <section
    id="who-we-are"
    aria-labelledby="who-we-are-heading"
    className="scroll-mt-12 px-6 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-10"
  >
    <h2
      id="who-we-are-heading"
      className="mt-0 uppercase text-2xl lg:text-4xl font-bold leading-[1.08] tracking-[0.1em] text-center text-white"
    >
      Who We Are
    </h2>
    <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[minmax(0,1.85fr)_minmax(15rem,1fr)] md:gap-14 lg:gap-20">
      <div className="text-center md:text-left">
        {/* <p className="text-xs font-bold uppercase tracking-[0.22em] text-white sm:text-sm">
          Who We Are
        </p>
        <span
          aria-hidden="true"
          className="mx-auto mt-4 block h-1 w-12 rounded-full bg-primary-green md:mx-0"
        /> */}
        <h2
          id="who-we-are-heading"
          className="mt-5 uppercase text-[clamp(1rem,2.2vw,1.75rem)] font-bold leading-[1.08] tracking-[0.09em] text-white"
        >
          The George Hopenest Foundation
        </h2>
        <p className="mx-auto mt-4 max-w-3xl tracking-[0.03] text-base lg:text-xl leading-relaxed text-white font-[600] sm:text-lg md:mx-0">
          We listen to displaced and rural communities and to orphanage homes
          to understand local needs. We connect farmers and food businesses
          with organisations caring for children, helping food reach kitchens
          where it can support their nutritional needs. We also work with
          partners to help children continue their education and create
          practical skills-training opportunities for women and girls.
        </p>
      </div>

      <div className="flex flex-col items-center justify-center  text-center md:items-start md:pl-10 md:pt-0 md:text-left lg:pl-14">
        {/* <h3 className="text-lg font-semibold text-white sm:text-xl">
          Connect With Us
        </h3> */}
        <div className="mt-6 flex  flex-wrap items-center justify-center gap-6 md:justify-start">
          {socialPlatforms.map(({ name, icon }) => (
            <svg
              key={name}
              role="img"
              aria-label={name}
              viewBox="0 0 24 24"
              className="h-9 w-9 text-white cursor-pointer transition-transform duration-200 hover:-translate-y-1 hover:scale-110 motion-reduce:transition-none"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              {icon}
            </svg>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default WhoWeAre;
