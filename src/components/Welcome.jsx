import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
const FONT_WEIGHTS = {
  subtitle: { min: 100, max: 400, default: 500 },
  title: { min: 400, max: 900, default: 600 },
};
const renderText = (text, className, baseWeight = 400) => {
  return [...text].map((char, idx) => (
    <span key={idx} className={className} style={{ fontWeight: baseWeight }}>
      {char === " " ? "\u00A0" : char}
    </span>
  ));
};
const setupTextHover = (container, type) => {
  if (!container) return;
  const letters = container.querySelectorAll("span");
  const { min, max, default: base } = FONT_WEIGHTS[type];

  const animateletters = (letter, intensity, distance, duration = 0.25) => {
    const weight = min + (max - min) * intensity;
    const yOffset = -intensity * 20;
    const rotation = (distance / 500) * 25 * intensity;
    const scale = 1 + intensity * 0.5;
    const skewX = -(distance / 500) * 20 * intensity;

    const color = intensity > 0.4 ? "#faf6f5ff" : "currentColor";
    const textShadow = intensity > 0.4 ? "0 0 20px #f7f6f680" : "none";
    const blur = Math.max(0, (1 - intensity) * 2 - 1);

    return gsap.to(letter, {
      duration,
      ease: "power2.out",
      fontWeight: weight,
      y: yOffset,
      rotation: rotation,
      scale: scale,
      skewX: skewX,
      color: color,
      textShadow: textShadow,
      filter: `blur(${blur}px)`,
      display: "inline-block",
    });
  };

  const handleMouseMove = (e) => {
    const { left } = container.getBoundingClientRect();
    const mouseX = e.clientX - left;
    letters.forEach((letter) => {
      const { left: l, width: w } = letter.getBoundingClientRect();
      const relativeX = l - left + w / 2;
      const distance = mouseX - relativeX;
      const absDistance = Math.abs(distance);

      const intensity = Math.exp(-(absDistance ** 2) / 6000);
      animateletters(letter, intensity, distance);
    });
  };

  const handleMouseLeave = () => {
    letters.forEach((letter, i) => {
      gsap.to(letter, {
        duration: 0.6,
        delay: i * 0.02,
        ease: "elastic.out(1, 0.5)",
        fontWeight: base,
        y: 0,
        rotation: 0,
        scale: 1,
        skewX: 0,
        color: "currentColor",
        textShadow: "none",
        filter: "blur(0px)",
      });
    });
  };
  container.addEventListener("mousemove", handleMouseMove);
  container.addEventListener("mouseleave", handleMouseLeave);
  return () => {
    container.removeEventListener("mousemove", handleMouseMove);
    container.removeEventListener("mouseleave", handleMouseLeave);
  };
};
export const Welcome = () => {
  const titleRef = useRef(null);
  const subtitle = useRef(null);
  useGSAP(() => {
    const titleCleanup = setupTextHover(titleRef.current, "title");
    const subtitleCleanup = setupTextHover(subtitle.current, "subtitle");
    return () => {
      if (titleCleanup) titleCleanup();
      if (subtitleCleanup) subtitleCleanup();
    };
  });
  return (
    <section id="welcome">
      <p ref={subtitle}>
        {renderText(
          "Hey, I'm Parth! Welcome to My",
          "text-3xl font-georama",
          100
        )}
      </p>
      <h1 ref={titleRef} className="mt-7">
        {renderText("Portfolio", "text-9xl italic font-georama")}
      </h1>
      <div className="small-screen">
        <p>This Portfolio is designed for desktop/tabled screens only.</p>
      </div>
    </section>
  );
};
