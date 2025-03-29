"use client";

import Messages from "./Messages";
import Controls from "./Controls";
import StartCall from "./StartCall";
import { ComponentRef, useRef, useState, useCallback } from "react";
import { TutorSelect, getTutorConfig, tutors } from "./TutorSelect";
import { VoiceProviderWrapper } from "./VoiceProviderWrapper";

export default function ClientComponent({
  accessToken,
}: {
  accessToken: string;
}) {
  const timeout = useRef<number | null>(null);
  const ref = useRef<ComponentRef<typeof Messages> | null>(null);
  const [selectedTutor, setSelectedTutor] = useState<string>("");
  const [isConnected, setIsConnected] = useState(false);

  // Get config ID for selected tutor
  const configId = getTutorConfig(selectedTutor);

  // Handler for when chat ends
  const handleEndChat = useCallback(() => {
    setIsConnected(false);
    setSelectedTutor(""); // Reset to tutor selection screen
  }, []);

  // Handle message scrolling and storage
  const handleMessage = useCallback((message: any) => {
    if (timeout.current) {
      window.clearTimeout(timeout.current);
    }

    timeout.current = window.setTimeout(() => {
      if (ref.current) {
        const scrollHeight = ref.current.scrollHeight;
        ref.current.scrollTo({
          top: scrollHeight,
          behavior: "smooth",
        });
      }
    }, 200);
  }, []);

  // Handle connection status change
  const handleConnectionChange = useCallback((status: string) => {
    setIsConnected(status === "connected");
  }, []);
  
  if (!selectedTutor) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-center text-gray-800">
            Choose Your Reading Tutor
          </h1>
          <p className="text-center text-gray-600">
            Select a tutor to start your learning session
          </p>
          <div className="flex justify-center">
            <TutorSelect 
              value={selectedTutor} 
              onValueChange={setSelectedTutor} 
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="relative grow flex flex-col mx-auto w-full overflow-hidden">
        <VoiceProviderWrapper
          accessToken={accessToken}
          configId={configId}
          onMessage={handleMessage}
        >
          <Messages ref={ref} />
          <Controls onEndChat={handleEndChat} />
          <StartCall 
            autoConnect={true}
            onConnectionChange={handleConnectionChange}
          />
        </VoiceProviderWrapper>
      </div>
    </div>
  );
}
