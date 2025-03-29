"use client";

import { useVoice } from "@humeai/voice-react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "./ui/button";
import { Phone } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface StartCallProps {
  autoConnect?: boolean;
  onConnectionChange?: (status: string) => void;
}

export default function StartCall({ 
  autoConnect = false,
  onConnectionChange,
}: StartCallProps) {
  const { status, connect } = useVoice();
  const [isConnecting, setIsConnecting] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [autoConnectFailed, setAutoConnectFailed] = useState(false);
  const mounted = useRef(false);
  const connectTimeoutRef = useRef<NodeJS.Timeout>();
  const initialDelayRef = useRef<NodeJS.Timeout>();
  const hasAttemptedConnection = useRef(false);

  // Handle connection status changes
  useEffect(() => {
    if (onConnectionChange) {
      onConnectionChange(status.value);
    }

    if (status.value === "connected") {
      setIsConnecting(false);
      setRetryCount(0);
      setAutoConnectFailed(false);
      hasAttemptedConnection.current = true;
    }
  }, [status.value, onConnectionChange]);

  // Handle component lifecycle
  useEffect(() => {
    mounted.current = true;
    hasAttemptedConnection.current = false;

    return () => {
      mounted.current = false;
      if (connectTimeoutRef.current) {
        clearTimeout(connectTimeoutRef.current);
      }
      if (initialDelayRef.current) {
        clearTimeout(initialDelayRef.current);
      }
    };
  }, []);

  // Handle auto-connect
  useEffect(() => {
    const attemptConnection = async () => {
      if (!autoConnect || 
          isConnecting || 
          status.value === "connected" || 
          !mounted.current || 
          hasAttemptedConnection.current) {
        return;
      }

      try {
        setIsConnecting(true);
        // Add initial delay before first connection attempt
        await new Promise(resolve => {
          initialDelayRef.current = setTimeout(resolve, 500);
        });
        
        if (!mounted.current) return;
   
        await connect();
      } catch (error) {
        console.error("Failed to connect:", error);
        if (mounted.current && retryCount < 3) {
          const nextRetryCount = retryCount + 1;
          setRetryCount(nextRetryCount);
          // Add exponential backoff for retries
          const delay = Math.min(1000 * Math.pow(2, retryCount), 5000);
          connectTimeoutRef.current = setTimeout(() => {
            if (mounted.current) {
              setIsConnecting(false);
              hasAttemptedConnection.current = false; // Allow another attempt
              if (nextRetryCount < 3) {
                attemptConnection();
              } else {
                setAutoConnectFailed(true);
              }
            }
          }, delay);
        } else {
          if (mounted.current) {
            setIsConnecting(false);
            setRetryCount(0);
            setAutoConnectFailed(true);
          }
        }
      }
    };

    attemptConnection();
  }, [autoConnect, connect, isConnecting, retryCount, status.value]);

  // Don't show anything if autoConnect is true and hasn't failed
  if (autoConnect && !autoConnectFailed) {
    return null;
  }

  // Don't show the button if we're already connected
  if (status.value === "connected") {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 p-4 flex items-center justify-center bg-background/80"
        initial="initial"
        animate="enter"
        exit="exit"
        variants={{
          initial: { opacity: 0 },
          enter: { opacity: 1 },
          exit: { opacity: 0 },
        }}
      >
        <motion.div
          variants={{
            initial: { scale: 0.5 },
            enter: { scale: 1 },
            exit: { scale: 0.5 },
          }}
        >
          <Button
            className="z-50 flex items-center gap-1.5 bg-green-700 hover:bg-green-800 text-white"
            onClick={() => {
              if (!isConnecting) {
                setIsConnecting(true);
                setRetryCount(0);
                hasAttemptedConnection.current = false;
                setTimeout(() => {
                  if (mounted.current) {
                    connect()
                      .catch(error => {
                        console.error("Manual connection failed:", error);
                      })
                      .finally(() => {
                        if (mounted.current) {
                          setIsConnecting(false);
                        }
                      });
                  }
                }, 500);
              }
            }}
            disabled={isConnecting}
          >
            <span>
              <Phone
                className="size-4 opacity-50"
                strokeWidth={2}
                stroke="currentColor"
              />
            </span>
            <span>
              {isConnecting 
                ? retryCount > 0 
                  ? `Retrying... (${retryCount}/3)` 
                  : "Connecting..." 
                : autoConnectFailed 
                  ? "Connection Failed - Click to Retry" 
                  : "Let's Learn!"}
            </span>
          </Button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
