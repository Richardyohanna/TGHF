import { motion, useReducedMotion, type Variants } from "framer-motion";
import underline from "../assets/Curved green underline (1).png";
import founderImage from "../assets/f2.jpeg";

// 👉 Replace with your founder photo (import from assets or paste a link)
const FOUNDER_IMAGE = founderImage;

const ease = [0.22, 1, 0.36, 1] as const;

// Parent: reveals the two columns one after another
const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.25, delayChildren: 0.1 } },
};

// Text column: reveals its lines one after another
const textContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18 } },
};

// Generic block: fades in while sliding up
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

// Photo: glides in from the left
const photoIn: Variants = {
  hidden: { opacity: 0, x: -60, scale: 0.95 },
  show: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.9, ease } },
};

// Green outline frame: slides into its offset position behind the photo
const frameIn: Variants = {
  hidden: { opacity: 0, x: -24, y: 24 },
  show: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 1, ease, delay: 0.2 },
  },
};

// Badge: pops in last
const badgeIn: Variants = {
  hidden: { opacity: 0, scale: 0.6, y: 20 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 260, damping: 18, delay: 0.7 },
  },
};

// Quote: words appear one by one
const quoteContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};
const quoteWord: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease },
  },
};

// Underline: draws itself from left to right
const underlineDraw: Variants = {
  hidden: { clipPath: "inset(0 100% 0 0)" },
  show: {
    clipPath: "inset(0 0% 0 0)",
    transition: { duration: 1, ease: "easeInOut" },
  },
};

const QUOTE = "How will I grow up when I haven’t eaten?";

const FeedAChildStory = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="story"
      className="overflow-hidden bg-primary-blue px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
    >
      <motion.div
        className="mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20"
        variants={container}
        initial={reduceMotion ? "show" : "hidden"}
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
      >
        {/* PHOTO: second on mobile, left on desktop */}
        <div className="relative order-2 mx-auto w-full max-w-xs sm:max-w-sm md:order-1 md:max-w-none">
          {/* Soft green glow behind everything */}
          <div
            aria-hidden="true"
            className="absolute -left-6 -top-6 h-40 w-40 rounded-full bg-primary-green/40 blur-3xl"
          />

          {/* Offset outline frame (same arch shape as the photo) */}
          <motion.div
            variants={frameIn}
            aria-hidden="true"
            className="absolute inset-0 translate-x-4 translate-y-4 rounded-t-[999px] rounded-b-3xl border-2 border-primary-green sm:translate-x-5 sm:translate-y-5"
          />

          {/* Arch-shaped photo */}
          <motion.div
            variants={photoIn}
            whileHover={reduceMotion ? undefined : { scale: 1.02, rotate: -1 }}
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
            className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-3xl bg-white/10 shadow-2xl ring-4 ring-white"
          >
            <img
              src={FOUNDER_IMAGE}
              alt="Queenette Martins, founder of Feed a Child"
              className="h-full w-full object-cover"
            />
            {/* Gentle gradient so the photo blends into the blue */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-primary-blue/40 via-transparent to-transparent"
            />
          </motion.div>

          {/* Floating badge */}
          <motion.div
            variants={badgeIn}
            className="absolute -bottom-5 -right-2 flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-xl sm:-right-6"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5 text-primary-green"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 21s-7.5-4.6-9.6-9.2C1 8.5 2.7 5 6 5c2 0 3.4 1.1 4 2.3h4C14.6 6.1 16 5 18 5c3.3 0 5 3.5 3.6 6.8C19.5 16.4 12 21 12 21Z" />
            </svg>
            <span className="text-sm font-bold text-primary-blue">
              Feed a Child
            </span>
          </motion.div>
        </div>

        {/* TEXT: first on mobile, right on desktop */}
        <motion.div
          variants={textContainer}
          className="order-1 flex flex-col items-center text-center md:order-2 md:items-start md:text-left"
        >
          {/* Eyebrow */}
          <motion.h2
            variants={fadeUp}
            className="text-2xl font-bold uppercase tracking-normal text-white sm:text-base lg:text-4xl"
          >
            The story behind Feed a Child
          </motion.h2>

          {/* Lead-in */}
          <motion.p
            variants={fadeUp}
            className="mt-7 max-w-xl text-base leading-relaxed text-white sm:text-lg lg:text-lg"
          >
            I once asked a child,{" "}
            <span className="font-['Lora',serif] font-bold italic">
              “What do you want to be when you grow up?”
            </span>{" "}
            The child had a question for me, too.
          </motion.p>

          {/* Quote: word-by-word reveal */}
          <blockquote className="relative mt-6">
            <motion.p
              variants={quoteContainer}
              aria-label={QUOTE}
              className="font-['Lora',serif] text-[clamp(1.3rem,3.5vw,2rem)] font-bold italic leading-[1.15] text-white"
            >
              {QUOTE.split(" ").map((word, i) => (
                <motion.span
                  key={i}
                  variants={quoteWord}
                  aria-hidden="true"
                  className="inline-block"
                >
                  {word}
                  {"\u00A0"}
                </motion.span>
              ))}
            </motion.p>
          </blockquote>

          {/* Curved underline: white, drawn in */}
          <motion.img
            variants={underlineDraw}
            src={underline}
            alt=""
            aria-hidden="true"
            className="mt-6 w-48 brightness-0 invert sm:w-72"
          />

          {/* Closing text */}
          <motion.p
            variants={fadeUp}
            className="mt-8 max-w-md text-base leading-relaxed text-white sm:text-lg"
          >
            That question has stayed with me. It’s part of what inspired Feed a
            Child.
          </motion.p>

          {/* Signature */}
          <motion.p
            variants={fadeUp}
            className="mt-2 text-lg font-bold text-white sm:text-xl"
          >
            Queenette Martins,{" "}
            {/* <span className="font-['Lora',serif] font-semibold italic text-primary-green">
              Founder
            </span> */}
          </motion.p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default FeedAChildStory;