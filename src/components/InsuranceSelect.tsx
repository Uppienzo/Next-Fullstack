"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const insuranceCompanies = [
  "Company A",
  "Company B",
  "Company C",
  "Company D",
  "Company E",
];

const InsuranceSelect = () => {
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = () => {
    if (selectedCompany) {
      console.log("Selected Insurance Company:", selectedCompany);
      router.push("/dashboard");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-6 bg-card rounded-lg shadow-md w-full max-w-md">
      <h3 className="text-lg font-semibold text-center">
        Select Your Insurance Company
      </h3>
      <ul className="w-full space-y-2">
        {insuranceCompanies.map((company) => (
          <li
            key={company}
            className={`cursor-pointer border border-gray-300 rounded-md p-3 hover:bg-gray-100 ${
              selectedCompany === company ? "bg-blue-100 border-blue-500" : ""
            }`}
            onClick={() => setSelectedCompany(company)}
          >
            {company}
          </li>
        ))}
      </ul>
      <Button
        onClick={handleSubmit}
        disabled={!selectedCompany}
        className="w-full"
      >
        Submit
      </Button>
    </div>
  );
};
export default InsuranceSelect;