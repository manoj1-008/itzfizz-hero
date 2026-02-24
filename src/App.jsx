import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const sectionRef = useRef(null);
  const carRef = useRef(null);
  const introRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=3000",
          scrub: true,
          pin: true,
        }
      });

      // Slight background darken during scroll
      tl.to(sectionRef.current, {
        backgroundColor: "#020617",
        ease: "none"
      }, 0);

      // Intro fades up
      tl.to(introRef.current, {
        opacity: 0,
        y: -100,
        ease: "none"
      }, 0);

      // Car enters and moves
      tl.fromTo(
        carRef.current,
        { x: -1000, opacity: 0, scale: 1 },
        { x: 900, opacity: 1, scale: 1.15, ease: "none" },
        0.1
      );

      // Content appears during car movement
      tl.fromTo(
        contentRef.current,
        { opacity: 0, y: 100 },
        { opacity: 1, y: 0 },
        0.3
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="overflow-x-hidden font-sans">

      <section
        ref={sectionRef}
        className="h-screen relative flex items-center justify-center text-white overflow-hidden bg-[#0b1120]"
      >

        {/* 🔥 Tech Background Layers */}
        <div className="absolute inset-0 -z-10">
          {/* Gradient Base */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0b1120] via-[#111827] to-[#1e293b]" />

          {/* Radial Glow Effects */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(0,255,255,0.15),transparent_40%),radial-gradient(circle_at_70%_70%,rgba(99,102,241,0.15),transparent_40%)]" />

          {/* Subtle Grid */}
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />
        </div>

        {/* Initial Intro */}
        <h1
          ref={introRef}
          className="absolute text-[8vw] font-black tracking-widest drop-shadow-2xl"
        >
          ITZFIZZ DIGITAL
        </h1>

        {/* Car */}
        <img
          ref={carRef}
          src="https://images.unsplash.com/photo-1503376780353-7e6692767b70"
          alt="car"
          className="absolute bottom-24 w-[650px] drop-shadow-2xl"
        />

        {/* Scroll Content */}
        <div
          ref={contentRef}
          className="absolute text-center opacity-0"
        >
          <h1 className="text-[6vw] font-black tracking-wide drop-shadow-lg">
            WELCOME ITZFIZZ
          </h1>

          <p className="text-xl mt-6 text-gray-300">
            Driving Digital Innovation Forward
          </p>

          <div className="mt-12 grid grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 shadow-2xl">
              58% Growth
            </div>
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 shadow-2xl">
              27% Efficiency
            </div>
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 shadow-2xl">
              40% Faster Support
            </div>
          </div>
        </div>

      </section>

    </div>
  );
}