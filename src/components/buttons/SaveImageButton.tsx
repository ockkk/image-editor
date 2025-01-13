import Konva from "konva";
import { CROP_HEIGHT, CROP_WIDTH } from "../../constants/cropDimension";

interface SaveImageButtonProps {
  stageRef: React.RefObject<Konva.Stage>;
}

export function SaveImageButton({ stageRef }: SaveImageButtonProps) {
  const handleSaveImage = () => {
    // Stage 참조를 위한 ref 생성
    const stage = stageRef.current;
    if (!stage) return;

    // 크롭 영역의 위치와 크기 계산
    const cropX = (1000 - CROP_WIDTH) / 2;
    const cropY = (700 - CROP_HEIGHT) / 2;

    // 크롭된 이미지 데이터 추출
    const croppedURL = stage.toDataURL({
      x: cropX,
      y: cropY,
      width: CROP_WIDTH,
      height: CROP_HEIGHT,
      pixelRatio: 2, // 고해상도 출력을 위해 설정
    });

    // 다운로드 링크 생성 및 클릭
    const link = document.createElement("a");
    link.download = "cropped-image.png";
    link.href = croppedURL;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    alert("이미지 저장 완료");
  };

  return (
    <button
      onClick={handleSaveImage}
      style={{
        backgroundColor: "#28a745",
        color: "white",
      }}
    >
      이미지 저장
    </button>
  );
}
