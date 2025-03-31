'use client';

import { useState } from 'react';
import LetterTracer from '../../../components/LetterTracer';
import { Button } from '../../../components/ui/button';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export default function LetterTracingPage() {
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [completedLetters, setCompletedLetters] = useState<string[]>([]);

  const handleLetterComplete = () => {
    const letter = ALPHABET[currentLetterIndex];
    if (!completedLetters.includes(letter)) {
      setCompletedLetters([...completedLetters, letter]);
    }
  };

  const handleNextLetter = () => {
    setCurrentLetterIndex((prev) => (prev + 1) % ALPHABET.length);
  };

  const handlePreviousLetter = () => {
    setCurrentLetterIndex((prev) => (prev - 1 + ALPHABET.length) % ALPHABET.length);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Letter Tracing Practice</h1>
          <p className="text-gray-600">
            Practice writing letters by tracing them. Complete each letter to progress.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <Button 
              onClick={handlePreviousLetter}
              disabled={currentLetterIndex === 0}
            >
              Previous
            </Button>
            <div className="text-2xl font-bold">
              Letter {ALPHABET[currentLetterIndex]}
            </div>
            <Button 
              onClick={handleNextLetter}
              disabled={currentLetterIndex === ALPHABET.length - 1}
            >
              Next
            </Button>
          </div>

          <LetterTracer 
            letter={ALPHABET[currentLetterIndex]} 
            onComplete={handleLetterComplete}
          />

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Progress</h2>
            <div className="grid grid-cols-6 gap-2">
              {ALPHABET.map((letter, index) => (
                <div
                  key={letter}
                  className={`
                    w-10 h-10 flex items-center justify-center rounded
                    ${completedLetters.includes(letter)
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-100 text-gray-600'}
                    ${currentLetterIndex === index ? 'ring-2 ring-blue-500' : ''}
                  `}
                >
                  {letter}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 