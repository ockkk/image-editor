import { useState, ReactNode } from "react";
import { ImageObject } from "../models/ImageObject";
import { TextObject } from "../models/TextObject";
import { EditorContext } from "../contexts/EditorContext";

export function EditorProvider({ children }: { children: ReactNode }) {
  const [images, setImages] = useState<ImageObject[]>([]);
  const [texts, setTexts] = useState<TextObject[]>([]);
  const [inputText, setInputText] = useState("");
  const [hasGradient, setHasGradient] = useState(false);

  return (
    <EditorContext.Provider
      value={{
        images,
        setImages,
        texts,
        setTexts,
        inputText,
        setInputText,
        hasGradient,
        setHasGradient,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
}
