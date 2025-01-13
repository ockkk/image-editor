import { createContext } from "react";
import { ImageObject } from "../models/ImageObject";
import { TextObject } from "../models/TextObject";

export interface EditorContextType {
  images: ImageObject[];
  setImages: (images: ImageObject[]) => void;
  texts: TextObject[];
  setTexts: (texts: TextObject[]) => void;
  inputText: string;
  setInputText: (text: string) => void;
  hasGradient: boolean;
  setHasGradient: (hasGradient: boolean) => void;
}

export const EditorContext = createContext<EditorContextType | undefined>(
  undefined
);
