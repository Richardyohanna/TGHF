import { ArrowRight } from "lucide-react";

import educationImage from "../assets/16.jpeg";
import farmingImage from "../assets/19.jpeg";
import feedingImage from "../assets/5.jpeg";

const programmes = [
  {
    id: "school-feeding",
    title: "School Feeding",
    description:
      "Providing nutritious meals to help children stay healthy, learn better and remain in school.",
    image: feedingImage,
    imageAlt: "A schoolgirl holding a bowl of food with classmates behind her",
    imagePosition: "object-[center_48%]",
  },
  {
    id: "education-support",
    title: "Education Support",
    description:
      "Removing barriers to education by providing learning materials, support and opportunities for children.",
    image: educationImage,
    imageAlt: "A teacher reading with children gathered around a book",
    imagePosition: "object-[center_42%]",
  },
  {
    id: "farm-links",
    title: "Farm & Business Links",
    description:
      "Equipping women and girls with practical skills, resources and market connections for sustainable livelihoods.",
    image: farmingImage,
    imageAlt: "Foundation team members speaking with a farmer in a field",
    imagePosition: "object-[center_45%]",
  },
];

const OurProgrammes = () => (
  <section
    id="programmes"
    aria-labelledby="programmes-heading"
    className="scroll-mt-12 bg-white px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24"
  >
    <div className="mx-auto max-w-7xl">
      <header className="mx-auto mb-10 max-w-3xl text-center sm:mb-14">
        {/* <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary-green sm:text-base">
          Our Programmes
        </p> */}
        <h2
          id="programmes-heading"
          className="mt-3 text-2xl font-bold uppercase leading-tight tracking-[0.1em] text-primary-blue sm:text-3xl lg:text-4xl"
        >
          What We Do
        </h2>
        <p className="mt-5 text-base leading-relaxed text-[#0d1b4c] sm:text-lg">
          Practical, community-driven programmes that improve access to food,
          support children&apos;s education and create opportunities for women
          and girls.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
        {programmes.map((programme) => (
          <article
            id={programme.id}
            key={programme.id}
            className="group flex h-full flex-col overflow-hidden border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg motion-reduce:transform-none motion-reduce:transition-none md:last:col-span-2 md:last:mx-auto md:last:w-[calc(50%-1rem)] lg:last:col-span-1 lg:last:mx-0 lg:last:w-auto"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
              <img
                src={programme.image}
                alt={programme.imageAlt}
                loading="lazy"
                className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.035] motion-reduce:transition-none ${programme.imagePosition}`}
              />
            </div>
            <div className="flex flex-1 flex-col p-6 sm:p-7">
              <span
                aria-hidden="true"
                className="mb-4 h-1 w-10 rounded-full bg-primary-blue"
              />
              <h3 className="text-xl font-bold leading-snug text-[#0d1b4c] sm:text-2xl">
                {programme.title}
              </h3>
              <p className="mt-3 flex-1 leading-relaxed text-slate-600">
                {programme.description}
              </p>
              <a
                href={`#${programme.id}`}
                className="mt-6 inline-flex min-h-11 w-fit items-center gap-2 font-semibold text-primary-blue transition-colors hover:text-primary-green focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-blue"
              >
                Learn More
                <ArrowRight
                  size={17}
                  aria-hidden="true"
                  className="transition-transform group-hover:translate-x-1 motion-reduce:transition-none"
                />
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default OurProgrammes;
