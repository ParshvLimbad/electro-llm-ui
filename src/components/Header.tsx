"use client";
import React from "react";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Header = () => {
  gsap.registerPlugin(useGSAP);

  const container = useRef();

  useGSAP(() => {
    gsap.from(".blob", {
      left: 0,
      top: 0,
      right: 0,
      duration: 3,
      scrub: 1,
      yoyo: true,
      ease: CustomEase.create("custom", "M0,0 C0.6,0.004 0.397,1 1,1 "),
    });
    gsap.to(".blob", {
      left: 40,
      top: 20,
      right: 40,
      duration: 3,
      repeat: -1,
      scrub: 1,
      yoyo: true,
      ease: CustomEase.create("custom", "M0,0 C0.6,0.004 0.397,1 1,1 "),
    });
    gsap.from(".blob-2", {
      left: 0,
      top: 0,
      right: 0,
      duration: 2,
      scrub: 1,
      yoyo: true,
      ease: CustomEase.create("custom", "M0,0 C0.6,0.004 0.397,1 1,1 "),
    });
    gsap.to(".blob-2", {
      left: 30,
      top: 10,
      right: 20,
      duration: 2,
      repeat: -1,
      scrub: 1,
      yoyo: true,
      ease: CustomEase.create("custom", "M0,0 C0.6,0.004 0.397,1 1,1 "),
    });
  });
  return (
    <nav>
      <div className="blob-container absolute">
        <div className="blob bg-[#17ccf0] h-40 w-40 absolute rounded-full blur-2xl opacity-40"></div>
        <div className="blob-2 bg-yellow-600 h-40 w-40 absolute rounded-full blur-2xl opacity-30"></div>
      </div>
      <h1 className="text-[60px] text-[#dfeef1] absolute top-6 left-10 font-medium tracking-tighter">
        Electro
      </h1>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.0/CustomEase.min.js"></script>
    </nav>
  );
};

export default Header;
