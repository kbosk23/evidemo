import { VoiceProvider } from "@humeai/voice-react";
import { ReactNode } from "react";

interface VoiceProviderWrapperProps {
  accessToken: string;
  configId: string;
  children: ReactNode;
  onMessage?: (message: any) => void;
}

export function VoiceProviderWrapper({
  accessToken,
  configId,
  children,
  onMessage,
}: VoiceProviderWrapperProps) {
  if (!configId) {
    return null;
  }

  return (
    <VoiceProvider
      auth={{ type: "accessToken", value: accessToken }}
      configId={configId}
      onMessage={onMessage}
    >
      {children}
    </VoiceProvider>
  );
} 