// src/components/Sidebar.tsx
"use client";
import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
const Sidebar = () => {
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const handleClick = (item: string) => {
    setActiveItem(item);
  };

  return (
    <aside className="w-64 bg-gray-100 p-4">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="knowledge-guide">
          <AccordionTrigger>Knowledge Guide</AccordionTrigger>
          <AccordionContent>
            <ul className="space-y-2 mt-2">
              <li>
                <Link
                  href="#"
                  className={`block px-4 py-2 rounded-md hover:bg-gray-200 ${
                    activeItem === "claims-process"
                      ? "bg-gray-200 font-semibold"
                      : ""
                  }`}
                  onClick={() => handleClick("claims-process")}
                >
                  Claims Process
                </Link>
                
              </li>
              <li>
                <Link
                  href="#"
                  className={`block px-4 py-2 rounded-md hover:bg-gray-200 ${
                    activeItem === "claims-flow"
                      ? "bg-gray-200 font-semibold"
                      : ""
                  }`}
                  onClick={() => handleClick("claims-flow")}
                >
                  Claims Flow
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className={`block px-4 py-2 rounded-md hover:bg-gray-200 ${
                    activeItem === "faq" ? "bg-gray-200 font-semibold" : ""
                  }`}
                  onClick={() => handleClick("faq")}
                >
                  FAQ
                </Link>
              </li>
              <li>
              <Link
                  href="#"
                  className={`block px-4 py-2 rounded-md hover:bg-gray-200 ${
                    activeItem === "photo-upload" ? "bg-gray-200 font-semibold" : ""
                  }`}
                  onClick={() => handleClick("photo-upload")}
                >
                  Photo Upload Guidelines
                </Link>
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <ul className="mt-4 space-y-2">
        <li>
          <Link
            href="#"
            className={`block px-4 py-2 rounded-md hover:bg-gray-200 ${
              activeItem === "file-a-claim" ? "bg-gray-200 font-semibold" : ""
            }`}
            onClick={() => handleClick("file-a-claim")}
          >
            File a Claim
          </Link>
          <ul className="ml-4 mt-2 space-y-2">
            <li>
              <Link
                href="/dashboard/claims-form"
                className={`block px-4 py-2 rounded-md hover:bg-gray-200 ${
                  activeItem === "claims-form"
                    ? "bg-gray-200 font-semibold"
                    : ""
                }`}
                onClick={() => handleClick("claims-form")}
              >
                Claims Form
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;