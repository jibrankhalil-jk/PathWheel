import React from "react";

function Hero() {
  return (
    // parent div
    <main className="container mt-4 md:flex flex-row-reverse justify-between items-center">
      <div className="md:max-w-[50%]">
        <img src="./images/wheelchair_with_bg.png" alt="hero" />
      </div>

      {/* text section */}
      <div className="text-center sm:text-left md:max-w-[40%]">
        <h1 className="font-bold text-4xl leading-[60px]">
          Safe, Reliable, and Truly Hands-Free
        </h1>
        <p className="mt-4 text-[18px] leading-[28px] font-normal">
          Experience freedom like never before with our self-driving wheelchair.
          Advanced sensors ensure safe, obstacle-free navigation in any environment.
          Built for reliability, comfort, and peace of mind—wherever you go.
          Just sit back, relax, and let smart mobility take the lead.
        </p>
        <div className="mt-8 flex items-center justify-around sm:justify-start sm:space-x-8">
          <button className="primary-button">Get Started</button>
          <i className="fi fi-tr-play-circle flex items-center gap-2">
            <p className="font-semibold text-primary whitespace-nowrap underline hover:scale-110 active:scale-95 duration-200 cursor-pointer">
              Learn More
            </p>
          </i>
        </div>
      </div>
    </main>
  );
}

export default Hero;
