// This is a settings provider that allows the user to set preferences for the application
import { createContext, useContext, useState } from 'react';

// Defines the types of props that can be passed to the SettingsProvider component
type SettingsProviderProps = {
  children: React.ReactNode;
};

// Defines the type of the SettingsProvider component state
type SettingsProviderState = {
  textInput: string;
  setTextInput: (textInput: string) => void;
  readingInterface: boolean;
  setReadingInterface: (value: boolean) => void;
  wordsAtATime: number;
  setWordsAtATime: (value: number) => void;
  wordsPerMinute: number;
  setWordsPerMinute: (value: number) => void;
  fontFamily: string;
  setFontFamily: (value: string) => void;
  fontWeight: string;
  setFontWeight: (value: string) => void;
  fontSize: string;
  setFontSize: (value: string) => void;
};

// Defines the initial state of the SettingsProvider component
// Users can set their own preferences, but these are the default values
const initialState: SettingsProviderState = {
  textInput: '',
  setTextInput: () => null,
  readingInterface: false,
  setReadingInterface: () => null,
  wordsAtATime: 1,
  setWordsAtATime: () => null,
  wordsPerMinute: 300,
  setWordsPerMinute: () => null,
  fontFamily: 'font-sans',
  setFontFamily: () => null,
  fontWeight: 'font-normal',
  setFontWeight: () => null,
  fontSize: 'text-5xl',
  setFontSize: () => null,
};

// Create a context for the SettingsProvider component
const SettingsContext = createContext<SettingsProviderState>(initialState);

// Export the SettingsProvider component to use in App.tsx
export function SettingsProvider({ children, ...props }: SettingsProviderProps) {
  // Define the state of the SettingsProvider component
  const [textInput, setTextInput] = useState<SettingsProviderState['textInput']>(initialState.textInput);
  const [readingInterface, setReadingInterface] = useState<SettingsProviderState['readingInterface']>(
    initialState.readingInterface
  );
  const [wordsAtATime, setWordsAtATime] = useState<SettingsProviderState['wordsAtATime']>(initialState.wordsAtATime);
  const [wordsPerMinute, setWordsPerMinute] = useState<SettingsProviderState['wordsPerMinute']>(
    initialState.wordsPerMinute
  );
  const [fontFamily, setFontFamily] = useState<SettingsProviderState['fontFamily']>(initialState.fontFamily);
  const [fontWeight, setFontWeight] = useState<SettingsProviderState['fontWeight']>(initialState.fontWeight);
  const [fontSize, setFontSize] = useState<SettingsProviderState['fontSize']>(initialState.fontSize);

  // Defines the value of the SettingsContext
  const value = {
    textInput,
    setTextInput: (textInput: string) => {
      setTextInput(textInput);
    },
    readingInterface,
    setReadingInterface: (value: boolean) => {
      setReadingInterface(value);
    },
    wordsAtATime,
    setWordsAtATime: (value: number) => {
      setWordsAtATime(value);
    },
    wordsPerMinute,
    setWordsPerMinute: (value: number) => {
      setWordsPerMinute(value);
    },
    fontFamily,
    setFontFamily: (value: string) => {
      setFontFamily(value);
    },
    fontWeight,
    setFontWeight: (value: string) => {
      setFontWeight(value);
    },
    fontSize,
    setFontSize: (value: string) => {
      setFontSize(value);
    },
  };

  // Return the SettingsContext.Provider component with the value prop set to the value object
  return (
    <SettingsContext.Provider
      {...props}
      value={value}
    >
      {children}
    </SettingsContext.Provider>
  );
}
// Export the useSettings hook to use in other components
export const useSettings = () => {
  return useContext(SettingsContext);
};
