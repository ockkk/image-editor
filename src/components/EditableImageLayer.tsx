import useImage from "use-image";
import { ImageObject } from "../models/ImageObject";
import { Circle, Group, Image, Text, Transformer } from "react-konva";
import { useEffect, useRef, useState } from "react";
import Konva from "konva";
import { KonvaEventObject } from "konva/lib/Node";
import { Html } from "react-konva-utils";

interface EditableImageLayerProps {
  images: ImageObject[];
  setImages: (images: ImageObject[]) => void;
}

export function EditableImageLayer({
  images,
  setImages,
}: EditableImageLayerProps) {
  const deleteImage = (id: number) => {
    setImages(images.filter((image) => image.id !== id));
  };

  const dragMove = (id: number, x: number, y: number) => {
    setImages(
      images.map((image) => (image.id === id ? { ...image, x, y } : image))
    );
  };

  const opacityChange = (id: number, opacity: number) => {
    setImages(
      images.map((image) => (image.id === id ? { ...image, opacity } : image))
    );
  };

  return (
    <>
      {images.map((image) => (
        <EditableImage
          {...image}
          deleteImage={deleteImage}
          dragMove={dragMove}
          opacityChange={opacityChange}
        />
      ))}
    </>
  );
}

interface EditableImageProps extends ImageObject {
  deleteImage: (id: number) => void;
  dragMove: (id: number, x: number, y: number) => void;
  opacityChange: (id: number, opacity: number) => void;
}

function EditableImage({
  height,
  id,
  url,
  width,
  x,
  y,
  opacity = 1,
  deleteImage,
  dragMove,
  opacityChange,
}: EditableImageProps) {
  const [image] = useImage(url);
  const imageRef = useRef<Konva.Image>(null);
  const transformerRef = useRef<Konva.Transformer>(null);
  const [isSelected, setIsSelected] = useState(false);
  const [startTransform, setStartTransform] = useState<boolean>(false);
  const [deleteX, setDeleteX] = useState<number>(0);
  const [deleteY, setDeleteY] = useState<number>(0);

  useEffect(() => {
    if (isSelected && transformerRef.current && imageRef.current) {
      transformerRef.current.nodes([imageRef.current]);
      transformerRef.current.getLayer()?.batchDraw();
    }
  }, [isSelected]);

  const handleSelect = () => {
    // if (isSelected) {
    //   setIsSelected(false);
    // } else {
    setIsSelected(true);
    // }
  };

  // const handleDeselect = (e: any) => {
  //   console.log("!@#!@#");
  //   // 이미지 외부를 클릭했을 때만 선택 해제
  //   // const clickedOnEmpty = e.target === e.target.getStage();
  //   // if (clickedOnEmpty) {
  //   // }
  //   setIsSelected(false);
  // };

  const handleDelete = () => {
    deleteImage(id);
  };

  const handleDragMove = (e: KonvaEventObject<DragEvent>) => {
    dragMove(id, e.target.x(), e.target.y());
    setDeleteX(e.target.x());
    setDeleteY(e.target.y());
  };

  const handleOpacityChange = (newOpacity: number) => {
    opacityChange(id, newOpacity);
  };

  return (
    <>
      <Image
        ref={imageRef}
        key={id}
        image={image}
        x={x}
        y={y}
        width={width}
        height={height}
        opacity={opacity}
        draggable
        onDragMove={handleDragMove}
        onClick={handleSelect}
        onTap={handleSelect}
        onMouseDown={handleSelect}
      />
      {isSelected && (
        <>
          <Transformer
            ref={transformerRef}
            boundBoxFunc={(oldBox, newBox) => {
              const minWidth = 5;
              const minHeight = 5;
              const maxWidth = 800;
              const maxHeight = 800;

              if (
                newBox.width < minWidth ||
                newBox.height < minHeight ||
                newBox.width > maxWidth ||
                newBox.height > maxHeight
              ) {
                return oldBox;
              }

              return newBox;
            }}
            onTransformStart={(e) => {
              setStartTransform(true);
              setDeleteX(e.target.x());
              setDeleteY(e.target.y());
            }}
            onTransformEnd={(e) => {
              setStartTransform(false);
              setDeleteX(e.target.x());
              setDeleteY(e.target.y());
            }}
          />
          {!startTransform && (
            <Group x={deleteX} y={deleteY}>
              <Circle
                radius={10}
                fill="red"
                onClick={handleDelete}
                onTap={handleDelete}
              />
              <Text
                text="×"
                fill="white"
                fontSize={16}
                x={-5}
                y={-8}
                onClick={handleDelete}
                onTap={handleDelete}
              />
              <Group x={10} y={-10}>
                <Html>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={opacity}
                    onChange={(e) =>
                      handleOpacityChange(parseFloat(e.target.value))
                    }
                    style={{
                      position: "absolute",
                      width: "100px",
                      transform: "scale(0.8)",
                    }}
                  />
                </Html>
              </Group>
            </Group>
          )}
        </>
      )}
    </>
  );
}
