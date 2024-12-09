"use client";
import { useTheme } from "next-themes";
import { buttonVariants } from "./button";
import { Sun, Moon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const DarkModeToggle = () => {
  const handleThemeChange = () => {
    if (theme == "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };
  const { theme, setTheme } = useTheme();
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <button
            onClick={() => {
              handleThemeChange();
            }}
            className={buttonVariants({
              size: "sm",
              variant: "ghost",
            })}
          >
            {" "}
            {theme === "light" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>
        </TooltipTrigger>
        <TooltipContent>Toggle Dark Mode</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default DarkModeToggle;
