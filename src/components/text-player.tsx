import { useState, useEffect } from 'react';
import { FaPlay, FaForward, FaBackward, FaPause, FaEdit } from 'react-icons/fa';

import { useSettings } from '@/components/settings-provider';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import SettingsDialog from '@/components/settings-dialog';
import TextareaFormDialog from '@/components/text-form-dialog';

import TextHandler from '@/lib/textHandler';

const TextPlayer = () => {
  // Access state from SettingsProvider
  const { textInput, readingInterface, wordsAtATime, wordsPerMinute, fontFamily, fontWeight, fontSize } = useSettings();

  // Create word groups from text input
  const textHandler = new TextHandler(textInput, wordsAtATime);
  // Get word groups
  const wordGroups = textHandler.wordGroups;
  // Get length of word groups
  const wordGroupLength = wordGroups.length;

  // State for text player
  const [isPlaying, setIsPlaying] = useState(false);
  // State for current word group
  const [index, setIndex] = useState(0);
  // State for current text display
  const [currentText, setCurrentText] = useState(wordGroups[index]);

  // Play text
  const play = () => {
    setIsPlaying(true);
  };

  // Pause text
  const pause = () => {
    setIsPlaying(false);
  };

  // Set index to last word group
  const next = () => {
    setIndex(wordGroupLength - 1);
  };

  // Set index to 0; reset text to beginning
  const back = () => {
    setIndex(0);
  };

  // If user submits the same text in the Edit Form or wordsAtATime does not change in settings, don't reset index
  // Else if user submits new text or wordsAtATime changes, reset index to 0
  useEffect(() => {
    setIndex(0);
  }, [textInput, wordsAtATime]);

  // useEffect for updating current text display when index changes
  useEffect(() => {
    setCurrentText(wordGroups[index]);
  }, [index, wordGroups]);

  // useEffect for playing text
  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;
    const intervalTime = 60000 / wordsPerMinute;

    const playHandler = () => {
      if (index < wordGroupLength - 1 && isPlaying) {
        setIndex((prevIndex) => prevIndex + 1);
      } else {
        pause();
      }
    };

    if (isPlaying) {
      intervalId = setInterval(playHandler, intervalTime);
    }

    return () => {
      if (intervalId !== null) {
        clearInterval(intervalId);
      }
    };
  }, [index, isPlaying, wordGroupLength, wordsPerMinute]);

  // Display text player if readingInterface is true
  return (
    <>
      {readingInterface && (
        <Card className="min-h-[calc(100vh-114px)] sm:min-h-[calc(100vh-178px)] md:min-h-[calc(100vh-203px)] max-sm:rounded-none border-0 flex flex-col justify-between dark:bg-zinc-900 overflow-hidden">
          <CardHeader className="flex flex-row justify-end items-center max-sm:py-3">
            <div className="flex items-center gap-2">
              {/* Edit Text Form */}
              <TextareaFormDialog
                btnLabel={<FaEdit className="h-6 w-6" />}
                btnSize="icon"
                btnVariant="ghost"
                formTitle="Edit Text"
                btnClassName="text-muted-foreground rounded-full"
              />

              {/* Settings Form */}
              <SettingsDialog />
            </div>
          </CardHeader>

          {/* Reading Content */}
          <CardContent className="p-0 overflow-hidden">
            <p className={`text-center p-2 ${fontFamily} ${fontWeight} ${fontSize}`}>{currentText}</p>
          </CardContent>

          {/* Player Controls */}
          <CardFooter className="flex flex-col justify-center items-center mt-4 max-sm:py-3 gap-1">
            <div className="w-full">
              {/* Player Slider */}
              <Slider
                defaultValue={[0]}
                max={wordGroupLength - 1}
                step={1}
                value={[index]}
                onValueChange={(value) => setIndex(value[0])}
                className="cursor-pointer"
              />

              <div className="w-full flex justify-between gap-4 font-semibold text-xs sm:text-sm text-muted-foreground">
                <p>Index: {index}</p>
                <p>WPM: {wordsPerMinute}</p>
              </div>
            </div>

            {/* Player Controls */}
            <div className="flex justify-center items-center gap-11 text-muted-foreground transition">
              {/* Back */}
              <Button
                variant="ghost"
                size="lg"
                onClick={() => back()}
                className="px-4 h-14 w-14 rounded-full transition-all duration-300"
              >
                <FaBackward className="h-6 w-6" />
              </Button>
              {isPlaying ? (
                // Pause
                <Button
                  variant="ghost"
                  size="lg"
                  onClick={() => pause()}
                  className="px-4 h-14 w-14 rounded-full transition-all duration-300"
                >
                  <FaPause className="h-6 w-6" />
                </Button>
              ) : (
                // Play
                <Button
                  variant="ghost"
                  size="lg"
                  onClick={() => play()}
                  className="px-4 h-14 w-14 rounded-full transition-all duration-300"
                >
                  <FaPlay className="h-6 w-6" />
                </Button>
              )}
              {/* Foward */}
              <Button
                variant="ghost"
                size="lg"
                onClick={() => next()}
                className="px-4 h-14 w-14 rounded-full transition-all duration-300"
              >
                <FaForward className="h-6 w-6" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      )}
    </>
  );
};

export default TextPlayer;
