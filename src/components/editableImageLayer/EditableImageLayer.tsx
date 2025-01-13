import { useState } from "react";
import { EditableImage } from "./EditableImage";
import { useEditor } from "../../hooks/useEditor";

export function EditableImageLayer() {
  const { images, setImages } = useEditor();
  const [selectedImageId, setSelectedImageId] = useState<number | null>(null);

  // 이미지 선택
  const selectImage = (id: number | null) => {
    setSelectedImageId(id);
  };

  // 이미지 삭제
  const deleteImage = (id: number) => {
    setImages(images.filter((image) => image.id !== id));
  };

  // 이미지 이동
  const dragMove = (id: number, x: number, y: number) => {
    setImages(
      images.map((image) => (image.id === id ? { ...image, x, y } : image))
    );
  };

  // 이미지 투명도 변경
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
          isSelected={selectedImageId === image.id}
          deleteImage={deleteImage}
          dragMove={dragMove}
          opacityChange={opacityChange}
          selectImage={selectImage}
        />
      ))}
    </>
  );
}
