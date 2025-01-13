import { Layer, Line } from "react-konva";
import { CROP_HEIGHT, CROP_WIDTH } from "../constants/cropDimension";

export function CropLayer() {
  return (
    <Layer>
      {/* 크롭 영역의 테두리를 한줄씩 그리는 영역 */}
      <Line
        points={[
          (1000 - CROP_WIDTH) / 2,
          (700 - CROP_HEIGHT) / 2, // 왼쪽 상단
          (1000 + CROP_WIDTH) / 2,
          (700 - CROP_HEIGHT) / 2, // 오른쪽 상단
        ]}
        stroke="white"
        strokeWidth={2}
      />
      <Line
        points={[
          (1000 + CROP_WIDTH) / 2,
          (700 - CROP_HEIGHT) / 2, // 오른쪽 상단
          (1000 + CROP_WIDTH) / 2,
          (700 + CROP_HEIGHT) / 2, // 오른쪽 하단
        ]}
        stroke="white"
        strokeWidth={2}
      />
      <Line
        points={[
          (1000 + CROP_WIDTH) / 2,
          (700 + CROP_HEIGHT) / 2, // 오른쪽 하단
          (1000 - CROP_WIDTH) / 2,
          (700 + CROP_HEIGHT) / 2, // 왼쪽 하단
        ]}
        stroke="white"
        strokeWidth={2}
      />
      <Line
        points={[
          (1000 - CROP_WIDTH) / 2,
          (700 + CROP_HEIGHT) / 2, // 왼쪽 하단
          (1000 - CROP_WIDTH) / 2,
          (700 - CROP_HEIGHT) / 2, // 왼쪽 상단
        ]}
        stroke="white"
        strokeWidth={2}
      />
    </Layer>
  );
}
