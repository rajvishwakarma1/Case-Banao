// bg-zinc-950
// bg-blue-950
// bg-rose-950
"use client";

import { useEffect, useRef, useState } from "react";
import { AspectRatio } from "./ui/aspect-ratio";
import { cn } from "@/lib/utils";

const PhonePreview = ({
  croppedImageUrl,
  color,
}: {
  croppedImageUrl: string;
  color: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [renderedDimensions, setRenderedDimensions] = useState({
    height: 0,
    width: 0,
  });
  const handleResize = () => {
    if (!ref.current) return;
    const { width, height } = ref.current.getBoundingClientRect();
    setRenderedDimensions({ width, height });
  };
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [ref.current]);
  let caseBgColor = "bg-zinc-950";
  switch (color) {
    case "blue":
      caseBgColor = "bg-blue-950";
      break;
    case "rose":
      caseBgColor = "bg-rose-950";
    default:
      caseBgColor: "bg-zinc-950";
      break;
  }
  return (
    <AspectRatio ref={ref} ratio={3000 / 2001} className="relative">
      <div
        className="absolute z-20 scale-[1.0352]"
        style={{
          left:
            renderedDimensions.width / 2 -
            renderedDimensions.width / (1216 / 121),
          top: renderedDimensions.height / 6.22,
        }}
      >
        <img
          src={croppedImageUrl}
          width={renderedDimensions.width / (3000 / 637)}
          alt=""
          className={cn(
            "phone-skew relative rounded-t-[15px] rounded-b-[10px] md:rounded-t-[30px] md:rounded-b-[20px]",
            caseBgColor
          )}
        />
      </div>
      <div className="relative h-full w-full z-40">
        <img
          src="/clearphone.png"
          alt="phone"
          className="pointer-events-none h-full w-full antialiased rounded-md"
        />
      </div>
    </AspectRatio>
  );
};

export default PhonePreview;
