import { useEffect, useRef, useState } from "react";
import type { TouchEvent } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

import readingImg from "../assets/a1.jpeg";
import schoolchildrenImg from "../assets/a2.jpeg";
import greenEdge from "../assets/Curved green photo edge.png";
import whitePanel from "../assets/TGHF Hero/White text panel.png";
import greenUpperCurve from "../assets/Green upper curve (1).png";
import goldPhotoCurve from "../assets/TGHF Hero/Gold photo curve.png";
// import lowerWash from "../assets/TGHF Hero/Lower corner wash.png";
import dotActive from "../assets/TGHF Hero/Active slide indicator.png";
import dotIdle from "../assets/TGHF Hero/Second slide indicator.png";

const slides = [
  {
    image: readingImg,
    alt: "A volunteer reading with schoolchildren",
    position: "object-[center_5%]",
    blue: "Every child deserves",
    green: "room to grow",
    text: "We work alongside communities and partners to help children access food and education and to create opportunities for women and young people",
  },
  {
    // Placeholder second slide, replace with your real content
    image: schoolchildrenImg,
    alt: "Smiling schoolchildren holding a bowl of food",
    position: "object-[70%_center]",
    blue: "Helping children eat well and",
    green: "stay in school.",
    text: "Before we ask children what they want to be when they grow up, we must make sure they have what they need to grow."
  },
];

const AUTOPLAY_MS = 8000;
const SWIPE_PX = 55;

const arrowBase =
  "z-40 h-7 w-7 items-center justify-center rounded-full border border-primary-blue bg-white text-primary-blue shadow-sm transition-colors duration-300 hover:bg-primary-blue hover:text-white lg:h-8 lg:w-8";

/*
  Hero motion. You can move this block into index.css if you prefer.

  Photo: the incoming photo fades in over 1.2s on top of the old one, while
  slowly zooming from 100% to 107% over 9s (a gentle "Ken Burns" drift).
  The old photo stays underneath until it is fully covered, so there is
  never a dip or white flash, and it only resets its zoom once invisible.

  Text: each piece (green bar, heading, paragraph, buttons) rises 18px and
  fades in one after another. The outgoing text fades out quickly first.
*/
const heroCss = `
.hero-photo {
  opacity: 0;
  transform: scale(1);
  transition: opacity 0s linear 1200ms, transform 0s linear 1300ms;
}
.hero-photo.is-active {
  opacity: 1;
  transform: scale(1.07);
  transition: opacity 1200ms ease-in-out, transform 9000ms cubic-bezier(0.2, 0.6, 0.2, 1);
}

.hero-slide {
  visibility: hidden;
  pointer-events: none;
  transition: visibility 0s linear 300ms;
}
.hero-slide.is-active {
  visibility: visible;
  pointer-events: auto;
  transition-delay: 0s;
}

.hero-reveal {
  opacity: 0;
  transform: translateY(18px);
  transition: opacity 300ms ease, transform 300ms ease;
}
.hero-slide.is-active .hero-reveal {
  opacity: 1;
  transform: none;
  transition:
    opacity 800ms ease-out calc(450ms + var(--d, 0ms)),
    transform 800ms cubic-bezier(0.2, 0.7, 0.2, 1) calc(450ms + var(--d, 0ms));
}

.hero-bar {
  width: 0;
  transition: width 300ms ease;
}
.hero-slide.is-active .hero-bar {
  width: 2.5rem;
  transition: width 700ms ease-out 450ms;
}

@media (prefers-reduced-motion: reduce) {
  .hero-photo,
  .hero-photo.is-active { transform: none; transition: opacity 300ms linear; }
  .hero-reveal,
  .hero-slide.is-active .hero-reveal { transform: none; transition: opacity 300ms linear; }
  .hero-bar,
  .hero-slide.is-active .hero-bar { transition: none; }
}
`;

const Hero = () => {
  const [active, setActive] = useState(0);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const next = () => setActive((i) => (i + 1) % slides.length);
  const prev = () => setActive((i) => (i - 1 + slides.length) % slides.length);

  // Autoplay. Resets whenever the slide changes, including manual clicks.
  useEffect(() => {
    const id = setTimeout(
      () => setActive((i) => (i + 1) % slides.length),
      AUTOPLAY_MS
    );
    return () => clearTimeout(id);
  }, [active]);

  const onTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    if (event.touches.length !== 1) {
      touchStart.current = null;
      return;
    }

    const touch = event.touches[0];
    touchStart.current = { x: touch.clientX, y: touch.clientY };
  };
  const onTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const start = touchStart.current;
    const touch = event.changedTouches[0];
    touchStart.current = null;
    if (!start || !touch) return;

    const deltaX = touch.clientX - start.x;
    const deltaY = touch.clientY - start.y;
    if (Math.abs(deltaX) < SWIPE_PX || Math.abs(deltaX) <= Math.abs(deltaY)) {
      return;
    }

    if (deltaX < 0) next();
    else prev();
  };

  // Stagger helper: step 0, 1, 2... => 0ms, 150ms, 300ms...
  const step = (n: number) => ({ "--d": `${n * 150}ms` } as React.CSSProperties);

  return (
    <section id="home" className="relative isolate overflow-hidden bg-white">
      <style>{heroCss}</style>

      <div
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onTouchCancel={() => {
          touchStart.current = null;
        }}
        className="hero-swipe-area relative flex w-full flex-col lg:block lg:h-[calc(100svh-159px)] lg:min-h-130"
      >
        {/* ---------- Desktop decorative layers ---------- */}
        <img
          src={greenEdge}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute left-2 top-0 z-10 hidden h-full w-[55.6%] object-fill lg:block"
        />
        <img
          src={whitePanel}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 z-20 hidden h-full w-[55.6%] object-fill lg:block"
        />

        {/* ---------- Mobile corner washes ---------- */}
        {/* <img
          src={lowerWash}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-0 z-0 w-[26%] lg:hidden"
        />
        <img
          src={lowerWash}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 right-0 z-0 w-[26%] -scale-x-100 lg:hidden"
        /> */}

        {/* ---------- Photos ---------- */}
        <div className="relative h-72 w-full shrink-0 sm:h-96 lg:absolute lg:right-0 lg:top-0 lg:z-0 lg:h-full lg:w-[59%]">
          {/* Mobile: photo is cut by a curved bottom edge. Desktop: no clipping. */}
          <div className="absolute inset-0 overflow-hidden bg-white [clip-path:ellipse(100%_100%_at_50%_0%)] lg:[clip-path:none]">
            {slides.map((s, i) => {
              const isActive = i === active;
              return (
                <img
                  key={s.alt}
                  src={s.image}
                  alt={s.alt}
                  aria-hidden={!isActive}
                  className={`hero-photo absolute inset-0 h-full w-full object-cover will-change-transform ${s.position} ${
                    isActive ? "is-active z-10" : "z-0"
                  }`}
                />
              );
            })}
          </div>

          {/* Mobile curves */}
          <img
            src={greenUpperCurve}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-0 z-20 w-[40%] lg:hidden"
          />
          <img
            src={goldPhotoCurve}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 left-0 z-20 w-full lg:hidden"
          />
        </div>

        {/* ---------- Text ---------- */}
        <div className="relative z-10 lg:absolute lg:inset-y-0 lg:left-[7%] lg:z-40 lg:w-[33%]">
          {/* All slides share one grid cell, so the layout never jumps */}
          <div className="grid overflow-hidden lg:h-full">
            {slides.map((s, i) => {
              const Heading = i === 0 ? "h1" : "h2";
              const isActive = i === active;

              return (
                <div
                  key={s.blue}
                  aria-hidden={!isActive}
                  className={`hero-slide col-start-1 row-start-1 flex flex-col px-6 py-6 sm:px-10 lg:justify-center lg:px-0 lg:py-0 ${
                    isActive ? "is-active" : ""
                  }`}
                >
                  <span className="hero-bar mb-4 block h-1 bg-primary-blue" />

                  <Heading
                    style={step(1)}
                    className="hero-reveal text-[clamp(1.6rem,6.5vw,2.4rem)] font-extrabold uppercase leading-[1.1] text-primary-blue lg:text-[clamp(1.5rem,3.4vw,4rem)]"
                  >
                    {s.blue}{" "}
                    <span className="text-primary-green">{s.green}</span>
                  </Heading>

                  <p
                    style={step(2)}
                    className="hero-reveal mt-4 text-[0.95rem] leading-relaxed text-gray-700 lg:max-w-full lg:text-[clamp(0.8rem,1.5vw,1.5rem)]"
                  >
                    {s.text}
                  </p>

                  <div
                    style={step(3)}
                    className="hero-reveal mt-6 flex flex-col gap-3 lg:flex-row lg:flex-wrap"
                  >
                    <a
                      href="#involved"
                      tabIndex={isActive ? 0 : -1}
                      className="inline-flex w-full items-center justify-center gap-3 rounded-sm bg-primary-blue px-5 py-3 text-xs font-semibold uppercase tracking-wide text-white transition-colors duration-300 hover:bg-primary-green lg:w-auto lg:py-2.5"
                    >
                      Offer Food
                      <ArrowRight size={14} />
                    </a>
                    <a
                      href="#donate"
                      tabIndex={isActive ? 0 : -1}
                      className="inline-flex w-full items-center justify-center gap-3 rounded-sm border border-primary-blue px-5 py-3 text-xs font-semibold uppercase tracking-wide text-primary-blue transition-colors duration-300 hover:bg-primary-blue hover:text-white lg:w-auto lg:py-2.5"
                    >
                      Support Education
                      <ArrowRight size={14} />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ---------- Desktop arrows ---------- */}
        <button
          type="button"
          aria-label="Previous slide"
          onClick={prev}
          className={`${arrowBase} absolute left-[1.8%] top-1/2 hidden -translate-y-1/2 lg:flex`}
        >
          <ChevronLeft size={16} />
        </button>
        <button
          type="button"
          aria-label="Next slide"
          onClick={next}
          className={`${arrowBase} absolute right-[1.8%] top-1/2 hidden -translate-y-1/2 lg:flex`}
        >
          <ChevronRight size={16} />
        </button>

        {/* ---------- Slide indicators ---------- */}
        <div className="relative z-10 flex justify-center pb-4 pt-1 lg:absolute lg:bottom-[4%] lg:left-[47%] lg:z-40 lg:p-0">
          {slides.map((s, i) => (
            <button
              key={s.alt}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === active}
              onClick={() => setActive(i)}
              className="flex h-11 w-11 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary-blue lg:h-auto lg:w-auto lg:p-1"
            >
              <img
                src={i === active ? dotActive : dotIdle}
                alt=""
                className="h-2.5 w-2.5"
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;