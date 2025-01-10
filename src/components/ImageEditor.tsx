import { useEffect, useState, useRef } from "react";
import { Layer, Stage, Rect } from "react-konva";
import { EditableTextLayer } from "./EditableTextLayer";
import { TextObject } from "../models/TextObject";
import { ImageObject } from "../models/ImageObject";
import { EditableImageLayer } from "./EditableImageLayer";
import { BlurLayer } from "./BlurLayer";
import { BlurObject } from "../models/BlurObject";
import Konva from "konva";

interface ImageEditorProps {
  backgroundImage: string;
}

export function ImageEditor({ backgroundImage }: ImageEditorProps) {
  const [images, setImages] = useState<ImageObject[]>([]);
  const [scale, setScale] = useState(1);
  const [texts, setTexts] = useState<TextObject[]>([]);
  const [inputText, setText] = useState("");
  const [blurs, setBlurs] = useState<BlurObject[]>([]);

  // const handleZoomIn = () => {
  //   setScale(scale * 1.2);
  // };

  // const handleZoomOut = () => {
  //   setScale(scale * 0.8);
  // };

  const handleAddText = () => {
    if (inputText.trim() !== "") {
      setTexts([
        ...texts,
        {
          id: Date.now(),
          text: inputText,
          x: 50,
          y: 50,
          isEditing: false,
          fontSize: 16,
          fontFamily: "Arial",
          fontWeight: "",
          fill: "black",
          align: "left",
        },
      ]);
      setText("");
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const img = new Image();
      img.crossOrigin = "anonymous";
      const imageUrl = URL.createObjectURL(file);
      img.onload = () => {
        setImages([
          ...images,
          {
            id: Date.now(),
            url: imageUrl,
            opacity: 1,
          },
        ]);
      };
      img.src = imageUrl;
    }
  };

  const handleAddBlur = () => {
    setBlurs([
      ...blurs,
      {
        id: Date.now(),
        x: 100,
        y: 100,
        width: 100,
        height: 100,
        blurRadius: 10,
      },
    ]);
  };

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
  };

  // Stage에 ref 추가
  const stageRef = useRef<Konva.Stage>(null);

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
        },
      ]);
    };
  }, [backgroundImage]);

  // 크롭 영역 크기 상수 정의
  const CROP_WIDTH = 580;
  const CROP_HEIGHT = 340;

  return (
    <div>
      <Stage
        ref={stageRef}
        width={1000}
        height={700}
        style={{ border: "1px solid black" }}
      >
        <Layer>
          {/* 크롭 영역 외부를 어둡게 표시하는 오버레이 */}
          <Rect
            x={0}
            y={0}
            width={1000}
            height={700}
            fill="rgba(0, 0, 0, 0.5)"
          />
          {/* 크롭 영역을 투명하게 만드는 Rect */}
          <Rect
            x={(1000 - CROP_WIDTH) / 2}
            y={(700 - CROP_HEIGHT) / 2}
            width={CROP_WIDTH}
            height={CROP_HEIGHT}
            fill="rgba(0, 0, 0, 1)"
            globalCompositeOperation="destination-out"
          />
        </Layer>
        <Layer>
          <EditableImageLayer images={images} setImages={setImages} />
          <BlurLayer blurs={blurs} setBlurs={setBlurs} />
          <EditableTextLayer texts={texts} setTexts={setTexts} />
        </Layer>
        <Layer>
          {/* 크롭 영역의 테두리를 한줄씩 그리는 영역 */}
          <Rect
            x={(1000 - CROP_WIDTH) / 2}
            y={(700 - CROP_HEIGHT) / 2}
            width={CROP_WIDTH}
            height={CROP_HEIGHT}
            stroke="white"
            strokeWidth={2}
            fill="transparent"
          />
        </Layer>
      </Stage>
      <div>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setText(e.target.value)}
          placeholder="텍스트를 입력하세요"
        />
        <button onClick={handleAddText}>추가</button>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          style={{ marginLeft: "10px" }}
        />
        <button onClick={handleAddBlur} style={{ marginLeft: "10px" }}>
          블러 추가
        </button>
        <button onClick={handleSaveImage} style={{ marginLeft: "10px" }}>
          이미지 저장
        </button>
      </div>
    </div>
  );
}
