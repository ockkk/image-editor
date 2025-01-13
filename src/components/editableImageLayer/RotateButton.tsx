import Konva from "konva";
import { Group, Rect, Text } from "react-konva";

export function RotateButton({
  imageRef,
}: {
  imageRef: React.RefObject<Konva.Image>;
}) {
  return (
    <>
      <Group x={10} y={5}>
        <Rect
          width={30}
          height={30}
          cornerRadius={4}
          fill="transparent"
          onClick={() => {
            if (imageRef.current) {
              imageRef.current.rotate(-90);
              imageRef.current.getLayer()?.batchDraw();
            }
          }}
        />
        <Text
          text="⟲"
          fontSize={30}
          x={3}
          y={0}
          fontStyle="bold"
          onClick={() => {
            if (imageRef.current) {
              imageRef.current.rotate(-90);
              imageRef.current.getLayer()?.batchDraw();
            }
          }}
        />
      </Group>
      <Group x={45} y={5}>
        <Rect
          width={30}
          height={30}
          cornerRadius={4}
          fill="transparent"
          onClick={() => {
            if (imageRef.current) {
              imageRef.current.rotate(90);
              imageRef.current.getLayer()?.batchDraw();
            }
          }}
        />
        <Text
          text="⟳"
          fontSize={30}
          x={3}
          y={0}
          fontStyle="bold"
          onClick={() => {
            if (imageRef.current) {
              imageRef.current.rotate(90);
              imageRef.current.getLayer()?.batchDraw();
            }
          }}
        />
      </Group>
    </>
  );
}
