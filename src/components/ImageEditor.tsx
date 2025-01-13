import { useEffect, useRef } from "react";
import { EditableTextLayer } from "./editableTextLayer/EditableTextLayer";
import { EditableImageLayer } from "./editableImageLayer/EditableImageLayer";
import { GradientOverlay } from "./gradientOverlay/GradientOverlay";
import { CropLayer } from "./CropLayer";
import { CropOverlay } from "./CropOverlay";
import { EditorProvider } from "../providers/EditorProvider";
import { CROP_HEIGHT, CROP_WIDTH } from "../constants/cropDimension";
import { AddTextButton } from "./buttons/AddTextButton";
import { ImageUploadButton } from "./buttons/ImageUploadButton";
import { GradationAddButton } from "./buttons/GradationAddButton";
import { SaveImageButton } from "./buttons/SaveImageButton";
import { useEditor } from "../hooks/useEditor";
import { Layer, Stage } from "react-konva";
import Konva from "konva";

interface ImageEditorProps {
  backgroundImage: string;
}

export function ImageEditor({ backgroundImage }: ImageEditorProps) {
  return (
    <EditorProvider>
      <ImageEditorContents backgroundImage={backgroundImage} />
    </EditorProvider>
  );
}

export function ImageEditorContents({ backgroundImage }: ImageEditorProps) {
  // Stage에 ref 추가
  const stageRef = useRef<Konva.Stage>(null);
  const { hasGradient, setImages } = useEditor();

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = backgroundImage;
    img.onload = () => {
      setImages([
        {
          id: Date.now(),
          url: backgroundImage,
          opacity: 1,
          width: img.width,
          height: img.height,
        },
      ]);
    };
  }, [backgroundImage, setImages]);

  return (
    <>
      <Stage
        ref={stageRef}
        width={1000}
        height={700}
        style={{ border: "1px solid black" }}
      >
        <CropOverlay CROP_WIDTH={CROP_WIDTH} CROP_HEIGHT={CROP_HEIGHT} />
        <Layer>
          <EditableImageLayer />
          {hasGradient && <GradientOverlay />}
          <EditableTextLayer />
        </Layer>
        <CropLayer />
      </Stage>
      <div className="root-button-container">
        <AddTextButton />
        <ImageUploadButton />
        <GradationAddButton />
        <SaveImageButton stageRef={stageRef} />
      </div>
    </>
  );
}
