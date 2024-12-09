import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface PhoneProps extends HTMLAttributes<HTMLDivElement> {
  imgSrc: string;
  darkPhone?: boolean;
}
const Phone = ({
  imgSrc,
  className,
  darkPhone = false,
  ...props
}: PhoneProps) => {
  return (
    <div
      className={cn(
        "relative pointer-events-none z-20 overflow-hidden",
        className
      )}
      {...props}
    >
      <img
        className="pointer-events-none z-50 select-none"
        src={
          darkPhone
            ? "/phone-template-dark-edges.png"
            : "/phone-template-white-edges.png"
        }
        alt="phone-image"
      />
      <div className="absolute -z-10 inset-0">
        <img
          className="object-cover min-w-full min-h-full"
          src={imgSrc}
          alt="overlaying phone image"
        />
      </div>
    </div>
  );
};

export default Phone;
