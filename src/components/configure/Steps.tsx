"use client";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Icons } from "../Icons";

const STEPS = [
  {
    name: "Step 1: Add image",
    description: "Choose an image for your case",
    url: "/upload",
  },
  {
    name: "Step 2: Customize Design",
    description: "Choose an image for your case",
    url: "/design",
  },
  {
    name: "Step 3: Summary",
    description: "Review your final design",
    url: "/preview",
  },
];

const Steps = () => {
  const pathname = usePathname();

  return (
    <ol className="rounded-md bg-white dark:bg-gray-900 lg:flex lg:rounded-none lg:border-l lg:border-r lg:border-gray-200 dark:border-gray-800">
      {STEPS.map((step, idx) => {
        const isCurrent = pathname.endsWith(step.url);
        const isCompleted = STEPS.slice(idx + 1).some((step) => {
          pathname.endsWith(step.url);
        });
        const imgPath = `/snake-${idx + 1}.png`;
        return (
          <li key={step.name} className="relative overflow-hidden lg:flex-1">
            <div>
              <span
                className={cn(
                  "absolute left-0 top-0 h-full w-1 dark:bg-zinc-600 bg-zinc-400 lg:bottom-0 lg:top-auto lg:h-1 lg:w-full",
                  { "bg-zinc-700 dark:bg-zinc-300": isCurrent, "bg-primary": isCompleted }
                )}
                aria-hidden
              />
              <span
                className={cn(
                  idx !== 0 ? "lg:pl-9" : "",
                  "flex items-center px-6 py-4 text-sm font-medium"
                )}
              >
                <span className="flex-shrink-0">
                  <img
                    src={imgPath}
                    className={cn(
                      "flex h-20 w-20 object-contain items-center justify-center",
                      {
                        "border-none": isCompleted,
                        "border-zinc-700": isCurrent,
                      }
                    )}
                    alt="img"
                  />
                </span>
                <span className="ml-4 h-full mt-0.5 flex min-w-0 flex-col justify-center">
                  <span
                    className={cn("text-sm font-semibold text-zonc-700", {
                      "text-primary": isCompleted,
                      "text-zinc-700 dark:text-zinc-300": isCurrent,
                    })}
                  >
                    {step.name}
                  </span>
                  <span className="text-sm text-zinc-500">{step.description}</span>
                </span>
              </span>
              {/* separator */}
              {
                idx !== 0 && <div className="absolute inset-0 hidden w-3 lg:block">
                    <Icons.seperator/>
                </div>
              }
            </div>
          </li>
        );
      })}
    </ol>
  );
};

export default Steps;
