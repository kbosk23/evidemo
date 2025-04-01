'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { useLanguage } from "../contexts/LanguageContext";

const languages = {
  en: "English",
  es: "Español",
  zh: "中文",
  fr: "Français"
};

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  return (
    <Select value={language} onValueChange={(value: any) => setLanguage(value)}>
      <SelectTrigger className="w-[120px]">
        <SelectValue placeholder="Select language" />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(languages).map(([code, name]) => (
          <SelectItem key={code} value={code}>
            {name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
} 