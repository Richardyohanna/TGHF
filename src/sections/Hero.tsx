import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import Button from "../components/Button";
import heroImg from "../assets/PACO Commission Charity Group Portrait.png";
import foodDelivery from "../assets/Joyful Blue Uniform Group Portrait.png";
import farmVisit from "../assets/Community Outreach and Learning Day.png";

const slides = [
  {
    src: heroImg,
    alt: "Schoolchildren enjoying a meal together",
    position: "object-[82%_center] lg:object-[68%_center]",
  },
  {
    src: foodDelivery,
    alt: "TGHF representatives distributing food to a community",
    position: "object-[86%_center] lg:object-[72%_center]",
  },
  {
    src: farmVisit,
    alt: "Foundation representatives meeting with a local farmer",
    position: "object-[82%_center] lg:object-[70%_center]",
  },
];

const Hero = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);
    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    if (isHovered || isFocused || prefersReducedMotion) return;

    const intervalId = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 6800);

    return () => window.clearInterval(intervalId);
  }, [activeSlide, isHovered, isFocused, prefersReducedMotion]);

  return (
    <section
      id="home"
      aria-label="Homepage highlights"
      aria-roledescription="carousel"
      className="relative isolate min-h-[38rem] overflow-hidden lg:min-h-[32.5rem]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setIsFocused(false);
        }
      }}
    >
      {slides.map((slide, index) => (
        <img
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          aria-hidden={activeSlide !== index}
          className={`hero-slide absolute inset-0 -z-20 h-full w-full object-cover ${slide.position} ${
            activeSlide === index ? "hero-slide--active" : ""
          }`}
          loading={index === 0 ? "eager" : "lazy"}
          fetchPriority={index === 0 ? "high" : "auto"}
        />
      ))}

    <div className="absolute inset-0 -z-10 bg-linear-to-b from-transparent via-[#063B70]/55 to-[#063B70]/65 lg:bg-linear-to-r lg:from-[#063B70]/60 lg:via-[#063B70]/50 lg:to-transparent" />

      {/* Content */}
      <div className="mx-auto flex min-h-[38rem] max-w-7xl items-end px-4 pb-24 pt-16 sm:px-6 lg:min-h-[32.5rem] lg:items-center lg:py-16 lg:px-8">
        <div className="max-w-3xl lg:max-w-[60vw]">
          <h1 className="text-4xl font-bold leading-tight text-white sm:text-6xl">
            HELPING CHILDREN EAT WELL AND STAY IN SCHOOL.
          </h1>

          <p className="mt-4 max-w-2xl text-lg! lg:text-2xl! text-white sm:text-medium">
            Before we ask children what they want to be when they grow up, we must make sure they have what they need to grow.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button
              className="inline-flex items-center gap-2 bg-white text-primary-green! hover:bg-primary-green! hover:text-white! font-medium"
              onClick={() =>
                document
                  .getElementById("involved")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              {/* <Utensils size={16} /> */}
              OFFER FOOD
              <ArrowRight size={16} />
            </Button>

            <a
              href="#donate"
              className="inline-flex items-center gap-2 border border-white bg-white/10 px-4 py-2 font-medium text-white backdrop-blur-sm transition-colors duration-300 hover:bg-primary-green hover:text-white hover:border-primary-green"
            >
              {/* <GraduationCap size={16} /> */}
              SUPPORT EDUCATION
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>

      <div
        className="absolute inset-x-0 bottom-3 flex justify-center gap-1"
        role="group"
        aria-label="Choose a hero image"
      >
        {slides.map((slide, index) => (
          <button
            key={slide.src}
            type="button"
            aria-label={`Show slide ${index + 1}: ${slide.alt}`}
            aria-current={activeSlide === index ? "true" : undefined}
            onClick={() => setActiveSlide(index)}
            className="flex h-11 w-11 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <span
              aria-hidden="true"
              className={`h-2.5 rounded-full transition-[width,background-color] duration-300 ${
                activeSlide === index
                  ? "w-7 bg-primary-orange"
                  : "w-2.5 bg-white/70 hover:bg-white"
              }`}
            />
          </button>
        ))}
      </div>
    </section>
  );
};

export default Hero;