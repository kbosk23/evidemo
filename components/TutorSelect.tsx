"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export type Tutor = {
  id: string;
  name: string;
  configId: string;
  description: string;
};

export const tutors: Tutor[] = [
  {
    id: "kora",
    name: "Kora",
    configId: process.env.NEXT_PUBLIC_HUME_CONFIG_ID || "",
    description: "Your friendly reading tutor",
  },
  {
    id: "sarge",
    name: "Sarge",
    configId: process.env.NEXT_PUBLIC_SARGE_CONFIG_ID || "",
    description: "Your motivational reading coach",
  },
  {
    id: "jasper",
    name: "Jasper",
    configId: process.env.NEXT_PUBLIC_JASPER_CONFIG_ID || "",
    description: "Your supportive reading companion",
  },
];

interface TutorSelectProps {
  value: string;
  onValueChange: (value: string) => void;
}

export function TutorSelect({ value, onValueChange }: TutorSelectProps) {
  return (
    <div className="w-[200px]">
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a tutor" />
        </SelectTrigger>
        <SelectContent>
          {tutors.map((tutor) => (
            <SelectItem key={tutor.id} value={tutor.id}>
              <div className="flex flex-col">
                <span className="font-medium">{tutor.name}</span>
                <span className="text-xs text-gray-500">{tutor.description}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export function getTutorConfig(tutorId: string): string {
  const tutor = tutors.find((t) => t.id === tutorId);
  return tutor?.configId || "";
} 