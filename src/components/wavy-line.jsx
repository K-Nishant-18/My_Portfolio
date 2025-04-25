"use client";
import { useRef, useEffect } from "react";
import { clsx as cn } from "clsx";

export function WavyLine({
  className,
  strokeColor = "text-neutral-800 dark:text-neutral-200",
  strokeWidth = "stroke-[1px]",
  height = "h-[100px]",
  interactive = true,
  ...props
}) {
  const path = useRef(null);
  const parentRef = useRef(null);

  let progress = 0;
  let x = 0.5;
  let time = Math.PI / 2;
  let reqId = null;

  useEffect(() => {
    setSvgPath(progress);
  }, []);

  const setSvgPath = (progress) => {
    const width = parentRef.current?.clientWidth ?? window.innerWidth * 1;
    path.current?.setAttributeNS(
      null,
      "d",
      `M0 50 Q${width * x} ${50 + progress}, ${width} 50`
    );
  };

  const lerp = (x, y, a) => x * (1 - a) + y * a;

  const handleMouseEnter = () => {
    if (!interactive) return;
    if (reqId) {
      cancelAnimationFrame(reqId);
      resetAnimation();
    }
  };

  const handleMouseMove = (e) => {
    if (!interactive) return;
    const { movementY, clientX } = e;
    const pathBound = path.current?.getBoundingClientRect();

    if (pathBound) {
      x = (clientX - pathBound.left) / pathBound.width;
      progress += movementY;
      setSvgPath(progress);
    }
  };

  const handleMouseLeave = () => {
    if (interactive) animateOut();
  };

  const animateOut = () => {
    const newProgress = progress * Math.sin(time);
    progress = lerp(progress, 0, 0.025);
    time += 0.2;
    setSvgPath(newProgress);

    if (Math.abs(progress) > 0.75) {
      reqId = requestAnimationFrame(animateOut);
    } else {
      resetAnimation();
    }
  };

  const resetAnimation = () => {
    time = Math.PI / 2;
    progress = 0;
  };

  return (
    <div
      className={cn("relative w-full h-px", className)}
      {...props}
      ref={parentRef}
    >
      {interactive && (
        <div
          className="relative z-10 h-10 -top-5 w-full"
          onMouseEnter={handleMouseEnter}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        />
      )}
      <svg className={cn("absolute w-full -top-[50px]", height)}>
        <path
          ref={path}
          className={cn(
            "stroke-current fill-none",
            strokeColor,
            strokeWidth
          )}
        />
      </svg>
    </div>
  );
}