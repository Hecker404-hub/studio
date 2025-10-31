import React from "react";

export function Logo() {
  return (
    <div className="flex items-center gap-2" aria-label="ProCognito logo">
      <div className="bg-primary text-primary-foreground p-1.5 rounded-lg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-brain-circuit"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M9.5 9a2.5 2.5 0 1 1 5 0 2.5 2.5 0 0 1-5 0Z" />
           <path d="M12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
           <path d="m14.5 9.5.5.5" />
           <path d="m9.5 14.5.5.5" />
           <path d="M12 12v5" />
        </svg>
      </div>
      <span className="text-lg font-semibold">ProCognito</span>
    </div>
  );
}
