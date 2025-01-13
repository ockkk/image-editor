import { Layer, Rect } from "react-konva";

interface CropOverlayProps {
  CROP_WIDTH: number;
  CROP_HEIGHT: number;
}

export function CropOverlay({ CROP_WIDTH, CROP_HEIGHT }: CropOverlayProps) {
  return (
    <Layer>
      {/* 크롭 영역 외부를 어둡게 표시하는 오버레이 */}
      <Rect x={0} y={0} width={1000} height={700} fill="rgba(0, 0, 0, 0.1)" />
      <Rect
        x={(1000 - CROP_WIDTH) / 2}
        y={(700 - CROP_HEIGHT) / 2}
        width={CROP_WIDTH}
        height={CROP_HEIGHT}
        fill="rgba(0, 0, 0, 1)"
        globalCompositeOperation="destination-out"
      />
    </Layer>
  );
}
