import underline from "../assets/Curved green underline (1).png";

const FeedAChildStory = () => {
  return (
    <section id="story" className="bg-white px-4 py-16 sm:px-6 sm:py-15 lg:px-8">
      <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
        {/* Eyebrow */}
        <h2 className="text-2xl lg:text-4xl font-bold uppercase tracking-normal text-primary-blue sm:text-base">
          The story behind Feed a Child
        </h2>

        {/* Lead-in */}
        <p className="mt-7 max-w-xl text-base lg:text-lg leading-relaxed text-[#0d1b4c] sm:text-lg">
          I once asked a child, <span className="font-['Lora',serif] italic font-bold">“What do you want to be when you grow up?”</span> The
          child had a question for me, too.
        </p>

      {/* Quote */}
      <blockquote className="relative mt-6 px-6 sm:px-8">
        {/* <span
          aria-hidden="true"
          className="absolute -top-2 left-3 sm:left-0 lg:-left-2
          font-['Lora',serif] text-2xl font-bold leading-none
          text-primary-blue sm:-top-4 sm:text-5xl"
        >
          “
        </span> */}

        <p className="font-['Lora',serif] italic text-[clamp(1.3rem,3.5vw,2rem)] font-bold leading-[1.15] text-[#0d1b4c]">
          How will I grow up when I haven’t eaten?
        </p>

        {/* <span
          aria-hidden="true"
          className="absolute -top-2 right-3 sm:right-0 lg:-right-2
          font-['Lora',serif] text-2xl font-bold leading-none
          text-primary-blue sm:-top-4 sm:text-5xl"
        >
          ”
        </span> */}
      </blockquote>

        {/* Curved underline */}
        <img
          src={underline}
          alt=""
          aria-hidden="true"
          className="mt-6 w-48 sm:w-72"
        />

        {/* Closing text */}
        <p className="mt-8 max-w-md text-base leading-relaxed text-[#0d1b4c] sm:text-lg">
          That question has stayed with me. It’s part of what inspired Feed a
          Child.
        </p>

        {/* Signature */}
        <p className="mt-2 text-lg font-bold text-[#0d1b4c] sm:text-xl">
          Queenette Martins,{" "}
          <span className="font-['Lora',serif] font-semibold italic text-primary-blue">
            Founder
          </span>
        </p>
      </div>
    </section>
  );
};

export default FeedAChildStory;