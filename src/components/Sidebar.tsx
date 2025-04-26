// src/components/Sidebar.tsx
"use client";
import React, { useState, ReactNode } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

interface SidebarLink {
  label: string;
  href: string;
  children?: SidebarLink[];
}

interface SidebarProps {
  onItemClick: (href: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onItemClick }) => {
  
  return (
    <aside className="w-64 bg-gray-100 p-4 h-full">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="knowledge-guide">
          <AccordionTrigger>Knowledge Guide</AccordionTrigger>
          <AccordionContent>
            <ul className="space-y-1 mt-2">
              <li onClick={() => onItemClick("claims-process")}>
                <a
                  href="#"
                  className={`block px-4 py-2 rounded-md hover:bg-gray-200 ${
                    ""
                  }`}
                >
                  Claims Process
                </a>
              </li>
              <li onClick={() => onItemClick("claims-flow")}>
                <a
                  href="#"
                  className={`block px-4 py-2 rounded-md hover:bg-gray-200`}
                >
                  Claims Flow
                </a>
              </li>
              <li onClick={() => onItemClick("faq")}>
                <a
                  href="#"
                  className={`block px-4 py-2 rounded-md hover:bg-gray-200`}
                >
                  FAQ
                </a>
              </li>
              <li onClick={() => onItemClick("photo-upload")}>
              <a
                  href="#"
                  className={`block px-4 py-2 rounded-md hover:bg-gray-200`}
                >
                  Photo Upload Guidelines
                </a>
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <ul className="mt-4 space-y-2">
        <li>
          <Link
            href="#"            
            className={`block px-4 py-2 rounded-md hover:bg-gray-200`}
            onClick={() => onItemClick("file-a-claim")}
          >
            File a Claim
          </Link>
          <ul className="ml-4 mt-2 space-y-2">
            <li>
              <a
                  href="#"
                  className={`block px-4 py-2 rounded-md hover:bg-gray-200`}
                  onClick={() => onItemClick("claims-form")}
                >
                  Claims Form
                </a>
            </li>
          </ul>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;