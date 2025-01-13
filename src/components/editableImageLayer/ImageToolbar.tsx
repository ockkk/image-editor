import Konva from "konva";
import { Group, Rect, Transformer } from "react-konva";
import { useEditor } from "../../hooks/useEditor";
import { DeleteButton } from "./DeleteButton";
import { CloseButton } from "./CloseButton";
import { OpacitySlider } from "./OpacitySlider";
import { RotateButton } from "./RotateButton";

interface ImageToolbarProps {
  id: number;
  imageRef: React.RefObject<Konva.Image>;
  transformerRef: React.RefObject<Konva.Transformer>;
  opacity: number;
  deleteX: number;
  deleteY: number;
  height?: number;
  startTransform: boolean;
  setStartTransform: (startTransform: boolean) => void;
  setDeleteX: (deleteX: number) => void;
  setDeleteY: (deleteY: number) => void;
  selectImage: (id: number | null) => void;
  handleDelete: () => void;
  handleOpacityChange: (newOpacity: number) => void;
}

export function ImageToolbar({
  id,
  imageRef,
  transformerRef,
  opacity,
  deleteX,
  deleteY,
  height,
  startTransform,
  setStartTransform,
  setDeleteX,
  setDeleteY,
  selectImage,
  handleDelete,
  handleOpacityChange,
}: ImageToolbarProps) {
  return (
    <>
      <ImageTransformer
        id={id}
        transformerRef={transformerRef}
        setStartTransform={setStartTransform}
        setDeleteX={setDeleteX}
        setDeleteY={setDeleteY}
      />
      {!startTransform && (
        <Toolbar
          imageRef={imageRef}
          deleteX={deleteX}
          deleteY={deleteY}
          height={height}
          opacity={opacity}
          selectImage={selectImage}
          handleDelete={handleDelete}
          handleOpacityChange={handleOpacityChange}
        />
      )}
    </>
  );
}

interface ImageTransformerProps {
  id: number;
  transformerRef: React.RefObject<Konva.Transformer>;
  setStartTransform: (startTransform: boolean) => void;
  setDeleteX: (deleteX: number) => void;
  setDeleteY: (deleteY: number) => void;
}

/* 이미지 크기 조절을 위한 Transformer 컴포넌트
 * - boundBoxFunc: 이미지 크기 조절 시 최소/최대 크기 제한
 * - onTransformStart: 크기 조절 시작 시 상태 업데이트
 * - onTransformEnd: 크기 조절 종료 시 상태 업데이트
 */
function ImageTransformer({
  id,
  transformerRef,
  setStartTransform,
  setDeleteX,
  setDeleteY,
}: ImageTransformerProps) {
  const { images, setImages } = useEditor();

  return (
    <Transformer
      ref={transformerRef}
      boundBoxFunc={(_, newBox) => {
        setImages(
          images.map((image) =>
            image.id === id ? { ...image, height: newBox.height } : image
          )
        );

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
  );
}

interface ToolbarProps {
  imageRef: React.RefObject<Konva.Image>;
  deleteX: number;
  deleteY: number;
  height?: number;
  opacity: number;
  selectImage: (id: number | null) => void;
  handleDelete: () => void;
  handleOpacityChange: (newOpacity: number) => void;
}

/**
 * 이미지 툴바
 * - 회전 및 반전 버튼
 * - 투명도 조절
 * - 닫기 버튼
 * - 삭제 버튼
 */
function Toolbar({
  imageRef,
  deleteX,
  deleteY,
  height,
  opacity,
  selectImage,
  handleDelete,
  handleOpacityChange,
}: ToolbarProps) {
  return (
    <Group x={deleteX} y={deleteY + (height || 0) + 10}>
      {/* 툴바 배경 */}
      <Rect
        width={400}
        height={40}
        fill="#ffffff"
        cornerRadius={6}
        shadowColor="black"
        shadowBlur={3}
        shadowOpacity={0.2}
      />
      {/* 구분선 */}
      <Rect x={80} y={5} width={1} height={30} fill="#e0e0e0" />
      {/* 회전 및 반전 버튼 그룹 */}
      <RotateButton imageRef={imageRef} />
      {/* 투명도 조절 */}
      <OpacitySlider
        opacity={opacity}
        handleOpacityChange={handleOpacityChange}
      />
      {/* 구분선 */}
      <Rect x={290} y={5} width={1} height={30} fill="#e0e0e0" />
      {/* 닫기 버튼 */}
      <CloseButton handleClose={() => selectImage(null)} />
      {/* 삭제 버튼 */}
      <DeleteButton handleDelete={handleDelete} />
    </Group>
  );
}
