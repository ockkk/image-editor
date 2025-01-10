import { useEffect, useRef, useState } from "react";
import { Rect, Transformer } from "react-konva";
import { BlurObject } from "../models/BlurObject";
import { Html } from "react-konva-utils";
import { Group } from "react-konva";
import Konva from "konva";

interface BlurLayerProps {
  blurs: BlurObject[];
  setBlurs: (blurs: BlurObject[]) => void;
}

export function BlurLayer({ blurs, setBlurs }: BlurLayerProps) {
  return (
    <>
      {blurs.map((blur) => (
        <EditableBlur
          key={blur.id}
          blur={blur}
          onChange={(newProps) => {
            setBlurs(
              blurs.map((b) => (b.id === blur.id ? { ...b, ...newProps } : b))
            );
          }}
          onDelete={() => {
            setBlurs(blurs.filter((b) => b.id !== blur.id));
          }}
        />
      ))}
    </>
  );
}

interface EditableBlurProps {
  blur: BlurObject;
  onChange: (props: Partial<BlurObject>) => void;
  onDelete: () => void;
}

function EditableBlur({ blur, onChange, onDelete }: EditableBlurProps) {
  const rectRef = useRef<any>(null);
  const transformerRef = useRef<any>(null);
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    if (isSelected && transformerRef.current && rectRef.current) {
      transformerRef.current.nodes([rectRef.current]);
      transformerRef.current.getLayer()?.batchDraw();
    }
  }, [isSelected]);

  return (
    <>
      <Rect
        ref={rectRef}
        x={blur.x}
        y={blur.y}
        width={blur.width}
        height={blur.height}
        fill="white"
        // opacity={0.5}
        draggable
        onClick={() => setIsSelected(true)}
        onTap={() => setIsSelected(true)}
        onDragEnd={(e) => {
          onChange({
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onTransform={() => {
          const node = rectRef.current;
          onChange({
            x: node.x(),
            y: node.y(),
            width: node.width() * node.scaleX(),
            height: node.height() * node.scaleY(),
          });
        }}
        // filters={[Konva.Filters.Blur]}
        blurRadius={40}
      />
      {isSelected && (
        <>
          <Transformer
            ref={transformerRef}
            boundBoxFunc={(oldBox, newBox) => {
              const minWidth = 10;
              const minHeight = 10;
              return {
                ...newBox,
                width: Math.max(minWidth, newBox.width),
                height: Math.max(minHeight, newBox.height),
              };
            }}
          />
          <Group x={blur.x} y={blur.y - 30}>
            <Html>
              <input
                type="range"
                min="0"
                max="20"
                value={blur.blurRadius}
                onChange={(e) => {
                  onChange({ blurRadius: parseInt(e.target.value) });
                }}
                style={{
                  width: "100px",
                }}
              />
              <button
                onClick={onDelete}
                style={{
                  marginLeft: "10px",
                  padding: "2px 8px",
                  background: "red",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                }}
              >
                삭제
              </button>
            </Html>
          </Group>
        </>
      )}
    </>
  );
}
