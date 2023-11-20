import { useState, useEffect } from 'react';
import { FaPlay, FaForward, FaBackward, FaPause } from 'react-icons/fa';

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

import TextHandler from '@/lib/textHandler';

type TextPlayerProps = {
  readingText: string;
};

const TextPlayer = ({ readingText }: TextPlayerProps) => {
  const textHandler = new TextHandler(readingText, 2);
  const wordGroups = textHandler.wordGroups;
  const wordGroupLength = wordGroups.length;

  const [isPlaying, setIsPlaying] = useState(false);
  const [index, setIndex] = useState(0);
  const [currentText, setCurrentText] = useState(wordGroups[index]);

  // Play text
  const play = () => {
    console.log('Playing through text');
    setIsPlaying(true);
  };

  // Pause text
  const pause = () => {
    console.log('Playing paused');
    setIsPlaying(false);
  };

  // Set index to next word group
  const next = () => {
    if (index < wordGroupLength - 1) {
      setIndex((prevIndex) => prevIndex + 1);
    } else {
      console.log('End of text');
      setIsPlaying(false);
    }
  };

  // Set index to 0; reset text to beginning
  const back = () => {
    console.log('Back to beginning');
    setIndex(0);
  };

  // useEffect for updating current text display when index changes
  useEffect(() => {
    setCurrentText(wordGroups[index]);
  }, [index, wordGroups]);

  // useEffect for playing text
  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    const playHandler = () => {
      if (index < wordGroupLength - 1 && isPlaying) {
        setIndex((prevIndex) => prevIndex + 1);
      } else {
        setIsPlaying(false);
      }
    };

    if (isPlaying) {
      intervalId = setInterval(playHandler, 300); // Adjust the interval time as needed (in milliseconds)
    }

    return () => {
      if (intervalId !== null) {
        clearInterval(intervalId);
      }
    };
  }, [index, isPlaying, wordGroupLength]);

  return (
    <Card className="h-96 sm:min-h-[calc(100vh-203px)] flex flex-col justify-between dark:bg-zinc-900">
      <CardHeader>
        <p className="text-xl font-bold">{index}</p>
      </CardHeader>
      {/* Reading Content */}
      <CardContent className="p-0 my-12">
        <p className="text-center text-2xl sm:text-3xl md:text-4xl lg-text-5xl font-semibold">{currentText}</p>
      </CardContent>
      {/* Player Controls */}
      <CardFooter className="flex flex-col justify-center items-center gap-4 sm:gap-8">
        {/* Player Slider */}
        <Slider
          defaultValue={[0]}
          max={wordGroupLength - 1}
          step={1}
          value={[index]}
          onValueChange={(value) => setIndex(value[0])}
          className="cursor-pointer"
        />

        {/* Player Button Group */}
        <div className="flex justify-center items-center gap-6 text-zinc-600 dark:text-primary">
          <Button
            type="button"
            variant="ghost"
            size="lg"
            onClick={() => back()}
          >
            <FaBackward className="h-6 w-6" />
          </Button>
          {isPlaying ? (
            <Button
              type="button"
              variant="ghost"
              size="lg"
              onClick={() => pause()}
            >
              <FaPause className="h-6 w-6" />
            </Button>
          ) : (
            <Button
              type="button"
              variant="ghost"
              size="lg"
              onClick={() => play()}
            >
              <FaPlay className="h-6 w-6" />
            </Button>
          )}

          <Button
            type="button"
            variant="ghost"
            size="lg"
            onClick={() => next()}
          >
            <FaForward className="h-6 w-6" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default TextPlayer;
