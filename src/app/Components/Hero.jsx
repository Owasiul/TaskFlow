import React from "react";

const Hero = () => {
  return (
    <div className="my-5 mx-auto">
      <div className="w-full lg:max-h-200 max-h-100 overflow-hidden rounded-3xl bg-slate-900/5 shadow-lg">
        <div className="aspect-video w-full">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/vedio.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </div>
  );
};

export default Hero;
