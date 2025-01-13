import React, { useRef, useEffect, useState } from "react";
import { Group, Rect, Transformer } from "react-konva";
import Konva from "konva";
import { CROP_HEIGHT, CROP_WIDTH } from "../../constants/cropDimension";
import { useOutSideClick } from "../../hooks/useOutSideClick";
import GradientToolbar from "./GradientToolbar";

interface GradientOverlayProps {
  // startOpacity?: number;
  // endOpacity?: number;
  children?: React.ReactNode;
}

const initialX = (1000 - CROP_WIDTH) / 2;
const initialY = CROP_HEIGHT + 65;
const initialWidth = CROP_WIDTH;
const initialHeight = CROP_HEIGHT / 3;

export const GradientOverlay: React.FC<GradientOverlayProps> = ({
  // startOpacity = 0.1,
  // endOpacity = 0.7,
  children,
}) => {
  const [startTransform, setStartTransform] = useState(false);
  const [x, setX] = useState(initialX);
  const [y, setY] = useState(initialY);
  const [height, setHeight] = useState(initialHeight);
  const [isSelected, setIsSelected] = useState(false);
  const [startOpacity, setStartOpacity] = useState(0.1);
  const [endOpacity, setEndOpacity] = useState(0.7);

  const groupRef = useRef<Konva.Group>(null);
  const transformerRef = useRef<Konva.Transformer>(null);

  console.log(groupRef.current);
  useOutSideClick(groupRef, () => setIsSelected(false));

  useEffect(() => {
    if (isSelected && transformerRef.current && groupRef.current) {
      transformerRef.current.nodes([groupRef.current]);
      transformerRef.current.getLayer()?.batchDraw();
    }
  }, [isSelected]);

  return (
    <>
      <Group
        x={initialX}
        y={initialY}
        ref={groupRef}
        draggable
        onClick={() => setIsSelected(true)}
        onTap={() => setIsSelected(true)}
      >
        <Rect
          width={initialWidth}
          height={initialHeight}
          fillLinearGradientStartPoint={{ x: 0, y: 0 }}
          fillLinearGradientEndPoint={{ x: 0, y: initialHeight }}
          fillLinearGradientColorStops={[
            0,
            `rgba(0, 0, 0, ${startOpacity})`,
            1,
            `rgba(0, 0, 0, ${endOpacity})`,
          ]}
          perfectDrawEnabled={false}
        />
        {children}
      </Group>
      {isSelected && (
        <>
          <Transformer
            ref={transformerRef}
            boundBoxFunc={(_, newBox) => {
              setHeight(newBox.height);
              return newBox;
            }}
            onTransformStart={(e) => {
              setStartTransform(true);
              setX(e.target.x());
              setY(e.target.y());
            }}
            onTransformEnd={(e) => {
              setStartTransform(false);
              setX(e.target.x());
              setY(e.target.y());
            }}
          />
          {!startTransform && (
            <Group x={x} y={y + height + 10}>
              <GradientToolbar
                startOpacity={startOpacity}
                endOpacity={endOpacity}
                onStartOpacityChange={setStartOpacity}
                onEndOpacityChange={setEndOpacity}
                onClose={() => setIsSelected(false)}
              />
            </Group>
          )}
        </>
      )}
    </>
  );
};
