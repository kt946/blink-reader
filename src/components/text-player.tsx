import { useState, useEffect } from 'react';
import { FaPlay, FaForward, FaBackward, FaPause } from 'react-icons/fa';

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

import TextHandler from '@/lib/textHandler';
import SettingsDialog from './settings-dialog';
import TextareaFormDialog from './text-form-dialog';

type TextPlayerProps = {
  textInput: string;
  setTextInput: (value: string) => void;
};

const TextPlayer = ({ textInput, setTextInput }: TextPlayerProps) => {
  const [wordsAtATime, setWordsAtATime] = useState(1);
  const [wordsPerMinute, setWordsPerMinute] = useState(300);
  const [fontFamily, setFontFamily] = useState('font-sans');
  const [fontWeight, setFontWeight] = useState('font-normal');
  const [fontSize, setFontSize] = useState('text-5xl');

  const textHandler = new TextHandler(textInput, wordsAtATime);
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
    if (index > wordGroupLength) {
      setIndex(wordGroupLength - 1);
    }
    setCurrentText(wordGroups[index]);
  }, [index, wordGroups, wordGroupLength]);

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

  return (
    <Card className="min-h-[calc(100vh-126px)] md:min-h-[calc(100vh-203px)] max-sm:rounded-none max-sm:border-0 flex flex-col justify-between dark:bg-zinc-900 overflow-hidden">
      <CardHeader className="flex flex-row justify-between items-center">
        <div className="flex gap-6 text-sm sm:text-lg text-muted-foreground">
          <p>
            WPM: <span className="font-bold text-primary">{wordsPerMinute}</span>
          </p>
          <p>
            Chunk size: <span className="font-bold text-primary">{wordsAtATime}</span>
          </p>
          <p>
            Index: <span className="font-bold text-primary">{index}</span>
          </p>
        </div>
        <div className="flex items-center gap-4">
          {/* Edit Text Form */}
          <TextareaFormDialog
            setTextInput={setTextInput}
            btnLabel="Edit Text"
            btnSize="sm"
            btnVariant="secondary"
            formTitle="Edit Text"
            textInput={textInput}
            index={index}
            back={back}
          />

          {/* Settings Form */}
          <SettingsDialog
            setWordsAtATime={setWordsAtATime}
            setWordsPerMinute={setWordsPerMinute}
            setFontFamily={setFontFamily}
            setFontWeight={setFontWeight}
            setFontSize={setFontSize}
          />
        </div>
      </CardHeader>
      {/* Reading Content */}
      <CardContent className="p-0 my-12 overflow-hidden">
        <p className={`text-center p-2 ${fontFamily} ${fontWeight} ${fontSize}`}>{currentText}</p>
      </CardContent>
      {/* Player Controls */}
      <CardFooter className="flex flex-col justify-center items-center mt-4  gap-2 sm:gap-4">
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
        <div className="flex justify-center items-center gap-2 text-zinc-600 dark:text-primary">
          {/* Back */}
          <Button
            variant="ghost"
            size='icon'
            onClick={() => back()}
          >
            <FaBackward className="h-6 w-6" />
          </Button>
          {isPlaying ? (
            // Pause
            <Button
              variant="ghost"
              size="icon"
              onClick={() => pause()}
            >
              <FaPause className="h-6 w-6" />
            </Button>
          ) : (
            // Play
            <Button
              variant="ghost"
              size="icon"
              onClick={() => play()}
            >
              <FaPlay className="h-6 w-6" />
            </Button>
          )}
          {/* Foward */}
          <Button
            variant="ghost"
            size="icon"
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
