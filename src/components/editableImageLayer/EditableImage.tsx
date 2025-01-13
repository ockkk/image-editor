import { useEffect, useRef, useState } from "react";
import { ImageObject } from "../../models/ImageObject";
import { ImageToolbar } from "./ImageToolbar";
import { KonvaEventObject } from "konva/lib/Node";
import { Image } from "react-konva";
import useImage from "use-image";
import Konva from "konva";

interface EditableImageProps extends ImageObject {
  isSelected: boolean;
  deleteImage: (id: number) => void;
  dragMove: (id: number, x: number, y: number) => void;
  opacityChange: (id: number, opacity: number) => void;
  selectImage: (id: number | null) => void;
}

export function EditableImage({
  height,
  id,
  url,
  x,
  y,
  opacity = 1,
  isSelected,
  deleteImage,
  dragMove,
  opacityChange,
  selectImage,
}: EditableImageProps) {
  const [image] = useImage(url); // 이미지 로드
  const imageRef = useRef<Konva.Image>(null); // 이미지 참조
  const transformerRef = useRef<Konva.Transformer>(null); // 트랜스포머 참조
  const [startTransform, setStartTransform] = useState<boolean>(false); // 트랜스포머 시작 여부
  const [deleteX, setDeleteX] = useState<number>(0); // 삭제 위치 x
  const [deleteY, setDeleteY] = useState<number>(0); // 삭제 위치 y

  useEffect(() => {
    // 이미지 선택 시 트랜스포머 적용
    if (isSelected && transformerRef.current && imageRef.current) {
      transformerRef.current.nodes([imageRef.current]);
      transformerRef.current.getLayer()?.batchDraw();
    }
  }, [isSelected]);

  // 이미지 선택
  const handleSelect = () => {
    selectImage(id);
  };

  // 이미지 삭제
  const handleDelete = () => {
    deleteImage(id);
  };

  // 이미지 이동
  const handleDragMove = (e: KonvaEventObject<DragEvent>) => {
    dragMove(id, e.target.x(), e.target.y());
    setDeleteX(e.target.x());
    setDeleteY(e.target.y());
  };

  // 이미지 투명도 변경
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
        opacity={opacity}
        draggable
        onDragMove={handleDragMove}
        onClick={handleSelect}
        onTap={handleSelect}
        onMouseDown={handleSelect}
      />
      {isSelected && (
        <ImageToolbar
          id={id}
          imageRef={imageRef}
          transformerRef={transformerRef}
          opacity={opacity}
          deleteX={deleteX}
          deleteY={deleteY}
          height={height}
          startTransform={startTransform}
          setStartTransform={setStartTransform}
          setDeleteX={setDeleteX}
          setDeleteY={setDeleteY}
          selectImage={selectImage}
          handleDelete={handleDelete}
          handleOpacityChange={handleOpacityChange}
        />
      )}
    </>
  );
}
