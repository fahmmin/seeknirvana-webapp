"use client";
import { WordsPullUpMultiStyle } from "../components/WordsPullUpMultiStyle";
import { ScrollRevealText } from "../components/ScrollRevealText";

export const About = () => {
  const segments = [
    { text: "I am Marcus Chen,", className: "font-normal" },
    { text: "a self-taught director.", className: "italic font-serif" },
    { text: "I have skills in color grading, visual effects, and narrative design.", className: "font-normal" }
  ];

  return (
    <section className="bg-black py-24 md:py-32 px-6 flex justify-center items-center">
      <div className="bg-[#101010] w-full max-w-6xl rounded-[2rem] p-8 md:p-16 lg:p-24 flex flex-col items-center text-center">
        <span className="text-primary text-[10px] sm:text-xs tracking-widest uppercase mb-8">
          Visual arts
        </span>

        <div className="max-w-4xl mx-auto mb-16">
          <WordsPullUpMultiStyle
            segments={segments}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[0.95] sm:leading-[0.9] text-primary"
          />
        </div>

        <div className="max-w-2xl mx-auto">
          <ScrollRevealText
            text="Over the last seven years, I have worked with Parallax, a Berlin-based production house that crafts cinema, series, and Noir Studio in Paris. Together, we have created work that has earned international acclaim at several major festivals."
            className="text-[#DEDBC8] text-xs sm:text-sm md:text-base leading-relaxed"
          />
        </div>
      </div>
    </section>
  );
};
