import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

export type Character = {
  id: string;
  name: string;
  configId: string;
};

const characters: Character[] = [
  {
    id: "kora",
    name: "Kora",
    configId: process.env.NEXT_PUBLIC_HUME_CONFIG_ID || "",
  },
  {
    id: "sarge",
    name: "Sarge",
    configId: process.env.NEXT_PUBLIC_SARGE_CONFIG_ID || "",
  },
  {
    id: "jasper",
    name: "Jasper",
    configId: process.env.NEXT_PUBLIC_JASPER_CONFIG_ID || "",
  },
];

interface CharacterSelectProps {
  value: string;
  onValueChange: (value: string) => void;
}

export function CharacterSelect({ value, onValueChange }: CharacterSelectProps) {
  return (
    <div className="w-[200px]">
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select a character" />
        </SelectTrigger>
        <SelectContent>
          {characters.map((character) => (
            <SelectItem key={character.id} value={character.id}>
              {character.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export function getCharacterConfig(characterId: string): string {
  const character = characters.find((c) => c.id === characterId);
  return character?.configId || "";
} 