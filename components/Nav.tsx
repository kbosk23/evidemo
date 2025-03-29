"use client";

import { useLayoutEffect, useState } from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";
import pkg from "@/package.json";
import Link from "next/link";

export const Nav = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useLayoutEffect(() => {
    const el = document.documentElement;
    setIsDarkMode(el.classList.contains("dark"));
  }, []);

  const toggleDark = () => {
    const el = document.documentElement;
    el.classList.toggle("dark");
    setIsDarkMode((prev) => !prev);
  };

  return (
    <div className="px-4 py-2 flex items-center h-14 z-50 bg-card border-b border-border">
      <div className="flex items-center gap-2">
        <Link href="https://letter-trace-app.azurewebsites.net/" className="hover:opacity-80 transition-opacity">
          <Image
            src="/logo.png"
            alt="Reading Road Logo"
            width={40}
            height={40}
            className="h-15 w-auto"
            priority
          />
        </Link>
        <span className="text-lg font-bold">
          Reading Road (Emotional Intelligence)
        </span>
      </div>
      <div className="ml-auto flex items-center gap-1">
        <Button
          onClick={toggleDark}
          variant="ghost"
          className="ml-auto flex items-center gap-1.5"
        >
          <span>
            {isDarkMode ? (
              <Sun className="size-4" />
            ) : (
              <Moon className="size-4" />
            )}
          </span>
          <span>{isDarkMode ? "Light" : "Dark"} Mode</span>
        </Button>
      </div>
    </div>
  );
};
